import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import ErrorPanel from '../../../components/error_message';
import FoodceptionHrefLink from '../../../components/links/href_link';
import LoadingPanel from '../../../components/loading_panel';
import RecipeList from '../../../components/recipeList';
import useFetch from '../../../hooks/useFetch';
import { FrontEndUtils } from '../../../utils/FrontEndUtils';

type TopRecipesProps = {
  title: string;
  subtitle: string;
  fetchUrl: string;
  seeAllUrl: string;
  mapData: (
    data: any
  ) => { id: string; name: string; description: string; recipes: any[] }[];
  itemSlugPrefix: string;
  itemType: string;
};

const TopRecipes: React.FC<TopRecipesProps> = ({
  title,
  subtitle,
  fetchUrl,
  seeAllUrl,
  mapData,
  itemSlugPrefix,
  itemType
}) => {
  const { data, loading, error } = useFetch(fetchUrl);

  return (
    <Container fluid className='mt-4'>
      <Row>
        <Col className='text-center'>
          <h2>{title}</h2>
          <h4 className='mb-2'>{subtitle}</h4>
          <div className='mb-4'>
            <FoodceptionHrefLink url={seeAllUrl}>
              See all {itemType}
            </FoodceptionHrefLink>
          </div>
        </Col>
      </Row>

      <LoadingPanel visible={loading} />

      {error && (
        <Row>
          <Col className='text-center'>
            <ErrorPanel errorMessage={error} />
          </Col>
        </Row>
      )}

      {data &&
        mapData(data).map((item: any) => (
          <Container fluid key={item.id} className='mb-5'>
            <Row className='justify-content-center text-center mb-3'>
              <Col xs={12}>
                <h3 className='foodceptionSubCategoryTitle'>
                  <FoodceptionHrefLink
                    url={`${itemSlugPrefix}/${FrontEndUtils.slugify(
                      item.name
                    )}/${item.id}`}
                  >
                    {FrontEndUtils.capitalizeText(item.name)}
                  </FoodceptionHrefLink>
                </h3>
                <p className='mb-4'>{item.description}</p>
              </Col>
            </Row>

            {/* Recipe list in a separate row */}
            <Row>
              <RecipeList recipes={item.recipes} />
            </Row>
          </Container>
        ))}
    </Container>
  );
};

export default TopRecipes;
