import PropTypes from 'prop-types';
import '../assets/Pagination.css'

const Pagination = ({ currentPage, totalPages, onPageChange }) => {

  const handlePageChange = (newPage) => {
   
    if (newPage >= 1 && newPage <= totalPages ) {
      onPageChange(newPage);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const renderPageNumbers = () => {
    const pages = [];
    const maxVisiblePages = 5;
    let startPage, endPage;

    if (totalPages <= maxVisiblePages) {
      startPage = 1;
      endPage = totalPages;
    } else {
      const maxPagesBeforeCurrent = Math.floor(maxVisiblePages / 2);
      const maxPagesAfterCurrent = Math.ceil(maxVisiblePages / 2) - 1;
      
      if (currentPage <= maxPagesBeforeCurrent) {
        startPage = 1;
        endPage = maxVisiblePages;
      } else if (currentPage + maxPagesAfterCurrent >= totalPages) {
        startPage = totalPages - maxVisiblePages + 1;
        endPage = totalPages;
      } else {
        startPage = currentPage - maxPagesBeforeCurrent;
        endPage = currentPage + maxPagesAfterCurrent;
      }
    }

    // First page
    if (startPage > 1) {
      pages.push(
        <button
          key="first-page-button"
          onClick={() => handlePageChange(1)}
          className="page-btn"
        >
          1
        </button>
      );
      
      // First ellipsis
      if (startPage > 2) {
        pages.push(
          <span key="first-ellipsis" className="ellipsis">
            ...
          </span>
        );
      }
    }

    // Page numbers
    for (let i = startPage; i <= endPage; i++) {
      pages.push(
        <button
          key={`page-${i}-button`}
          onClick={() => handlePageChange(i)}
          className={`page-btn ${currentPage === i ? 'active' : ''}`}
          aria-current={currentPage === i ? 'page' : undefined}
        >
          {i}
        </button>
      );
    }

    // Last ellipsis
    if (endPage < totalPages - 1) {
      pages.push(
        <span key="last-ellipsis" className="ellipsis">
          ...
        </span>
      );
    }

    // Last page
    if (endPage < totalPages) {
      pages.push(
        <button
          key="last-page-button"
          onClick={() => handlePageChange(totalPages)}
          className="page-btn"
        >
          {totalPages}
        </button>
      );
    }

    return pages;
  };

  return (
    <div className="pagination" role="navigation" aria-label="Pagination">
      <button 
        key="first-nav-button"
        onClick={() => handlePageChange(1)}
        disabled={currentPage === 1}
        className="nav-btn"
        aria-label="First page"
      >
        &laquo;
      </button>
      <button 
        key="prev-nav-button"
        onClick={() => handlePageChange(currentPage - 1)}
        disabled={currentPage === 1}
        className="nav-btn"
        aria-label="Previous page"
      >
        &lsaquo;
      </button>
      
      {renderPageNumbers()}
      
      <button 
        key="next-nav-button"
        onClick={() => handlePageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        className="nav-btn"
        aria-label="Next page"
      >
        &rsaquo;
      </button>
      <button 
        key="last-nav-button"
        onClick={() => handlePageChange(totalPages)}
        disabled={currentPage === totalPages}
        className="nav-btn"
        aria-label="Last page"
      >
        &raquo;
      </button>
    </div>
  );
};

Pagination.propTypes = {
  currentPage: PropTypes.number.isRequired,
  totalPages: PropTypes.number.isRequired,
  onPageChange: PropTypes.func.isRequired,
};

export default Pagination;