import { useEffect } from 'react';
import {
  createBrowserRouter,
  RouterProvider,
  Route,
  createRoutesFromElements
} from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import './css/bootstrap-overrides.css';
import './App.css';
import Layout from './Layout';
import WindowUtils from './utils/WindowUtils';
import Meals from './pages/meals';
import Recipes from './pages/recipes';
import RecipeCategories from './pages/recipe-categories';
import MealCategories from './pages/meal-categories';

function App() {
  useEffect(() => {
    // Get iframeId from the query string
    const params = new URLSearchParams(window.location.search);
    const iframeId = params.get('iframeId') || 'N/A';
    // Send the message on mount
    WindowUtils.addResizeListener(iframeId);

    // Cleanup listener on unmount
    return () => {
      WindowUtils.removeResizeListener();
    };
  }, []);
  const router = createBrowserRouter(
    createRoutesFromElements(
      <>
        <Route path='/' element={<Layout />}>
          <Route
            index
            element={
              <div>
                <h1 className='text-center'>Welcome to Foodception</h1>
              </div>
            }
          />
          <Route path='meals' element={<Meals />} />
          <Route path='meals/categories' element={<MealCategories />} />
          <Route path='recipes' element={<Recipes />} />
          <Route path='recipe-categories' element={<RecipeCategories />} />
        </Route>
      </>
    )
  );

  return <RouterProvider router={router} />;
}

export default App;
