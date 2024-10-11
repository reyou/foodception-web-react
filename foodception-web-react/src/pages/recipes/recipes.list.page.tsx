import { useState } from 'react';
import ErrorPanel from '../../components/error_message';
import FoodceptionHeader from '../../components/header/header';
import HeaderLayout from '../../components/header/headerLayout';
import LoadingPanel from '../../components/loading_panel';
import Pagination from '../../components/pagination';
import RecipeList from '../../components/recipeList';
import useFetch from '../../hooks/useFetch';
import { useQuery } from '../../hooks/useQuery';
import { FrontEndUtils } from '../../utils/FrontEndUtils';
import RecipeSearch from './components/recipe_search';
import { useNavigate } from 'react-router-dom';
import NoRecipesResult from './components/no_recipes_result';
import NoMoreRecipes from './components/no_more_recipes';

export default function RecipesList() {
  const query = useQuery();
  const navigate = useNavigate();
  const page = parseInt(query.get('page') || '1');
  const skip = (page - 1) * 20;
  const [searchTerm, setSearchTerm] = useState<string>(
    query.get('query') || ''
  );
  const { data, loading, error } = useFetch(
    `/recipes?query=${searchTerm}&skip=${skip}`
  );
  const imageUrl =
    'https://static.wixstatic.com/media/f7bd72_650d5b64dadb4b59905f686016e31b1b~mv2.png';
  const title = <FoodceptionHeader>Recipe Directory</FoodceptionHeader>;
  const subTitle =
    'Browse, Search, and Discover the Perfect Dish for Any Occasion';

  const handleSearch = (term: string) => {
    if (term !== searchTerm) {
      setSearchTerm(term);
    }
  };

  const handleClearSearch = (event: React.MouseEvent<Element>) => {
    const recipesListUrl = window.location.pathname;

    if (FrontEndUtils.isInsideIframe()) {
      const adjustedUrl = FrontEndUtils.getAdjustedUrl(recipesListUrl);
      FrontEndUtils.handleLinkClick(event, adjustedUrl);
    } else {
      setSearchTerm('');
      navigate(recipesListUrl);
    }
  };

  return (
    <div>
      <HeaderLayout
        backgroundImage={imageUrl}
        title={title}
        subTitle={subTitle}
      ></HeaderLayout>
      <div className='container-fluid'>
        <LoadingPanel visible={loading}></LoadingPanel>
        {error && (
          <div className='text-center'>
            <ErrorPanel errorMessage={error}></ErrorPanel>
          </div>
        )}

        {data && (
          <>
            <div className='mt-4 mb-4'>
              <div className='row justify-content-center mb-4'>
                <div className='col-12 text-center mb-1'>
                  <h4>What Would You Like to Cook Today?</h4>
                </div>
                <div className='col-12 col-md-6 col-lg-4 col-xl-3'>
                  <RecipeSearch
                    initialSearchTerm={searchTerm}
                    onSearch={handleSearch}
                  />
                </div>
              </div>

              {/* Display search status if searchTerm exists */}
              {searchTerm && (
                <div className='row justify-content-center mt-2'>
                  <div className='col-12 text-center'>
                    <p>
                      Searching for "<strong>{searchTerm}</strong>",{' '}
                      <button
                        className='link-button underlined'
                        onClick={(e) => handleClearSearch(e)}
                      >
                        Clear Search
                      </button>
                    </p>
                  </div>
                </div>
              )}

              {/* Check if there are no recipes and display a custom message */}
              {data.recipes.length === 0 && page > 1 ? (
                <NoMoreRecipes searchTerm={searchTerm} />
              ) : data.recipes.length === 0 ? (
                <NoRecipesResult searchTerm={searchTerm} />
              ) : (
                <>
                  <RecipeList recipes={data.recipes}></RecipeList>
                  <Pagination currentPage={page}></Pagination>
                </>
              )}
            </div>
          </>
        )}
      </div>
    </div>
  );
}
