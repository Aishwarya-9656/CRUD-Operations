import React from "react";

const PriceFilter = (props) => {
  return (
    <div>
      <div>Filter based on price </div>
      <br />

      <label>Minimum price</label>
      <input
        type="number"
        name="minimumPrice"
        placeholder="min price"
        value={props.leastprice}
        onChange={(e) => {
          props.setLeastPrice(e.target.value);
        }}
      />
      <br />

      <label>Maximum price</label>
      <input
        type="number" 
        name="maximumPrice"
        placeholder="max price"
        value={props.Highprice}
        onChange={(e) => {
          props.setHighPrice(e.target.value);
        }}
      />
    </div>
  );
};

export default PriceFilter;
