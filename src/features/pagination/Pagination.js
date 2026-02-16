import React from "react";

const Pagination = (props) => {
  let selectpageHandler = (selectedPage) => {
    props.setCurrentPage(selectedPage);
  };

  /*

  let endpage = props.currentpage + 1;
  if (endpage > props.totalpages) {
    endpage = props.totalpages;
  }

  let startpage = endpage - (windowsize - 1);
  if (startpage < 1) {
    startpage = 1;
  }

  const pages = [];
  for (let i = startpage; i <= endpage; i++) {
    pages.push(i);
  }
    */

  return (
    <div className="pagination">
      <span
        onClick={() => selectpageHandler(props.currentPage - 1)}
        className={props.currentPage <= 1 ? "pagination-disabled" : ""}
      >
        ⏪
      </span>
      {[...Array(props.totalPages)].map((_, i) => {
        let page = i + 1;

        return (
          <span
            key={page}
            onClick={(e) => {
              e.stopPropagation();
              props.setCurrentPage(page);
            }}
            className={props.currentPage === page ? "pagination-selected" : ""}
          >
            {page}
          </span>
        );
      })}
      <span
        onClick={() => selectpageHandler(props.currentPage + 1)}
        className={
          props.currentPage >= props.totalpages ? "pagination-disabled" : ""
        }
      >
        ⏩
      </span>
    </div>
  );
};

export default Pagination;
