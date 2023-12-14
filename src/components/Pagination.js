import React from "react";

const Pagination = ({
  totalPosts,
  postsPerPage,
  setCurrentPage,
  currentPage,
}) => {
  const pageNumbers = [];
  for (let i = 1; i <= Math.ceil(totalPosts / postsPerPage); i++) {
    pageNumbers.push(i);
  }

  return (
    <nav>
      <ul className="pagination">
        {currentPage > 1 && (
          <li>
            <button onClick={() => setCurrentPage(currentPage - 1)}>
              <i className="fa-solid fa-chevron-left"></i>
            </button>
          </li>
        )}
        {pageNumbers.map((number) => (
          <li key={number}>
            <button
              className={currentPage === number ? "active" : ""}
              onClick={() => setCurrentPage(number)}
            >
              {number}
            </button>
          </li>
        ))}
        {currentPage < pageNumbers.length && (
          <li>
            <button onClick={() => setCurrentPage(currentPage + 1)}>
              <i className="fa-solid fa-chevron-right"></i>
            </button>
          </li>
        )}
      </ul>
    </nav>
  );
};

export default Pagination;
