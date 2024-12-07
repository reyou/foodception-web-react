import { useState } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
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
import SearchStatus from '../../components/search_status';
import NoMoreItems from '../recipes/components/no_more_items';
import NoResults from '../recipes/components/no_results';
import LoadingPanel from '../../components/loading_panel';

function IngredientsPage() {
  const query = useQuery();

  // Set initial page from query or default to 1
  const page = parseInt(query.get('page') || '1');
  const skip = (page - 1) * 20;
  const [searchTerm, setSearchTerm] = useState<string>(
    query.get('query') || ''
  );

  const { data, loading, error } = useFetch(
    `/ingredients?query=${searchTerm}&skip=${skip}`
  );

  const handleSearch = (term: string) => {
    if (term !== searchTerm) {
      setSearchTerm(term);
    }
  };

  const handleSearchCleared = () => {
    setSearchTerm('');
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

  const content = () => {
    if (loading) {
      return <LoadingPanel visible={loading} />;
    }
    if (error) {
      return <ErrorPanel errorMessage={error} />;
    }
    if (!data) {
      return <div className='text-center'>No data available</div>;
    }

    return (
      <>
        <Container fluid className='mt-4 mb-4'>
          <Row className='justify-content-center mb-4'>
            <Col xs={12} className='text-center mb-1'>
              <h4>Browse, Search, and Explore Essential Ingredients</h4>
            </Col>
            <Col xs={12} md={6} lg={4} xl={3}>
              <SearchAutoComplete
                initialSearchTerm={searchTerm}
                onSearch={handleSearch}
                apiEndpoint='/ingredients/autocomplete'
              />
            </Col>
          </Row>

          {searchTerm && (
            <SearchStatus
              searchTerm={searchTerm}
              onClearSearch={handleSearchCleared}
            />
          )}

          <Row className='justify-content-center mt-4'>
            {data.ingredients.length === 0 && page > 1 ? (
              <NoMoreItems searchTerm={searchTerm} />
            ) : data.ingredients.length === 0 ? (
              <NoResults searchTerm={searchTerm} />
            ) : (
              <>
                {data.ingredients.map((ingredient: any) => {
                  return (
                    <IngredientCard
                      key={ingredient.id}
                      ingredient={ingredient}
                    />
                  );
                })}

                <Pagination currentPage={page} />
              </>
            )}
          </Row>
        </Container>
      </>
    );
  };

  return (
    <Container fluid>
      <HeaderLayout
        title={<h1>Ingredients</h1>}
        subTitle={subtitle}
        backgroundImage={backgroundImage}
      />

      {content()}
    </Container>
  );
}

export default IngredientsPage;
