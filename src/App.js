import React, { useEffect, useState } from "react";
import Table from "./components/Table";
import Form from "./components/Form";
import { getData, deleteData, postData, putData } from "./components/Api";
import FilterPannel from "./components/FilterPannel";

function App() {
  const [products, setProducts] = useState([]);
  const [openform, setOpenForm] = useState(false);
  const [edit, setEdit] = useState(false);
  const [initialForm, setInitialForm] = useState({
    name: "",
    price: "",
    category: "",
  });
  const [selectedCategory, setSelectedCategory] = useState([]);
  let [FilteredProducts, setFilteredProducts] = useState([]);
  const [leastprice, setLeastPrice] = useState();
  const [Highprice, setHighPrice] = useState();

  useEffect(() => {
    getProducts();
  }, []);

  let getProducts = async () => {
    try {
      let res = await getData();
      setProducts(res.data);
      setFilteredProducts(res.data);
    } catch (error) {
      console.log(error);
      alert("failed fetching the products");
    }
  };

  let deleteProducts = async (id) => {
    try {
      alert("are you sure to delete this product");
      await deleteData(id);
    } catch (error) {
      alert("failed to delete the product");
    }
    getProducts();
  };

  let addProduct = async (product) => {
    try {
      let data = {
        name: product.name,
        price: Number(product.price),
        category: product.category,
      };

      if (edit) {
        await putData(product.id, data);
        alert("product edited successfully");
      } else {
        await postData(data);
        alert("product added successfully");
      }
      getProducts();
      setOpenForm(false);
      setEdit(false);
    } catch (error) {
      alert("failed to edit the product");
    }
  };

  let editProduct = (data) => {
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

  const onFilterApply = () => {
    if (selectedCategory.length === 0) {
      return setFilteredProducts(products);
    } else {
      return setFilteredProducts(
        products.filter((item) => {
          let priceCondition =
            item.price >= leastprice && item.price <= Highprice;
          console.log(`priceCondition ${priceCondition}`);

          let categoryCondition = selectedCategory.includes(item.category);
          console.log(`categoryCondition ${categoryCondition}`);

          let filterCondition = priceCondition && categoryCondition;
          console.log(`filterCondition ${filterCondition}`);

          return filterCondition;
        }),
      );
    }
  };

  return (
    <div className="wrapper m-5 w-50">
      <h1 className="text-primary">crud operations</h1>
      <button className="btn btn-primary float-end" onClick={showForm}>
        add products
      </button>
      <FilterPannel
        selectedCategory={selectedCategory}
        setSelectedCategory={setSelectedCategory}
        apply={onFilterApply}
        leastprice={leastprice}
        setLeastPrice={setLeastPrice}
        Highprice={Highprice}
        setHighPrice={setHighPrice}
      />
      <Table
        products={FilteredProducts}
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
