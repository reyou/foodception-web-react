import ErrorPanel from '../../components/error_message';
import FoodceptionHeader from '../../components/header/header';
import HeaderLayout from '../../components/header/headerLayout';
import LoadingPanel from '../../components/loading_panel';
import Pagination from '../../components/pagination';
import RecipeList from '../../components/recipeList';
import useFetch from '../../hooks/useFetch';
import { useQuery } from '../../hooks/useQuery';

export default function RecipesList() {
  const query = useQuery();
  const page = parseInt(query.get('page') || '1');
  const skip = (page - 1) * 20;
  const { data, loading, error } = useFetch(`/recipes?skip=${skip}`);
  const imageUrl =
    'https://static.wixstatic.com/media/f7bd72_e03b3faaf463460a87f0662628574d46~mv2.jpg';
  const title = <FoodceptionHeader>Recipes</FoodceptionHeader>;
  const subTitle = 'Discover Delicious Recipes from Around the World';

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
        <div className='mb-4'>
          <h2 className='text-center mt-4'>Recipe Directory</h2>
          <h4 className='text-center'>
            Feeling Lucky? Here Are Some Random Picks for You!
          </h4>
        </div>
        {data && (
          <>
            <RecipeList recipes={data.recipes}></RecipeList>
            <Pagination currentPage={page}></Pagination>
          </>
        )}
      </div>
    </div>
  );
}
