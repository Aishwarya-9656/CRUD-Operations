import React from "react";

function Table(props) {
  return (
    <table className="table m-3">
      <thead>
        <tr>
          <th>ID</th>
          <th>Name</th>
          <th>Price</th>
          <th>Category</th>
        </tr>
      </thead>
      <tbody>
        {props.products.map((prod) => {
          return (
            <tr key={prod.id}>
              <td>{prod.id}</td>
              <td>{prod.name}</td>
              <td>{prod.price}</td>
              <td>{prod.category}</td>
              <td>
                <button
                  className="btn btn-primary m-1"
                  onClick={() => props.editProduct(prod)}
                >
                  Edit
                </button>
              </td>
              <td>
                <button
                  className="btn btn-danger m-1"
                  onClick={() => {
                    props.deleteProducts(prod.id);
                    console.log(`clicked delete button of ${prod.id}`);
                  }}
                >
                  Delete
                </button>
              </td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
}

export default Table;
