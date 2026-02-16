import axios from "axios";

const url = "http://localhost:4200/products";

export const getData = async ({
  page = 1,
  perPage = 3,
  category = [],
  minPrice,
  maxPrice,
}) => {
  try {
    let query = `?_page=${page}&_per_page=${perPage}`;

    //category Filter
    if (category.length > 0) {
      query += `&category=${category.join("|")}`;
    }

    //price Filter
    if (minPrice) {
      query += `&price_gte=${minPrice}`;
    }

    if (maxPrice) {
      query += `&price_lte=${maxPrice}`;
    }

    const response = await axios.get(`${url}${query}`);

    return {
      data: response.data.data || [],
      totalCount: response.data.items,
      totalPages: response.data.pages || 1,
    };
  } catch (error) {
    console.log(`Error fetching data ${error}`);
    throw error;
  }
};

export async function deleteData(id) {
  return await axios.delete(`${url}/${id}`);
}

export async function postData(data) {
  return await axios.post(url, data, {
    headers: {
      "Content-Type": "application/json",
    },
  });
}

export async function putData(id, data) {
  return await axios.put(`${url}/${id}`, data, {
    headers: {
      "Content-Type": "application/json",
    },
  });
}
