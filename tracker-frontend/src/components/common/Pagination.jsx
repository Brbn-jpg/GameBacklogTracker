import React from "react";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";

const Pagination = ({ currentPage, totalPages, onPageChange }) => {
  const getPageNumbers = () => {
    const pages = [];
    if (totalPages <= 0) return pages;
    
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

  if (totalPages <= 1) return null;

  return (
    <nav className="flex justify-center mt-8 px-2">
      <ul className="flex items-center space-x-1 md:space-x-2">
        <li>
          <button
            onClick={() => onPageChange(currentPage - 1)}
            disabled={currentPage === 0}
            className="flex items-center justify-center p-2 md:px-4 md:py-2 rounded-lg bg-slate-800/50 text-white hover:bg-slate-700/50 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200"
            aria-label="Previous Page"
          >
            <FaChevronLeft className="md:mr-1" />
            <span className="hidden md:inline">Previous</span>
          </button>
        </li>
        {pageNumbersToDisplay.map((number, index) => (
          <li key={index} className={number === "..." ? "" : ""}>
            {number === "..." ? (
              <span className="px-2 md:px-4 py-2 text-white">...</span>
            ) : (
              <button
                onClick={() => onPageChange(number)}
                className={`w-8 h-8 md:w-auto md:h-auto md:px-4 md:py-2 flex items-center justify-center rounded-lg text-sm md:text-base ${
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
            className="flex items-center justify-center p-2 md:px-4 md:py-2 rounded-lg bg-slate-800/50 text-white hover:bg-slate-700/50 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200"
            aria-label="Next Page"
          >
            <span className="hidden md:inline">Next</span>
            <FaChevronRight className="md:ml-1" />
          </button>
        </li>
      </ul>
    </nav>
  );
};

export default Pagination;