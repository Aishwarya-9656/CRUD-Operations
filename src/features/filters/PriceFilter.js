import React from "react";
import { useFilter } from "../../context/FilterContext";

const PriceFilter = (props) => {
  const { leastprice, setLeastPrice, Highprice, setHighPrice } = useFilter();

  return (
    <div>
      <div>Filter based on price </div>
      <br />

      <label>Minimum price</label>
      <input
        type="number"
        name="minimumPrice"
        placeholder="min price"
        value={leastprice}
        onChange={(e) => {
          setLeastPrice(e.target.value);
        }}
      />
      <br />

      <label>Maximum price</label>
      <input
        type="number"
        name="maximumPrice"
        placeholder="max price"
        value={Highprice}
        onChange={(e) => {
          setHighPrice(e.target.value);
        }}
      />
    </div>
  );
};

export default PriceFilter;
