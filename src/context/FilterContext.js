import { createContext, useContext, useState } from "react";

const FilterContext = createContext();

export const FilterProvider = ({ children }) => {
  const [leastprice, setLeastPrice] = useState();
  const [Highprice, setHighPrice] = useState();

  return (
    <FilterContext.Provider
      value={{
        leastprice,
        setLeastPrice,
        Highprice,
        setHighPrice,
      }}
    >
      {children}
    </FilterContext.Provider>
  );
};

export const useFilter = () => useContext(FilterContext);
