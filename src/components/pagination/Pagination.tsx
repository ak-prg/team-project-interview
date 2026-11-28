import './Pagination.css';

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

export const Pagination = ({
  currentPage,
  totalPages,
  onPageChange,
}: PaginationProps) => {
  if (totalPages <= 1) return null;
  return (
    <div className="pagination">
      <button
        className="pagination__btn"
        onClick={() => onPageChange(1)}
        disabled={currentPage === 1}
        aria-label="first page"
      >
        &lt;&lt;
      </button>

      <button
        className="pagination__btn"
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
        aria-label="previous page"
      >
        &lt;
      </button>

      <span className="pagination__current">{currentPage}</span>

      <button
        className="pagination__btn"
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        aria-label="next page"
      >
        &gt;
      </button>

      <button
        className="pagination__btn"
        onClick={() => onPageChange(totalPages)}
        disabled={currentPage === totalPages}
        aria-label="last page"
      >
        &gt;&gt;
      </button>
    </div>
  );
};
