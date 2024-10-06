import React from 'react';
import { FrontEndUtils } from '../../utils/FrontEndUtils';
import ParentWindowUtils from '../../utils/ParentWindowUtils';

interface FoodceptionHrefLinkProps {
  url: string;
  children: React.ReactNode;
}

const FoodceptionHrefLink: React.FC<FoodceptionHrefLinkProps> = ({
  url,
  children
}) => {
  const handleLinkClick = (
    event: React.MouseEvent<HTMLAnchorElement>,
    url: string
  ) => {
    // Only prevent default behavior for left-clicks (event.button === 0)
    if (event.button === 0) {
      event.preventDefault();
      ParentWindowUtils.postMessage({ type: 'redirect', url: url });
    }
  };

  // Construct the full URL based on whether it's inside an iframe
  const baseUrl = FrontEndUtils.isInsideIframe()
    ? 'https://www.foodception.com' // Use www.foodception.com if inside iframe
    : window.location.origin; // Use current origin if not inside iframe

  const adjustedUrl = `${baseUrl}${url}`; // Append relative path to base URL

  if (FrontEndUtils.isInsideIframe()) {
    return (
      <a
        data-guid='7762e7e6-8ec9-419c-9a2a-a1ec4bdc4539'
        className='link-button'
        href={adjustedUrl}
        onClick={(event) => handleLinkClick(event, adjustedUrl)}
        target='_blank'
        rel='noopener noreferrer'
      >
        {children}
      </a>
    );
  } else {
    return (
      <a
        data-guid='47513874-85e1-47f2-a2c9-903fce6036d1'
        className='link-button'
        href={adjustedUrl}
        rel='noopener noreferrer'
      >
        {children}
      </a>
    );
  }
};

export default FoodceptionHrefLink;
