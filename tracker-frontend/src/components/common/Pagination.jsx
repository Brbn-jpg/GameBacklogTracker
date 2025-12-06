import React from "react";

const Pagination = ({ currentPage, totalPages, onPageChange }) => {
  const getPageNumbers = () => {
    const pages = [];
    // Always show first page
    pages.push(0);

    if (totalPages > 5) {
      if (currentPage < 3) {
        // Show first 3 pages, then ellipsis, then last page
        pages.push(1, 2);
        if (totalPages > 4) pages.push("...");
        pages.push(totalPages - 1);
      } else if (currentPage >= totalPages - 3) {
        // Show first page, then ellipsis, then last 3 pages
        if (totalPages > 4) pages.push("...");
        pages.push(totalPages - 3, totalPages - 2, totalPages - 1);
      } else {
        // Show first page, ellipsis, current page and its neighbors, then ellipsis, then last page
        pages.push("...");
        pages.push(currentPage - 1, currentPage, currentPage + 1);
        pages.push("...");
        pages.push(totalPages - 1);
      }
    } else {
      // If 5 or less pages, show all
      for (let i = 1; i < totalPages; i++) {
        pages.push(i);
      }
    }

    return pages;
  };

  const pageNumbersToDisplay = getPageNumbers();

  return (
    <nav className="flex justify-center mt-8">
      <ul className="flex items-center space-x-2">
        <li>
          <button
            onClick={() => onPageChange(currentPage - 1)}
            disabled={currentPage === 0}
            className="px-4 py-2 rounded-lg bg-slate-800/50 text-white hover:bg-slate-700/50 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200"
          >
            Previous
          </button>
        </li>
        {pageNumbersToDisplay.map((number, index) => (
          <li key={index}>
            {number === "..." ? (
              <span className="px-4 py-2 text-white">...</span>
            ) : (
              <button
                onClick={() => onPageChange(number)}
                className={`px-4 py-2 rounded-lg ${
                  currentPage === number
                    ? "bg-purple-600 text-white"
                    : "bg-slate-800/50 text-white hover:bg-slate-700/50"
                } transition-all duration-200`}
              >
                {number + 1}
              </button>
            )}
          </li>
        ))}
        <li>
          <button
            onClick={() => onPageChange(currentPage + 1)}
            disabled={currentPage === totalPages - 1}
            className="px-4 py-2 rounded-lg bg-slate-800/50 text-white hover:bg-slate-700/50 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200"
          >
            Next
          </button>
        </li>
      </ul>
    </nav>
  );
};

export default Pagination;
