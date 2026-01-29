import React from "react";

const FilterPannel = ({ selectedCategory, setSelectedCategory, apply }) => {
  const handleCategoryChange = (value) => {
    setSelectedCategory((prev) => {
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
        <input
          type="checkbox"
          id="mobiles"
          name="mobiles"
          value="mobiles"
          onChange={() => {
            handleCategoryChange("mobiles");
          }}
        />
        <label htmlFor="mobiles"> Mobiles </label>
        <br />
        <input
          type="checkbox"
          id="earphones"
          name="earphones"
          value="earphones"
          onChange={() => {
            handleCategoryChange("earphones");
          }}
        />
        <label htmlFor="earphones">EarPhones</label>
        <br />
        <input
          type="checkbox"
          id="watches"
          name="watches"
          value="watches"
          onChange={() => {
            handleCategoryChange("watches");
          }}
        />
        <label htmlFor="watches">Watches</label>
        <br />
        <br />
        <button
          onClick={(e) => {
            e.preventDefault();
            apply();
          }}
        >
          Apply
        </button>
      </form>
    </div>
  );
};

export default FilterPannel;
