import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider
} from 'react-router-dom';
import FoodceptionHeader from './components/header';
import ErrorPage from './errorPage';
import Layout from './Layout';
import Countries from './pages/countries';
import MealCategories from './pages/mealCategories';
import MealRecipes from './pages/mealRecipes';
import Meals from './pages/meals';
import RecipeCategories from './pages/recipeCategories';
import RecipeCategoryDetail from './pages/recipeCategoryDetail';
import RecipeDetails from './pages/recipeDetails';
import Recipes from './pages/recipes';
import RecipeVideos from './pages/recipeVideos';
import TrendingRecipeVideos from './pages/trendingRecipeVideos';

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
          <Route path='meals' element={<Meals />} />
          <Route path='meals/categories' element={<MealCategories />} />
          <Route path='meals/:slug/:id/recipes' element={<MealRecipes />} />
          <Route path='recipes' element={<Recipes />} />
          <Route path='recipes/:slug/:id' element={<RecipeDetails />} />
          <Route path='recipe-categories' element={<RecipeCategories />} />
          <Route
            path='recipes/videos/trending'
            element={<TrendingRecipeVideos />}
          />
          <Route
            path='recipe-categories/:slug/:id'
            element={<RecipeCategoryDetail />}
          />
          <Route path='recipes/videos' element={<RecipeVideos />} />
          <Route path='countries' element={<Countries />} />
        </Route>
      </>
    )
  );

  return <RouterProvider router={router} />;
}
