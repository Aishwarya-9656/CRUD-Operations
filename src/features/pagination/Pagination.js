import React from "react";

const Pagination = (props) => {
  let selectpageHandler = (selectedPage) => {
    props.setCurrentPage(selectedPage);
  };

  const windowsize = 4;

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

  return (
    <div className="pagination">
      <span
        onClick={() => selectpageHandler(props.currentpage - 1)}
        className={props.currentpage <= 1 ? "pagination-disabled" : ""}
      >
        ⏪
      </span>
      {pages.map((page, i) => {
        return (
          <span
            key={page}
            onClick={(e) => {
              e.stopPropagation();
              props.setCurrentPage(page);
            }}
            className={props.currentpage === page ? "pagination-selected" : ""}
          >
            {page}
          </span>
        );
      })}
      <span
        onClick={() => selectpageHandler(props.currentpage + 1)}
        className={
          props.currentpage >= props.totalpages ? "pagination-disabled" : ""
        }
      >
        ⏩
      </span>
    </div>
  );
};

export default Pagination;
