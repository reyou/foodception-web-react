import React from 'react';
import { useLocation } from 'react-router-dom';
import { FrontEndUtils } from '../utils/FrontEndUtils';
import ParentWindowUtils from '../utils/ParentWindowUtils';

interface PaginationProps {
  currentPage: number;
}

const Pagination: React.FC<PaginationProps> = ({ currentPage }) => {
  const location = useLocation();

  // Helper function to construct a URL with the page parameter
  const constructUrlWithPage = (page: number) => {
    const searchParams = new URLSearchParams(location.search);
    searchParams.set('page', page.toString());
    return `${location.pathname}?${searchParams.toString()}`;
  };

  const handlePageChange = (
    event: React.MouseEvent<HTMLAnchorElement, MouseEvent>,
    page: number
  ) => {
    const urlWithPage = constructUrlWithPage(page);
    if (FrontEndUtils.isInsideIframe()) {
      event.preventDefault();
      const adjustedUrl = FrontEndUtils.getAdjustedUrl(urlWithPage);
      ParentWindowUtils.postMessage({ type: 'redirect', url: adjustedUrl });
    }
  };

  return (
    <nav aria-label='Page navigation'>
      <ul className='pagination justify-content-center'>
        {/* First Page Link */}
        <li className={`page-item ${currentPage === 1 ? 'disabled' : ''}`}>
          <a
            className='page-link'
            href={constructUrlWithPage(1)}
            onClick={(e) => {
              handlePageChange(e, 1);
            }}
          >
            First
          </a>
        </li>

        {/* Previous Page Link */}
        <li className={`page-item ${currentPage === 1 ? 'disabled' : ''}`}>
          <a
            className='page-link'
            href={constructUrlWithPage(currentPage - 1)}
            onClick={(e) => {
              handlePageChange(e, currentPage - 1);
            }}
          >
            Previous
          </a>
        </li>

        {/* Next Page Link */}
        <li className='page-item'>
          <a
            className='page-link'
            href={constructUrlWithPage(currentPage + 1)}
            onClick={(e) => {
              handlePageChange(e, currentPage + 1); // Call the callback function
            }}
          >
            Next
          </a>
        </li>
      </ul>
    </nav>
  );
};

export default Pagination;
