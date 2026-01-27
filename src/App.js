import React, { useEffect, useState } from "react";
import Table from "./components/Table";
import Form from "./components/Form";
import { getData, deleteData, postData, putData } from "./components/Api";

function App() {
  const [products, setProducts] = useState([]);
  const [openform, setOpenForm] = useState(false);
  const [edit, setEdit] = useState(false);
  const [initialForm, setInitialForm] = useState({
    name: "",
    price: "",
    category: "",
  });

  useEffect(() => {
    getProducts();
  }, []);

  let getProducts = async () => {
    let res = await getData();
    setProducts(res.data);
    console.log(res);
    console.log(res.data);
  };

  let deleteProducts = async (id) => {
    await deleteData(id);
    getProducts();
  };

  let addProduct = async (product) => {
    let data = {
      name: product.name,
      price: Number(product.price),
      category: product.category,
    };

    if (edit) {
      await putData(product.id, data);
    } else {
      await postData(data);
    }
    getProducts();
    setOpenForm(false);
    setEdit(false);
  };

  let editProduct = async (data) => {
    setInitialForm(data);
    setOpenForm(true);
    setEdit(true);
  };

  const showForm = () => {
    setOpenForm(true);
    setInitialForm({
      name: "",
      price: "",
      category: "",
    });
    setEdit(false);
  };

  const closeForm = () => {
    setOpenForm(false);
  };

  return (
    <div className="wrapper m-5 w-50">
      <h1 className="text-primary">crud operations</h1>
      <button className="btn btn-primary" onClick={showForm}>
        add products
      </button>
      <Table
        products={products}
        deleteProducts={deleteProducts}
        editProduct={editProduct}
      ></Table>
      {openform && (
        <Form
          closeForm={closeForm}
          data={initialForm}
          addProduct={addProduct}
        ></Form>
      )}
    </div>
  );
}

export default App;
