import React, { useEffect, useState } from "react";
import Table from "./features/table/Table";
import Form from "./shared/Form";
import { getData, deleteData, postData, putData } from "./Api.js";
import FilterPannel from "./features/filters/FilterPanel";
import { useFilter } from "./context/FilterContext.js";
import Pagination from "./features/pagination/Pagination.js";

function App() {
  const [products, setProducts] = useState([]);
  const [openform, setOpenForm] = useState(false);
  const [edit, setEdit] = useState(false);
  const [initialForm, setInitialForm] = useState({
    name: "",
    price: "",
    category: "",
  });

  // filter variables
  const [selectedCategory, setSelectedCategory] = useState([]);
  let [FilteredProducts, setFilteredProducts] = useState([]);
  const { leastprice, Highprice } = useFilter();

  // pagination variables
  const [currentpage, setCurrentPage] = useState(1);
  const itemsperpage = 3;
  const totalpages = Math.ceil(products.length / itemsperpage);

  const startindex = (currentpage - 1) * itemsperpage;
  const endindex = startindex + itemsperpage;

  const paginatedData = products.slice(startindex, endindex);

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
    // only category filter applied
    if (selectedCategory.length !== 0 && !Highprice && !leastprice) {
      setFilteredProducts(
        products.filter((item) => {
          let categoryCondition = selectedCategory.includes(item.category);
          return categoryCondition;
        }),
      );
    }

    // only price filter applied
    else if (selectedCategory.length === 0 && (leastprice || Highprice)) {
      setFilteredProducts(
        products.filter((item) => {
          let priceCondition =
            item.price >= leastprice && item.price <= Highprice;
          return priceCondition;
        }),
      );
    }

    // both category and price filters applied
    else if (selectedCategory.length !== 0 && (leastprice || Highprice)) {
      setFilteredProducts(
        products.filter((item) => {
          let priceCondition =
            item.price >= leastprice && item.price <= Highprice;

          let categoryCondition = selectedCategory.includes(item.category);

          let filterCondition = priceCondition && categoryCondition;

          return filterCondition;
        }),
      );
    }

    //no filters applied
    else if (selectedCategory.length === 0 && !leastprice && !Highprice) {
      setFilteredProducts(products);
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
      />
      <Table
        products={paginatedData}
        deleteProducts={deleteProducts}
        editProduct={editProduct}
      ></Table>
      <Pagination
        totalpages={totalpages}
        currentpage={currentpage}
        setCurrentPage={setCurrentPage}
      />
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
