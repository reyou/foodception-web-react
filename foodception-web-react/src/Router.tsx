import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider
} from 'react-router-dom';
import FoodceptionHeader from './components/header';
import Layout from './Layout';
import MealCategories from './pages/meal-categories';
import MealRecipes from './pages/meal-recipes';
import Meals from './pages/meals';
import RecipeCategories from './pages/recipe-categories';
import RecipeCategoryDetail from './pages/recipe-category-detail';
import RecipeDetails from './pages/recipe-details';
import Recipes from './pages/recipes';

export default function FoodceptionRouter() {
  const router = createBrowserRouter(
    createRoutesFromElements(
      <>
        <Route path='/' element={<Layout />}>
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
            path='recipe-categories/:slug/:id'
            element={<RecipeCategoryDetail />}
          />
        </Route>
      </>
    )
  );

  return <RouterProvider router={router} />;
}
