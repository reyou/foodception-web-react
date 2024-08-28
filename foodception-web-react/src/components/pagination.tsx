import React from 'react';

interface PaginationProps {
  currentPage: number;
  onPageChange: (page: number) => void;
}

const Pagination: React.FC<PaginationProps> = ({
  currentPage,
  onPageChange
}) => {
  const handlePageChange = (page: number) => {
    // Call the passed onPageChange function with the new page number
    onPageChange(page);
  };

  return (
    <nav aria-label='Page navigation'>
      <ul className='pagination justify-content-center'>
        <li className={`page-item ${currentPage === 1 ? 'disabled' : ''}`}>
          <button
            className='page-link'
            onClick={() => handlePageChange(1)}
            disabled={currentPage === 1}
          >
            First
          </button>
        </li>
        <li className={`page-item ${currentPage === 1 ? 'disabled' : ''}`}>
          <button
            className='page-link'
            onClick={() => handlePageChange(currentPage - 1)}
            disabled={currentPage === 1}
          >
            Previous
          </button>
        </li>
        <li className='page-item'>
          <button
            className='page-link'
            onClick={() => handlePageChange(currentPage + 1)}
          >
            Next
          </button>
        </li>
      </ul>
    </nav>
  );
};

export default Pagination;
