import { useState } from 'react';
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
import { FrontEndUtils } from '../../utils/FrontEndUtils';
import ParentWindowUtils from '../../utils/ParentWindowUtils';
import ErrorPanel from '../../components/error_message';

function IngredientsPage() {
  const query = useQuery();

  // Set initial page from query or default to 1
  const [page, setPage] = useState(parseInt(query.get('page') || '1'));

  // State to manage loading when navigating between pages
  const [isNavigating, setIsNavigating] = useState(false);

  // Calculate skip based on the current page
  const skip = (page - 1) * 20;

  // Get subtitle and backgroundImage from storage or generate them
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

  const { data, loading, error } = useFetch(`/ingredients?skip=${skip}`);

  const onPageChanged = (newPage: number) => {
    if (FrontEndUtils.isInsideIframe()) {
      ParentWindowUtils.postMessage({ type: 'scrollTo', x: 0, y: 0 });
    }

    setIsNavigating(true);

    setTimeout(() => {
      setPage(newPage);
      setIsNavigating(false);
    }, 1000);
  };

  const content = () => {
    if (loading || isNavigating) {
      return <div className='text-center mt-2'>Loading...</div>;
    }
    if (error) {
      return <ErrorPanel errorMessage={error}></ErrorPanel>;
    }
    if (!data) {
      return <div className='text-center'>No data available</div>;
    }

    return (
      <div className='row justify-content-center mt-4'>
        {data.ingredients.map((ingredient: any) => {
          const ingredientImage = ingredient.ingredientImages[0];
          return (
            <IngredientCard
              key={ingredient.id}
              ingredient={ingredient}
              ingredientImage={ingredientImage}
            ></IngredientCard>
          );
        })}
        <Pagination
          currentPage={page}
          onPageChange={onPageChanged}
        ></Pagination>
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
