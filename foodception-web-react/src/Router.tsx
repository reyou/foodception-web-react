import React from 'react';
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
  Navigate
} from 'react-router-dom';
import ErrorPage from './errorPage';
import Layout from './Layout';
import Countries from './pages/countries/countries.page';
import CountryDetails from './pages/countries/countryDetails.page';
import IngredientsPage from './pages/ingredients/ingredients.page';
import MealRecipes from './pages/mealRecipes.page';
import Meals from './pages/meals.page';
import RecipeCategories from './pages/recipe-categories/recipeCategories.page';
import RecipeCategoryRecipesPage from './pages/recipeCategoryRecipes.page';
import RecipeDetails from './pages/recipes/details/recipe.details.page';
import RecipesPage from './pages/recipes/recipes.page';
import Recipes from './pages/recipes/discover/recipes.discover.page';
import RecipeVideos from './pages/recipes/videos/recipeVideos.page';
import Diets from './pages/diets/diets.page';
import DietDetail from './pages/diets/diet.details.page';
import RecipeVideoDetailsPage from './pages/recipes/videos/recipeVideoDetails.page';
import IngredientDetailsPage from './pages/ingredients/ingredient.details.page';
import { LayoutProvider } from './contexts/layout-context';
import SearchAutoCompletePage from './pages/search/auto_complete_page';
import { SearchPage } from './pages/search/search.page';
import FavoriteRecipesPage from './pages/favorites/favorites.recipes.page';
import LoginPage from './pages/user/auth/login.page';
import ForgotPasswordPage from './pages/user/auth/forgot_password.page';
import SignupPage from './pages/user/auth/signup.page';
import RedirectingToGoogle from './pages/user/auth/google/RedirectingToGoogle.page';
import VerifyGoogleLogin from './pages/user/auth/google/VerifyGoogleLogin.page';
import LoginGooglePage from './pages/user/auth/google/LoginGoogle.page';
import VerifyGoogleCallback from './pages/user/auth/google/VerifyGoogleCallback.page';
import { WebRoutes } from './constants/WebRoutes';
import Home from './pages/home/index';
export default function FoodceptionRouter() {
  const routes = createRoutesFromElements(
    <>
      <Route path={WebRoutes.Home.Base} element={<Layout />} errorElement={<ErrorPage />}>
        <Route index element={<Home />} />
        <Route path={WebRoutes.Diets.Base} element={<Diets />} />
        <Route path={`${WebRoutes.Diets.Base}/:slug/:id`} element={<DietDetail />} />
        <Route path={WebRoutes.Meals.Base} element={<Meals />} />
        <Route path={`${WebRoutes.Meals.Base}/:slug/:id`} element={<MealRecipes />} />
        <Route path={WebRoutes.Recipes.Base} element={<RecipesPage />} />
        <Route path={WebRoutes.Recipes.Discover} element={<Recipes />} />
        <Route path={`${WebRoutes.Recipes.Base}/:slug/:id`} element={<RecipeDetails />} />
        <Route path={WebRoutes.Recipes.Categories.Base} element={<RecipeCategories />} />
        <Route
          path={`${WebRoutes.Recipes.Categories.Base}/:slug/:id`}
          element={<RecipeCategoryRecipesPage />}
        />
        <Route path={WebRoutes.Recipes.Videos.Base} element={<RecipeVideos />} />
        <Route
          path={`${WebRoutes.Recipes.Videos.Base}/:slug/:id`}
          element={<RecipeVideoDetailsPage />}
        />
        <Route path={WebRoutes.Countries.Base} element={<Countries />} />
        <Route path={`${WebRoutes.Countries.Base}/:slug/:id`} element={<CountryDetails />} />
        <Route path={WebRoutes.Ingredients.Base} element={<IngredientsPage />} />
        <Route
          path={`${WebRoutes.Ingredients.Base}/:slug/:id`}
          element={<IngredientDetailsPage />}
        />
        <Route
          path={WebRoutes.Search.Autocomplete}
          element={<SearchAutoCompletePage />}
        />
        <Route path={WebRoutes.Search.Base} element={<SearchPage />} />
        <Route path={WebRoutes.Legacy.Login} element={<Navigate to={WebRoutes.User.Login} replace />} />
        <Route path={WebRoutes.User.Base} element={<Navigate to={WebRoutes.User.Login} replace />} />
        <Route path={WebRoutes.User.Login} element={<LoginPage />} />
        <Route path={WebRoutes.User.Google.Login} element={<LoginGooglePage />} />
        <Route path={WebRoutes.User.Google.Callback} element={<VerifyGoogleCallback />} />
        <Route path={WebRoutes.User.Signup} element={<SignupPage />} />
        <Route path={WebRoutes.User.Favorites.Recipes} element={<FavoriteRecipesPage />} />
        <Route path={WebRoutes.User.ForgotPassword} element={<ForgotPasswordPage />} />
      </Route>
      {/* Standalone route outside of main layout for iframe usage */}
      <Route path={WebRoutes.User.Google.Redirecting} element={<RedirectingToGoogle />} />
      <Route path={WebRoutes.User.Google.VerifyLogin} element={<VerifyGoogleLogin />} />
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
