import { useParams } from 'react-router-dom';
import FoodceptionHeader from '../../components/header';
import HeaderLayout from '../../components/headerLayout';
import RecipeList from '../../components/recipeList';
import useFetch from '../../hooks/useFetch';

export default function CountryDetails() {
  const { id } = useParams<{ id: string }>();
  const {
    data: countryDetails,
    loading: countryLoading,
    error: countryError
  } = useFetch(`https://api.foodception.com/countries/${id}`);
  const {
    data: countryRecipes,
    loading: countryRecipesLoading,
    error: countryRecipesError
  } = useFetch(
    `https://api.foodception.com/countries/${id}/recipes?skip=0&limit=200`
  );
  if (countryLoading || countryRecipesLoading) {
    return <div className='text-center'>Loading...</div>;
  }

  if (countryError) {
    return <div>Error: {countryError}</div>;
  }
  if (countryRecipesError) {
    return <div>Error: {countryRecipesError}</div>;
  }

  if (!countryDetails || !countryRecipes) {
    return <div className='text-center'>No data available</div>;
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
  const imageUrl = countryDetails.countryCuisineImages.find(
    (q: any) => q.countryId === countryDetails.country.id
  ).imageUrl;
  return (
    <div className='container-fluid'>
      <HeaderLayout
        backgroundImage={imageUrl}
        title={title}
        subTitle={countryDetails.country.cuisineTitle}
      ></HeaderLayout>
      <h2 className='text-center mt-2'>Recipes</h2>
      <div className='container'>
        <p className='fs-5 mb-4'>{countryDetails.country.cuisineDescription}</p>
      </div>
      <div>
        <RecipeList
          recipes={countryRecipes.recipes}
          recipeImages={countryRecipes.recipeImages}
        ></RecipeList>
      </div>
    </div>
  );
}
