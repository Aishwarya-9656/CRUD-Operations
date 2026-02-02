import React from "react";
import CategoryFilter from "./CategoryFilter";
import PriceFilter from "./PriceFilter";

const FilterPannel = (props) => {
  const handleCategoryChange = (value) => {
    props.setSelectedCategory((prev) => {
      if (prev.includes(value)) {
        return prev.filter((item) => item !== value);
      } else {
        return [...prev, value];
      }
    });
  };

  return (
    <div>
      <form action="">
        <CategoryFilter handleCategoryChange={handleCategoryChange} />
        <br />
        <br />
        <PriceFilter
          leastprice={props.leastprice}
          setLeastPrice={props.setLeastPrice}
          Highprice={props.Highprice}
          setHighPrice={props.setHighPrice}
        />
        <button
          onClick={(e) => {
            e.preventDefault();
            props.apply();
          }}
        >
          Apply
        </button>
      </form>
    </div>
  );
};

export default FilterPannel;
