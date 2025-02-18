// PAGINATOR COMPONENT
const PaginationControls = ({ pagination, currentPage, onPageChange }) => {
    
    return (

        <div className="pagination-controls mb-3 d-flex justify-content-center gap-2 mt-4">

            {/* Previous Page Button */}
            <button
                className="prev-page-btn"
                onClick={() => onPageChange(1)}
                disabled={!pagination.hasPrevPage}
            >
                <i className="fa-solid fa-angles-left"></i>
            </button>

            {/* Paginator Numbers */}
            {[...Array(pagination.totalPages)].map((_, index) => {
                const pageNumber = index + 1;
                return (
                    <button
                        key={pageNumber}
                        className={`pagination-numbers ${pageNumber === currentPage ? 'pagination-numbers-primary' : 'pagination-numbers-secondary'}`}
                        onClick={() => onPageChange(pageNumber)}
                    >
                        {pageNumber}
                    </button>
                );
            })}

            {/* Next Page Button */}
            <button
                className="next-page-btn"
                onClick={() => onPageChange(pagination.totalPages)}
                disabled={!pagination.hasNextPage}
            >
                <i className="fa-solid fa-angles-right"></i>
            </button>

        </div>

    );

};

// EXPORT
export default PaginationControls;