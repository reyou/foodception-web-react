import { Breadcrumb, Container } from 'react-bootstrap';
import { useLocation } from 'react-router-dom';
import FoodceptionLink from '../links/foodception_link';
import { FrontEndUtils } from '../../utils/FrontEndUtils';

const DynamicBreadcrumbs = () => {
  const location = useLocation();

  // Return nothing if on the homepage
  if (location.pathname === '/') {
    return null;
  }

  // Split the path into segments and filter out any empty ones
  const paths = location.pathname.split('/').filter(Boolean);

  // Function to determine if a segment is an ID (UUID format)
  const isID = (segment: string) => /^[0-9a-fA-F-]{36}$/.test(segment);

  // Accumulate paths for generating the full link for each breadcrumb item
  const breadcrumbPaths: string[] = [];
  let adjustedPaths: string[] = [];

  // Adjusted paths logic: skip IDs but keep them in URLs when needed
  paths.forEach((path, index) => {
    // If the current path is not an ID, push it to displayable breadcrumb array
    if (!isID(path)) {
      adjustedPaths.push(path);

      // Add the current path to the breadcrumbPaths, along with any IDs that should be part of its URL
      const accumulatedPath = `/${paths.slice(0, index + 1).join('/')}`;
      breadcrumbPaths.push(accumulatedPath);
    } else if (index < paths.length - 1) {
      // If it's an ID and not the last segment, add it to the previous path's URL
      breadcrumbPaths[breadcrumbPaths.length - 1] += `/${path}`;
    }
  });

  // Render Breadcrumbs
  return (
    <Container className='mt-2'>
      <Breadcrumb>
        <Breadcrumb.Item linkAs={FoodceptionLink} linkProps={{ url: '/' }}>
          Home
        </Breadcrumb.Item>
        {adjustedPaths.map((path, index) => {
          const isLast = index === adjustedPaths.length - 1;
          const formattedPath = FrontEndUtils.capitalizeText(
            path.replace(/-/g, ' ')
          );

          return isLast ? (
            <Breadcrumb.Item active key={breadcrumbPaths[index]}>
              {formattedPath}
            </Breadcrumb.Item>
          ) : (
            <Breadcrumb.Item
              linkAs={FoodceptionLink}
              linkProps={{ url: breadcrumbPaths[index] }}
              key={breadcrumbPaths[index]}
            >
              {formattedPath}
            </Breadcrumb.Item>
          );
        })}
      </Breadcrumb>
    </Container>
  );
};

export default DynamicBreadcrumbs;
