import React from "react";

const Pagination = ({ totalPages, currentPage, setCurrentPage }) => {
  if (totalPages <= 1) return null;

  const getPageNumbers = () => {
    const pages = [];
    const maxPagesToShow = 5;
    let startPage = Math.max(currentPage - 2, 1);
    let endPage = Math.min(startPage + maxPagesToShow - 1, totalPages);

    startPage = Math.max(endPage - maxPagesToShow + 1, 1);

    for (let i = startPage; i <= endPage; i++) {
      pages.push(i);
    }
    return pages;
  };

  const pageNumbers = getPageNumbers();

  return (
    <div className="flex justify-center items-center gap-2 mt-8 flex-wrap pb-8">
      {/* Prev Button */}
      <button
        disabled={currentPage === 1}
        onClick={() => setCurrentPage(currentPage - 1)}
        className={`flex items-center gap-1 px-3 py-1 rounded transition ${
          currentPage === 1
            ? "bg-gray-300 text-gray-500 cursor-not-allowed"
            : "bg-gray-200 text-gray-700 hover:bg-indigo-500 hover:text-white"
        }`}>
        Prev
      </button>

      {/* First Page + Ellipsis */}
      {pageNumbers[0] > 1 && (
        <>
          <button
            onClick={() => setCurrentPage(1)}
            className={`px-3 py-1 rounded ${
              currentPage === 1
                ? "bg-indigo-500 text-white"
                : "bg-gray-200 text-gray-700 hover:bg-indigo-500 hover:text-white"
            } transition`}>
            1
          </button>
          {pageNumbers[0] > 2 && <span className="px-2">...</span>}
        </>
      )}

      {/* Page Numbers */}
      {pageNumbers.map((page) => (
        <button
          key={page}
          onClick={() => setCurrentPage(page)}
          className={`px-3 py-1 rounded ${
            currentPage === page
              ? "bg-indigo-500 text-white"
              : "bg-gray-200 text-gray-700 hover:bg-indigo-500 hover:text-white"
          } transition`}>
          {page}
        </button>
      ))}

      {/* Last Page + Ellipsis */}
      {pageNumbers[pageNumbers.length - 1] < totalPages && (
        <>
          {pageNumbers[pageNumbers.length - 1] < totalPages - 1 && (
            <span className="px-2">...</span>
          )}
          <button
            onClick={() => setCurrentPage(totalPages)}
            className={`px-3 py-1 rounded ${
              currentPage === totalPages
                ? "bg-indigo-500 text-white"
                : "bg-gray-200 text-gray-700 hover:bg-indigo-500 hover:text-white"
            } transition`}>
            {totalPages}
          </button>
        </>
      )}

      {/* Next Button */}
      <button
        disabled={currentPage === totalPages}
        onClick={() => setCurrentPage(currentPage + 1)}
        className={`flex items-center gap-1 px-3 py-1 rounded transition ${
          currentPage === totalPages
            ? "bg-gray-300 text-gray-500 cursor-not-allowed"
            : "bg-gray-200 text-gray-700 hover:bg-indigo-500 hover:text-white"
        }`}>
        Next
      </button>
    </div>
  );
};

export default Pagination;
