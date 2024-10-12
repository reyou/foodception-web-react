import { useEffect, useState, useRef } from 'react';
import { InputGroup, FormControl, ListGroup, Button } from 'react-bootstrap';
import debounce from 'lodash.debounce';

import { useNavigate } from 'react-router-dom';
import { FrontEndUtils } from '../utils/FrontEndUtils';
import HttpProvider from '../providers/HttpProvider';

interface SearchAutoCompleteProps {
  initialSearchTerm: string;
  onSearch: (term: string) => void;
  apiEndpoint: string;
  onSuggestionClick: (
    event: React.MouseEvent<Element> | React.TouchEvent<Element>,
    suggestion: any
  ) => void;
}

const SearchAutoComplete: React.FC<SearchAutoCompleteProps> = ({
  initialSearchTerm,
  onSearch,
  apiEndpoint,
  onSuggestionClick
}) => {
  const clickHandledRef = useRef(false);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);
  const [searchTerm, setSearchTerm] = useState(initialSearchTerm);
  const [lastSearchedTerm, setLastSearchedTerm] = useState('');
  const [suggestions, setSuggestions] = useState<any[]>([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const navigate = useNavigate();
  const isFirstSearch = useRef(true);

  useEffect(() => {
    setSearchTerm(initialSearchTerm);
    setLastSearchedTerm(initialSearchTerm);
  }, [initialSearchTerm]);

  const debouncedFetchSuggestions = useRef(
    debounce(async (term: string) => {
      if (term.length > 1) {
        try {
          const data = await HttpProvider.get(
            `${apiEndpoint}?query=${term}` // Dynamically use the passed API endpoint
          );
          setSuggestions(data.results);
          setShowSuggestions(true);
        } catch (error) {
          console.error('Error fetching suggestions:', error);
          setSuggestions([]);
        }
      }
    }, 300)
  ).current;

  useEffect(() => {
    return () => {
      debouncedFetchSuggestions.cancel();
    };
  }, [debouncedFetchSuggestions]);

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const term = event.target.value;
    setSearchTerm(term);
    debouncedFetchSuggestions(term);
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      handleSearch();
    } else if (event.key === 'Escape') {
      setShowSuggestions(false);
    }
  };

  const handleSearch = () => {
    setShowSuggestions(false);
    if (searchTerm !== lastSearchedTerm) {
      updateSearchQuery(searchTerm);
      onSearch(searchTerm);
      setLastSearchedTerm(searchTerm);
    }
  };

  const isMobileDevice = () =>
    /Mobi|Android|iPhone|iPad|iPod/i.test(navigator.userAgent);

  const handleSuggestionClick = (
    event:
      | React.MouseEvent<Element>
      | React.TouchEvent<Element>
      | React.PointerEvent<Element>,
    suggestion: any
  ) => {
    if (clickHandledRef.current) {
      // If the click has already been handled, exit early
      return;
    } else {
      // If not handled yet, mark it as handled and proceed
      clickHandledRef.current = true;
      // Reset the click state after 300ms to allow future clicks
      // Store the timeout in the ref
      timeoutRef.current = setTimeout(() => {
        clickHandledRef.current = false;
      }, 300);
      event.preventDefault();
      setShowSuggestions(false);
      setSearchTerm(suggestion.title);
      onSuggestionClick(event, suggestion);
    }
  };

  // Handle pointer down only for desktops
  const handlePointerDown = (
    event: React.PointerEvent<Element>,
    suggestion: any
  ) => {
    if (!isMobileDevice()) {
      handleSuggestionClick(event, suggestion);
    }
  };

  // Clear timeout if component unmounts or browser redirects
  useEffect(() => {
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, []);

  const updateSearchQuery = (term: string) => {
    const params = new URLSearchParams(window.location.search);
    params.set('page', '1');
    params.set('query', term);
    navigate({ search: params.toString() });
  };

  useEffect(() => {
    if (isFirstSearch.current) {
      const query = new URLSearchParams(window.location.search).get('query');
      if (query) {
        setSearchTerm(query);
        onSearch(query);
        setLastSearchedTerm(query);
      }
      isFirstSearch.current = false;
    }
  }, [onSearch]);

  const handleBlur = () => {
    setTimeout(() => setShowSuggestions(false), 100);
  };

  const handleFocus = () => {
    if (suggestions.length > 0) {
      setShowSuggestions(true);
    }
  };

  const handleClearSearch = () => {
    setSearchTerm('');
    setSuggestions([]);
    setShowSuggestions(false);
  };

  return (
    <div className='position-relative'>
      <InputGroup>
        <FormControl
          placeholder='Search...'
          value={searchTerm}
          onChange={handleInputChange}
          onKeyDown={handleKeyDown}
          onBlur={handleBlur}
          onFocus={handleFocus}
          aria-label='Search'
        />
        {searchTerm && (
          <Button
            variant='outline-secondary'
            className='position-absolute'
            onClick={handleClearSearch}
            style={{
              right: '73px',
              top: '50%',
              transform: 'translateY(-50%)',
              zIndex: 10,
              border: 'none'
            }}
          >
            ✕
          </Button>
        )}
        <Button variant='primary' onClick={handleSearch}>
          Search
        </Button>
      </InputGroup>

      {/* https://react-bootstrap.netlify.app/docs/components/list-group/ */}
      {showSuggestions && suggestions.length > 0 && searchTerm.length > 0 && (
        <ListGroup className='position-absolute' style={{ zIndex: 20 }}>
          {suggestions.map((suggestion) => (
            <ListGroup.Item
              key={suggestion.id}
              action
              onClick={(event) => {
                handleSuggestionClick(event, suggestion);
              }}
              onPointerDown={(event) => {
                handlePointerDown(event, suggestion);
              }}
              className='d-flex align-items-start'
            >
              {suggestion.recipeImages &&
                suggestion.recipeImages.length > 0 && (
                  <img
                    src={FrontEndUtils.getResizedImagePath(
                      suggestion.recipeImages[0].imageUrl,
                      50,
                      50
                    )}
                    alt={suggestion.title}
                    style={{
                      width: '50px',
                      height: '50px',
                      objectFit: 'cover',
                      marginRight: '10px'
                    }}
                  />
                )}
              <div>
                <div style={{ fontWeight: 'bold' }}>{suggestion.title}</div>
                <div style={{ fontSize: '0.85rem', color: '#666' }}>
                  {suggestion.description.length > 100
                    ? suggestion.description.substring(0, 100) + '...'
                    : suggestion.description}
                </div>
              </div>
            </ListGroup.Item>
          ))}
        </ListGroup>
      )}
    </div>
  );
};

export default SearchAutoComplete;
