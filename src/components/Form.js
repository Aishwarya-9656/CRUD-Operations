import React, { useState } from "react";

function Form(props) {
  const [product, setProduct] = useState(props.data);

  let changeForm = (event) => {
    const { name, value } = event.target;
    setProduct({ ...product, [name]: value });
  };

  return (
    <div className="form-overlay">
      <form>
        <div className="form-group">
          <label>Name:</label>
          <input
            className="form-control mt-2"
            type="text"
            value={product.name}
            name="name"
            placeholder="Enter Name"
            onChange={changeForm}
          />
        </div>
        <div className="form-group">
          <label>Price:</label>
          <input
            className="form-control mt-2"
            type="number"
            value={product.price}
            name="price"
            placeholder="Enter Price"
            onChange={changeForm}
          />
        </div>
        <div className="form-group">
          <label>Category:</label>
          <select
            className="form-control mt-2"
            name="category"
            placeholder="Category"
            value={product.category}
            onChange={changeForm}
          >
            <option value={-1}></option>
            <option value={"mobiles"}>mobiles</option>
            <option value={"earphones"}>earphones</option>
            <option value={"watches"}>watches</option>
          </select>
        </div>
        <button
          className="btn btn-primary float-end"
          onClick={(e) => {
            e.preventDefault();
            props.addProduct(product);
            props.closeForm();
          }}
        >
          send
        </button>
        <button
          className="btn btn-danger float-end"
          onClick={(e) => {
            e.preventDefault();
            props.closeForm();
          }}
        >
          cancel
        </button>
      </form>
    </div>
  );
}

export default Form;
