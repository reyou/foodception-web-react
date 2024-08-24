import { useParams } from 'react-router-dom';
import FoodceptionHeader from '../../components/header';
import RecipeList from '../../components/recipeList';
import useFetch from '../../hooks/useFetch';

export default function CountryDetails() {
  const { id } = useParams<{ id: string }>();
  const {
    data: country,
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

  if (!country || !countryRecipes) {
    return <div className='text-center'>No data available</div>;
  }
  console.log(countryRecipes);
  return (
    <div className='container-fluid'>
      <FoodceptionHeader>
        <img
          src={country.flagImage}
          alt={`${country.countryName} flag`}
          style={{ width: '60px', marginRight: '10px' }}
        />
        {country.countryName}
      </FoodceptionHeader>
      <div className='container'>
        <h3 className='text-center'>{country.cuisineTitle}</h3>
        <p className='fs-5'>{country.cuisineDescription}</p>
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
