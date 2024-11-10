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

  // Function to determine if a segment is an ID (you can adjust this as needed)
  const isID = (segment: string) => /^[0-9a-fA-F-]{36}$/.test(segment); // Checks for UUID format

  // Find the "true" last path segment to make it non-clickable (ignore IDs)
  const lastPathIndex = isID(paths[paths.length - 1])
    ? paths.length - 2
    : paths.length - 1;

  return (
    <Container className='mt-2'>
      <Breadcrumb>
        <Breadcrumb.Item linkAs={FoodceptionLink} linkProps={{ url: '/' }}>
          Home
        </Breadcrumb.Item>
        {paths.map((path, index) => {
          // Skip the breadcrumb item if it's an ID and it's the last segment
          if (isID(path) && index === paths.length - 1) {
            return null;
          }

          // Generate the path up to the current breadcrumb level
          const to = `/${paths.slice(0, index + 1).join('/')}`;

          // Determine if the current segment is the "last" one for displaying as text only
          const isLast = index === lastPathIndex;

          // Customize path names if necessary
          const formattedPath = FrontEndUtils.capitalizeText(
            path.replace(/-/g, ' ')
          );

          return isLast ? (
            <Breadcrumb.Item active key={to}>
              {/* Display as plain text without a link for the last "true" item */}
              {formattedPath}
            </Breadcrumb.Item>
          ) : (
            <Breadcrumb.Item
              linkAs={FoodceptionLink}
              linkProps={{ url: to }}
              key={to}
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
