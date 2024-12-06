import { Breadcrumb, Col, Container, Row } from 'react-bootstrap';
import { useLocation } from 'react-router-dom';
import FoodceptionLink from '../links/foodception_link';
import { FrontEndUtils } from '../../utils/FrontEndUtils';
import { useEffect, useState } from 'react';
import { useQuery } from '../../hooks/useQuery';

const DynamicBreadcrumbs = () => {
  const [referrer, setReferrer] = useState('direct');
  const query = useQuery();
  const location = useLocation();
  useEffect(() => {
    if (FrontEndUtils.isInsideIframe()) {
      const referrer = query.get('referrer') || 'direct';
      setReferrer(referrer);
    } else {
      setReferrer(document.referrer || 'direct');
    }
  }, [query]);

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

  const getBackLinkLabel = () => {
    if (referrer === 'direct') return 'Back';
    const ignoreList = ['http:', 'https:', 'www.foodception.com'];
    // Split referrer URL and filter out GUID segments
    let segments = referrer.split('/').filter(Boolean);
    segments = segments.filter((segment) => !ignoreList.includes(segment));
    const nonGuidSegments = segments.filter((segment) => !isID(segment));

    // Get the last non-GUID segment and remove any query parameters
    const lastSegmentWithQuery =
      nonGuidSegments[nonGuidSegments.length - 1] || 'Home';
    const lastSegment = lastSegmentWithQuery.split('?')[0];
    // Format the segment (capitalize and replace dashes with spaces)
    const backToLabel = FrontEndUtils.capitalizeText(
      lastSegment.replace(/-/g, ' ')
    );

    return `Back to ${backToLabel}`;
  };

  // Render Breadcrumbs
  return (
    <Container className='mt-2'>
      {false && (
        <Row data-testid='breadcrumb_back_link'>
          <Col>
            {referrer !== 'direct' && (
              <>
                <FoodceptionLink url={referrer}>
                  <i className='bi bi-arrow-left-circle'></i>{' '}
                  {getBackLinkLabel()}
                </FoodceptionLink>
              </>
            )}
          </Col>
        </Row>
      )}
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
