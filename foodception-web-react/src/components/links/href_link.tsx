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

  if (FrontEndUtils.isInsideIframe()) {
    return (
      <a
        data-guid='409a1aaf-a90c-4997-8a19-a5def439b9f2'
        className='link-button'
        href={url}
        onClick={(event) => handleLinkClick(event, url)}
        target='_blank'
        rel='noopener noreferrer'
      >
        {children}
      </a>
    );
  } else {
    return (
      <a
        data-guid='8c3ab256-8ccf-4bd4-adab-60f7046dc288'
        className='link-button'
        href={url}
        rel='noopener noreferrer'
      >
        {children}
      </a>
    );
  }
};

export default FoodceptionHrefLink;
