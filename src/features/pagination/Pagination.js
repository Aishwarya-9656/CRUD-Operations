import React from "react";

const Pagination = (props) => {
  let paginationNumbers = Array(props.totalpages);

  let selectpageHandler = (selectedPage) => {
    props.setCurrentPage(selectedPage);
  };

  return (
    <div className="pagination">
      <span onClick={() => selectpageHandler(props.currentpage - 1)}>⏪</span>
      {[...paginationNumbers].map((el, i) => {
        return (
          <span
            key={i}
            onClick={() => props.setCurrentPage(i + 1)}
            className={props.currentpage === i + 1 ? "pagination-selected" : ""}
          >
            {i + 1}
          </span>
        );
      })}
      <span onClick={() => selectpageHandler(props.currentpage + 1)}>⏩</span>
    </div>
  );
};

export default Pagination;
