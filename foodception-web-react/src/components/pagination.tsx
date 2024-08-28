import React from 'react';

interface PaginationProps {
  currentPage: number;
}

const Pagination: React.FC<PaginationProps> = ({ currentPage }) => {
  const createPageUrl = (page: number): string => {
    return `?page=${page}`;
  };

  return (
    <nav aria-label='Page navigation'>
      <ul className='pagination justify-content-center'>
        <li className={`page-item ${currentPage === 1 ? 'disabled' : ''}`}>
          <a href={createPageUrl(1)} className='page-link'>
            First
          </a>
        </li>
        <li className={`page-item ${currentPage === 1 ? 'disabled' : ''}`}>
          <a href={createPageUrl(currentPage - 1)} className='page-link'>
            Previous
          </a>
        </li>
        <li className='page-item'>
          <a href={createPageUrl(currentPage + 1)} className='page-link'>
            Next
          </a>
        </li>
      </ul>
    </nav>
  );
};

export default Pagination;
