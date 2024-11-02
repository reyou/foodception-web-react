import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider
} from 'react-router-dom';
import FoodceptionHeader from './components/header/header';
import ErrorPage from './errorPage';
import Layout from './Layout';
import Countries from './pages/countries/countries.page';
import CountryDetails from './pages/countries/countryDetails.page';
import IngredientsPage from './pages/ingredients/ingredients.page';
import MealCategories from './pages/mealCategories.page';
import MealRecipes from './pages/mealRecipes.page';
import Meals from './pages/meals.page';
import RecipeCategories from './pages/recipeCategories.page';
import RecipeCategoryDetail from './pages/recipeCategoryDetail';
import RecipeDetails from './pages/recipes/recipe.details.page';
import RecipesList from './pages/recipes/recipes.list.page';
import Recipes from './pages/recipes/recipes.page';
import RecipeVideos from './pages/recipeVideos.page';
import TrendingRecipeVideos from './pages/trendingRecipeVideos';
import HomeRecipeCategories from './pages/home/home.recipeCategories';
import Diets from './pages/diets/diets.page';
import HomeDiets from './pages/home/home.diets';
import DietDetail from './pages/diets/diet.details.page';

export default function FoodceptionRouter() {
  const router = createBrowserRouter(
    createRoutesFromElements(
      <>
        <Route path='/' element={<Layout />} errorElement={<ErrorPage />}>
          <Route
            index
            element={
              <div>
                <FoodceptionHeader>Welcome to Foodception</FoodceptionHeader>
              </div>
            }
          />
          <Route path='diets' element={<Diets />} />
          <Route path='meals' element={<Meals />} />
          <Route path='meals/categories' element={<MealCategories />} />
          <Route path='meals/:slug/:id/recipes' element={<MealRecipes />} />
          <Route path='recipes' element={<Recipes />} />
          <Route path='recipes/list' element={<RecipesList />} />
          <Route path='recipes/:slug/:id' element={<RecipeDetails />} />
          <Route
            path='home/recipe-categories'
            element={<HomeRecipeCategories />}
          />
          <Route path='home/diets' element={<HomeDiets />} />
          <Route path='recipe-categories' element={<RecipeCategories />} />
          <Route
            path='recipe-categories/:slug/:id'
            element={<RecipeCategoryDetail />}
          />
          <Route path='diets/:slug/:id' element={<DietDetail />} />
          <Route
            path='recipes/videos/trending'
            element={<TrendingRecipeVideos />}
          />
          <Route path='recipes/videos' element={<RecipeVideos />} />
          <Route path='countries' element={<Countries />} />
          <Route path='countries/:slug/:id' element={<CountryDetails />} />
          <Route path='ingredients' element={<IngredientsPage />} />
        </Route>
      </>
    )
  );

  return <RouterProvider router={router} />;
}
