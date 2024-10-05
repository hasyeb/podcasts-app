import React from "react";

const PaginationComponent = ({currentPage, setCurrentPage, totalPages}) => {
  return (
    <div className="flex justify-center items-center mt-8">
      <button type="button" 
        className={`${currentPage === 1 ? "bg-gray-400 cursor-not-allowed" : "bg-blue-700 hover:bg-blue-800"} text-white focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-full text-sm p-2.5 text-center inline-flex items-center me-2`}
        onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
      >
        <svg className="w-4 h-4" aria-hidden="true" transform="scale(-1 1)" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 10">
          <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M1 5h12m0 0L9 1m4 4L9 9"/>
        </svg>
      </button>
      <span className="mx-2">{currentPage} / {totalPages}</span>
      <button type="button"
        className={`${currentPage === totalPages ? "bg-gray-400 cursor-not-allowed" : "bg-blue-700 hover:bg-blue-800"} text-white focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-full text-sm p-2.5 text-center inline-flex items-center me-2`}
        onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
      >
        <svg className="w-4 h-4" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 10">
          <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M1 5h12m0 0L9 1m4 4L9 9"/>
        </svg>
      </button>
    </div>
  );
};

export default PaginationComponent;
