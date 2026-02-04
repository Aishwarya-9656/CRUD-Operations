import React from 'react'

const CategoryFilter = (props) => {
  return (
    <div>
        <input
          type="checkbox"
          id="mobiles"
          name="mobiles"
          value="mobiles"
          onChange={() => {
            props.handleCategoryChange("mobiles");
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
            props.handleCategoryChange("earphones");
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
            props.handleCategoryChange("watches");
          }}
        />
        <label htmlFor="watches">Watches</label>
    </div>
  )
}

export default CategoryFilter