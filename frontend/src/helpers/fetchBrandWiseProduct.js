import API from "../common";

const fetchSearchProduct = async (queryParams) => {
  const response = await fetch(`${API.getProducts.url}?${queryParams}`, {
    method: API.getProducts.method,
  });
  return await response.json();
};

export default fetchSearchProduct;
