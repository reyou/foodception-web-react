import { useEffect, useState, useRef } from 'react';
import { InputGroup, FormControl, ListGroup } from 'react-bootstrap';
import debounce from 'lodash.debounce';
import HttpProvider from '../../../providers/HttpProvider';
import { useNavigate } from 'react-router-dom';
import { FrontEndUtils } from '../../../utils/FrontEndUtils';

interface RecipeSearchProps {
  onSearch: (term: string) => void;
}

const RecipeSearch: React.FC<RecipeSearchProps> = ({ onSearch }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [lastSearchedTerm, setLastSearchedTerm] = useState('');
  const [suggestions, setSuggestions] = useState<any[]>([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const navigate = useNavigate();
  const isFirstSearch = useRef(true);

  const debouncedFetchSuggestions = useRef(
    debounce(async (term: string) => {
      if (term.length > 1) {
        try {
          const data = await HttpProvider.get(
            `/recipes/autocomplete?query=${term}`
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

  // Cleanup for debounced function when component unmounts
  useEffect(() => {
    return () => {
      debouncedFetchSuggestions.cancel();
    };
  }, [debouncedFetchSuggestions]);

  // Update the search term and trigger debounced suggestion fetch
  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const term = event.target.value;
    setSearchTerm(term);
    debouncedFetchSuggestions(term);
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      if (searchTerm !== lastSearchedTerm) {
        setShowSuggestions(false); // Hide suggestions on enter
        updateSearchQuery(searchTerm); // Update the URL with the current search term
        onSearch(searchTerm); // Trigger the search
        setLastSearchedTerm(searchTerm); // Update the last searched term
      }
    } else if (event.key === 'Escape') {
      setShowSuggestions(false);
    }
  };

  const handleSuggestionClick = (suggestion: any) => {
    setShowSuggestions(false);
    setSearchTerm(suggestion.title); // Set the search term as the clicked suggestion
    updateSearchQuery(suggestion.title); // Update the URL with the selected suggestion
    onSearch(suggestion.title); // Trigger the search
  };

  // Update the URL with the search query
  const updateSearchQuery = (term: string) => {
    const params = new URLSearchParams(window.location.search);
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

  return (
    <div className='position-relative'>
      <InputGroup>
        <FormControl
          placeholder='Search for recipes...'
          value={searchTerm}
          onChange={handleInputChange}
          onKeyDown={handleKeyDown}
          onBlur={handleBlur}
          onFocus={handleFocus}
          aria-label='Recipe Search'
        />
      </InputGroup>

      {showSuggestions && suggestions.length > 0 && searchTerm.length > 0 && (
        <ListGroup className='position-absolute' style={{ zIndex: 20 }}>
          {suggestions.map((suggestion, index) => (
            <ListGroup.Item
              key={suggestion.id}
              action
              onClick={() => handleSuggestionClick(suggestion)}
              className='d-flex align-items-start'
            >
              {/* Display the image if available */}
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

export default RecipeSearch;
