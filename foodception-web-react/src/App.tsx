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
import Meals from './components/meals';
import WindowUtils from './utils/WindowUtils';
import Recipes from './components/recipes';
import Categories from './components/categories';
import Layout from './Layout';

function App() {
  useEffect(() => {
    // Send the message on mount
    WindowUtils.addResizeListener();

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
          <Route path='recipes' element={<Recipes />} />
          <Route path='categories' element={<Categories />} />
        </Route>
      </>
    )
  );

  return <RouterProvider router={router} />;
}

export default App;