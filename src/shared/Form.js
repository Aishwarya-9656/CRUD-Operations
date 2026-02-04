import React, { useState } from "react";

function Form(props) {
  const [product, setProduct] = useState(props.data);
  const [error, setError] = useState({
    name: "",
    price: "",
    category: "",
  });

  let changeForm = (event) => {
    const { name, value } = event.target;
    let errorMessage = "";
    if (name === "name") {
      const valid = /^[A-Za-z0-9]+$/.test(value);
      if (value.trim() === "") {
        errorMessage = "value cannot be empty";
      } else if (!valid) {
        errorMessage =
          "only numbers and letters are allowed, special characters not allowed";
      } else {
        errorMessage = "";
      }
    } else if (name === "price") {
      let valid = value > 0;
      if (!valid) {
        errorMessage = "price should be greater than 0";
      } else {
        errorMessage = "";
      }
    }
    setProduct({ ...product, [name]: value });

    setError((prev) => ({
      ...prev,
      [name]: errorMessage,
    }));
  };

  let isenabled =
    product.name &&
    product.price &&
    product.category &&
    !error.name &&
    !error.price &&
    !error.category;

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
            required
            maxLength={20}
            pattern="^(?=.*[A-Za-z0-9])[A-Za-z0-9 ]+$"
            title="Only letters, numbers and spaces allowed. Cannot be empty."
          />
          {error.name && <div style={{ color: "red" }}>{error.name}</div>}
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
            required
          />
          {error.price && <div style={{ color: "red" }}>{error.price}</div>}
        </div>
        <div className="form-group">
          <label>Category:</label>
          <select
            className="form-control mt-2"
            name="category"
            placeholder="Category"
            value={product.category}
            onChange={changeForm}
            required
          >
            <option value={-1}></option>
            <option value={"mobiles"}>mobiles</option>
            <option value={"earphones"}>earphones</option>
            <option value={"watches"}>watches</option>
          </select>
        </div>
        <button
          className="btn btn-primary float-end"
          disabled={!isenabled}
          onClick={(e) => {
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
