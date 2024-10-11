import React from 'react';
import { Pagination } from 'react-bootstrap';
import { FrontEndUtils } from '../utils/FrontEndUtils';
import ParentWindowUtils from '../utils/ParentWindowUtils';

interface PaginationProps {
  currentPage: number;
}

const PaginationComponent: React.FC<PaginationProps> = ({ currentPage }) => {
  // Helper function to construct a URL with the page parameter
  const constructUrlWithPage = (page: number) => {
    const url = new URL(window.location.href);
    url.searchParams.set('page', page.toString());
    const adjustedUrl = FrontEndUtils.getAdjustedUrl(url.toString());
    return adjustedUrl;
  };

  const handlePageChange = (
    event: React.MouseEvent<HTMLElement, MouseEvent>,
    page: number
  ) => {
    const urlWithPage = constructUrlWithPage(page);
    if (FrontEndUtils.isInsideIframe()) {
      event.preventDefault();
      ParentWindowUtils.postMessage({ type: 'redirect', url: urlWithPage });
    }
  };

  return (
    <Pagination className='justify-content-center text-secondary'>
      {/* First Page Link */}
      <Pagination.First
        onClick={(e) => handlePageChange(e, 1)}
        disabled={currentPage === 1}
        href={constructUrlWithPage(1)}
      >
        First
      </Pagination.First>

      {/* Previous Page Link */}
      <Pagination.Prev
        onClick={(e) => handlePageChange(e, currentPage - 1)}
        disabled={currentPage === 1}
        href={constructUrlWithPage(currentPage - 1)}
      >
        Previous
      </Pagination.Prev>

      {/* Next Page Link */}
      <Pagination.Next
        onClick={(e) => handlePageChange(e, currentPage + 1)}
        href={constructUrlWithPage(currentPage + 1)}
      >
        Next
      </Pagination.Next>
    </Pagination>
  );
};

export default PaginationComponent;
