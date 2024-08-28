import HeaderLayout from '../../components/header/headerLayout';
import IngredientCard from '../../components/ingredients/ingredientCard';
import Pagination from '../../components/pagination';
import {
  backgroundImages,
  subtitles
} from '../../constants/ingredients.constants';
import useFetch from '../../hooks/useFetch';
import { useQuery } from '../../hooks/useQuery';
import TypeUtils from '../../utils/TypeUtils';
import StorageUtils from '../../utils/StorageUtils';
import DateUtils from '../../utils/DateUtils';

function IngredientsPage() {
  const query = useQuery();
  let subtitle = StorageUtils.getItemWithExpiry('subtitle');
  let backgroundImage = StorageUtils.getItemWithExpiry('backgroundImage');

  if (!subtitle) {
    subtitle = TypeUtils.getRandomFromArray(subtitles);
    StorageUtils.setItemWithExpiry('subtitle', subtitle, DateUtils.oneWeekInMs);
  }

  if (!backgroundImage) {
    backgroundImage = TypeUtils.getRandomFromArray(backgroundImages);
    StorageUtils.setItemWithExpiry(
      'backgroundImage',
      backgroundImage,
      DateUtils.oneWeekInMs
    );
  }
  const page = parseInt(query.get('page') || '1');
  const skip = (page - 1) * 20;
  const { data, loading, error } = useFetch(`/ingredients?skip=${skip}`);

  const content = () => {
    if (loading) {
      return <div className='text-center'>Loading...</div>;
    }
    if (error) {
      return <div>Error: {error}</div>;
    }
    if (!data) {
      return <div className='text-center'>No data available</div>;
    }

    return (
      <div className='row justify-content-center mt-4'>
        {data.ingredients.map((ingredient: any) => {
          const ingredientImage = data.ingredientImages.find(
            (image: any) => image.ingredientId === ingredient.id
          );
          return (
            <IngredientCard
              key={ingredient.id}
              ingredient={ingredient}
              ingredientImage={ingredientImage}
            ></IngredientCard>
          );
        })}
        <Pagination currentPage={page}></Pagination>
      </div>
    );
  };

  return (
    <div className='container-fluid'>
      <HeaderLayout
        title={<h1>Ingredients</h1>}
        subTitle={subtitle}
        backgroundImage={backgroundImage}
      ></HeaderLayout>
      {content()}
    </div>
  );
}

export default IngredientsPage;
