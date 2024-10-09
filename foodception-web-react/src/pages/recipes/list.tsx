import ErrorPanel from '../../components/error_message';
import FoodceptionHeader from '../../components/header/header';
import HeaderLayout from '../../components/header/headerLayout';
import LoadingPanel from '../../components/loading_panel';
import Pagination from '../../components/pagination';
import RecipeList from '../../components/recipeList';
import useFetch from '../../hooks/useFetch';
import { useQuery } from '../../hooks/useQuery';
import RecipeSearch from './components/recipe_search';

export default function RecipesList() {
  const query = useQuery();
  const page = parseInt(query.get('page') || '1');
  const skip = (page - 1) * 20;
  const { data, loading, error } = useFetch(`/recipes?skip=${skip}`);
  const imageUrl =
    'https://static.wixstatic.com/media/f7bd72_650d5b64dadb4b59905f686016e31b1b~mv2.png';
  const title = <FoodceptionHeader>Recipe Directory</FoodceptionHeader>;
  const subTitle =
    'Browse, Search, and Discover the Perfect Dish for Any Occasion';

  const handleSearch = (term: string) => {
    // Make an API call or update state based on the search term
    // Optionally, you could refetch the recipes here with the updated search term

    console.log('List - Searching for:', term);
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
              <div className='row justify-content-center'>
                <div className='col-12 col-md-6 col-lg-4 col-xl-3'>
                  <RecipeSearch onSearch={handleSearch} />
                </div>
              </div>
            </div>
            <RecipeList recipes={data.recipes}></RecipeList>
            <Pagination currentPage={page}></Pagination>
          </>
        )}
      </div>
    </div>
  );
}
