import React from 'react';
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
import RecipeCategories from './pages/recipe-categories/recipeCategories.page';
import RecipeCategoryRecipesPage from './pages/recipeCategoryRecipes.page';
import RecipeDetails from './pages/recipes/details/recipe.details.page';
import RecipesPage from './pages/recipes/recipes.page';
import Recipes from './pages/recipes/discover/recipes.discover.page';
import RecipeVideos from './pages/recipes/videos/recipeVideos.page';
import TrendingRecipeVideos from './pages/home/home.videos';
import HomeRecipeCategories from './pages/home/home.recipeCategories';
import Diets from './pages/diets/diets.page';
import HomeDiets from './pages/home/home.diets';
import DietDetail from './pages/diets/diet.details.page';
import RecipeVideoDetailsPage from './pages/recipes/videos/recipeVideoDetails.page';
import IngredientDetailsPage from './pages/ingredients/ingredient.details.page';
import { LayoutProvider } from './contexts/layout-context';
import SearchAutoCompletePage from './pages/search/auto_complete_page';
import { SearchPage } from './pages/search/search.page';

export default function FoodceptionRouter() {
  const routes = createRoutesFromElements(
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
        <Route
          path='home/recipe-categories'
          element={<HomeRecipeCategories />}
        />
        <Route path='home/diets' element={<HomeDiets />} />
        <Route
          path='recipe-videos/trending'
          element={<TrendingRecipeVideos />}
        />
        <Route path='meals/categories' element={<MealCategories />} />
        <Route path='diets' element={<Diets />} />{' '}
        <Route path='diets/:slug/:id' element={<DietDetail />} />
        <Route path='meals' element={<Meals />} />
        <Route path='meals/:slug/:id' element={<MealRecipes />} />
        <Route path='recipes' element={<RecipesPage />} />
        <Route path='recipes/discover' element={<Recipes />} />
        <Route path='recipes/:slug/:id' element={<RecipeDetails />} />
        <Route path='recipe-categories' element={<RecipeCategories />} />
        <Route
          path='recipe-categories/:slug/:id'
          element={<RecipeCategoryRecipesPage />}
        />
        <Route path='recipe-videos' element={<RecipeVideos />} />
        <Route
          path='recipe-videos/:slug/:id'
          element={<RecipeVideoDetailsPage />}
        />
        <Route path='countries' element={<Countries />} />
        <Route path='countries/:slug/:id' element={<CountryDetails />} />
        <Route path='ingredients' element={<IngredientsPage />} />
        <Route
          path='ingredients/:slug/:id'
          element={<IngredientDetailsPage />}
        />
        <Route
          path='search/autocomplete'
          element={<SearchAutoCompletePage />}
        />
        <Route path='search' element={<SearchPage />} />
      </Route>
    </>
  );
  const router = createBrowserRouter(routes, {
    future: {
      v7_relativeSplatPath: true,
      v7_fetcherPersist: true,
      v7_partialHydration: true,
      v7_normalizeFormMethod: true,
      v7_skipActionErrorRevalidation: true
    }
  });

  return (
    <LayoutProvider>
      <RouterProvider router={router} future={{ v7_startTransition: true }} />
    </LayoutProvider>
  );
}
