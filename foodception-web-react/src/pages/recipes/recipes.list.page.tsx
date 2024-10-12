import { useState } from 'react';
import ErrorPanel from '../../components/error_message';
import FoodceptionHeader from '../../components/header/header';
import HeaderLayout from '../../components/header/headerLayout';
import LoadingPanel from '../../components/loading_panel';
import Pagination from '../../components/pagination';
import RecipeList from '../../components/recipeList';
import useFetch from '../../hooks/useFetch';
import { useQuery } from '../../hooks/useQuery';
import NoResults from './components/no_results';
import NoMoreItems from './components/no_more_items';
import SearchAutoComplete from '../../components/search_auto_complete';
import SearchStatus from '../../components/search_status';

export default function RecipesList() {
  const query = useQuery();

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

  const handleSearchCleared = () => {
    setSearchTerm('');
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
                  <SearchAutoComplete
                    initialSearchTerm={searchTerm}
                    onSearch={handleSearch}
                    apiEndpoint='/recipes/autocomplete'
                    baseUrl='/recipes'
                  />
                </div>
              </div>

              {searchTerm && (
                <SearchStatus
                  searchTerm={searchTerm}
                  onClearSearch={handleSearchCleared}
                />
              )}

              {/* Check if there are no recipes and display a custom message */}
              {data.recipes.length === 0 && page > 1 ? (
                <NoMoreItems searchTerm={searchTerm} />
              ) : data.recipes.length === 0 ? (
                <NoResults searchTerm={searchTerm} />
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
