import { render, screen } from '@testing-library/react'; // Import `screen`
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import DynamicBreadcrumbs from './foodception_breadcrumbs';
import '@testing-library/jest-dom/extend-expect';

// Test utility function to render component with a specific route
const renderWithRouter = (path: string) => {
  return render(
    <MemoryRouter initialEntries={[path]}>
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
    expect(recipesBreadcrumb?.tagName).toBe('LI'); // The last breadcrumb should be a <span>, not <a>
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
});
