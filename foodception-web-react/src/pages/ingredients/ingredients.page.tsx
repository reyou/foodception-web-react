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
import ErrorPanel from '../../components/error_message';
import SearchAutoComplete from '../../components/search_auto_complete';
import { useState } from 'react';

function IngredientsPage() {
  const query = useQuery();

  // Set initial page from query or default to 1
  const page = parseInt(query.get('page') || '1');
  const skip = (page - 1) * 20;
  const [searchTerm, setSearchTerm] = useState<string>(
    query.get('query') || ''
  );

  const handleSearch = (term: string) => {
    if (term !== searchTerm) {
      setSearchTerm(term);
    }
  };

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

  const content = () => {
    if (loading) {
      return <div className='text-center mt-2'>Loading...</div>;
    }
    if (error) {
      return <ErrorPanel errorMessage={error}></ErrorPanel>;
    }
    if (!data) {
      return <div className='text-center'>No data available</div>;
    }

    return (
      <>
        <div className='mt-4 mb-4'>
          <div className='row justify-content-center mb-4'>
            <div className='col-12 text-center mb-1'>
              <h4>Browse, Search, and Explore Essential Ingredients</h4>
            </div>
            <div className='col-12 col-md-6 col-lg-4 col-xl-3'>
              <SearchAutoComplete
                initialSearchTerm={searchTerm}
                onSearch={handleSearch}
                apiEndpoint='/ingredients/autocomplete'
                baseUrl='/ingredients'
              />
            </div>
          </div>
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
            <Pagination currentPage={page}></Pagination>
          </div>
        </div>
      </>
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
