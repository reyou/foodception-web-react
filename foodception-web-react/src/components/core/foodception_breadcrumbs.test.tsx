import { render, screen } from '@testing-library/react';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import DynamicBreadcrumbs from './foodception_breadcrumbs';
import { FrontEndUtils } from '../../utils/FrontEndUtils';

// Test utility function to render component with a specific route
const renderWithRouter = (path: string) => {
  return render(
    <MemoryRouter
      initialEntries={[path]}
      future={{ v7_startTransition: true, v7_relativeSplatPath: true }}
    >
      <Routes>
        <Route path='*' element={<DynamicBreadcrumbs />} />
      </Routes>
    </MemoryRouter>
  );
};

describe('DynamicBreadcrumbs', () => {
  test('renders breadcrumb for simple path', () => {
    renderWithRouter('/meals/breakfast');

    expect(screen.getByText('Home')).toBeInTheDocument();
    expect(screen.getByText('Meals')).toBeInTheDocument();
    expect(screen.getByText('Breakfast')).toBeInTheDocument();
  });

  test('renders breadcrumb without UUID and includes UUID in previous link', () => {
    renderWithRouter(
      '/meals/breakfast/cc4346a6-1254-45c8-b7b4-8caa4e86b397/recipes'
    );

    // Verify breadcrumb text
    expect(screen.getByText('Home')).toBeInTheDocument();
    expect(screen.getByText('Meals')).toBeInTheDocument();
    expect(screen.getByText('Breakfast')).toBeInTheDocument();
    expect(screen.getByText('Recipes')).toBeInTheDocument();

    // Verify 'Recipes' is not a link (it's the last item and should be plain text)
    const recipesBreadcrumb = screen.queryByText('Recipes');
    expect(recipesBreadcrumb).toBeInTheDocument();
    expect(recipesBreadcrumb?.tagName).toBe('LI');
  });

  test('renders breadcrumb for URL without UUID', () => {
    renderWithRouter('/recipe-categories/air-fryer-recipes');

    // Verify breadcrumb text
    expect(screen.getByText('Home')).toBeInTheDocument();
    expect(screen.getByText('Recipe Categories')).toBeInTheDocument();
    expect(screen.getByText('Air Fryer Recipes')).toBeInTheDocument();

    // Verify 'Air Fryer Recipes' is the last item and not a link
    const airFryerBreadcrumb = screen.getByText('Air Fryer Recipes');
    expect(airFryerBreadcrumb).toBeInTheDocument();
    expect(airFryerBreadcrumb).not.toHaveAttribute('href'); // Ensure it's not a link
  });

  test('does not render breadcrumbs on homepage', () => {
    renderWithRouter('/');

    // Verify no breadcrumbs are rendered on the homepage
    expect(screen.queryByText('Home')).not.toBeInTheDocument();
  });

  test('renders breadcrumb correctly on paginated list', () => {
    process.env.REACT_APP_WEB_URL = 'https://www.foodception.com';
    jest.spyOn(FrontEndUtils, 'isInsideIframe').mockReturnValue(true);
    renderWithRouter(
      '/recipes/list?page=3&iframeId=recipes-list-iframe&time=1731466959662&referrer=https%3A%2F%2Fwww.foodception.com%2Frecipes%2Flist%3Fpage%3D2'
    );
    const backLink = screen.getByTestId('breadcrumb_back_link');
    expect(backLink).not.toBeNull();
    expect(backLink).toBeInTheDocument();
    expect(backLink).toHaveTextContent('Back to List');
  });

  test('renders breadcrumb correctly from homepage referrer', () => {
    process.env.REACT_APP_WEB_URL = 'https://www.foodception.com';
    jest.spyOn(FrontEndUtils, 'isInsideIframe').mockReturnValue(true);
    renderWithRouter(
      '/recipe-categories?iframeId=recipe-categories-iframe&time=1731468914491&referrer=https%3A%2F%2Fwww.foodception.com%2F'
    );
    const backLink = screen.getByTestId('breadcrumb_back_link');
    expect(backLink).not.toBeNull();
    expect(backLink).toBeInTheDocument();
    expect(backLink).toHaveTextContent('Back to Home');
  });
});
