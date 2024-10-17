import { useParams } from 'react-router-dom';
import { Container } from 'react-bootstrap';
import ErrorPanel from '../../components/error_message';
import FoodceptionHeader from '../../components/header/header';
import HeaderLayout from '../../components/header/headerLayout';
import LoadingPanel from '../../components/loading_panel';
import RecipeList from '../../components/recipeList';
import useFetch from '../../hooks/useFetch';

export default function CountryDetails() {
  const { id } = useParams<{ id: string }>();
  const {
    data: countryDetails,
    loading: countryLoading,
    error: countryError
  } = useFetch(`/countries/${id}`);
  const {
    data: countryRecipes,
    loading: countryRecipesLoading,
    error: countryRecipesError
  } = useFetch(`/countries/${id}/recipes?skip=0&limit=200`);

  if (countryLoading || countryRecipesLoading) {
    return <LoadingPanel visible={true} />;
  }

  if (countryError) {
    return <ErrorPanel errorMessage={countryError} />;
  }

  if (countryRecipesError) {
    return <ErrorPanel errorMessage={countryRecipesError} />;
  }

  if (!countryDetails || !countryRecipes) {
    return <Container className='text-center'>No data available</Container>;
  }

  const title = (
    <FoodceptionHeader>
      <img
        src={countryDetails.country.flagImage}
        alt={`${countryDetails.country.countryName} flag`}
        style={{ width: '60px', marginRight: '10px' }}
      />
      {countryDetails.country.countryName}
    </FoodceptionHeader>
  );

  const imageUrl = countryDetails.country.countryCuisineImages[0].imageUrl;
  const recipes = countryRecipes.countryRecipes.map(
    (countryRecipe: any) => countryRecipe.recipe
  );

  return (
    <Container fluid>
      <HeaderLayout
        backgroundImage={imageUrl}
        title={title}
        subTitle={countryDetails.country.cuisineTitle}
      />
      <h2 className='text-center mt-2'>Recipes</h2>
      <Container>
        <p className='fs-5 mb-4'>{countryDetails.country.cuisineDescription}</p>
      </Container>
      <Container fluid>
        <RecipeList recipes={recipes} />
      </Container>
    </Container>
  );
}
