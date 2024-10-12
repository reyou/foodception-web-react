import { FrontEndUtils } from '../utils/FrontEndUtils';
import { useNavigate } from 'react-router-dom';
interface SearchStatusProps {
  searchTerm: string;
  onClearSearch: () => void;
}

const SearchStatus: React.FC<SearchStatusProps> = ({
  searchTerm,
  onClearSearch
}) => {
  const navigate = useNavigate();
  const handleClearSearch = (event: React.MouseEvent<Element>) => {
    const recipesListUrl = window.location.pathname;

    if (FrontEndUtils.isInsideIframe()) {
      const adjustedUrl = FrontEndUtils.getAdjustedUrl(recipesListUrl);
      FrontEndUtils.handleLinkClick(event, adjustedUrl);
    } else {
      onClearSearch();
      navigate(recipesListUrl);
    }
  };

  return (
    <div className='row justify-content-center mt-2'>
      <div className='col-12 text-center'>
        <p>
          Searching for "<strong>{searchTerm}</strong>",{' '}
          <button
            className='link-button underlined'
            onClick={handleClearSearch}
          >
            Clear Search
          </button>
        </p>
      </div>
    </div>
  );
};

export default SearchStatus;
