const backendUrl = "http://localhost:8080/api";

const API = {
  signIn: {
    url: `${backendUrl}/signin`,
    method: "POST",
  },
  signUp: {
    url: `${backendUrl}/signup`,
    method: "POST",
  },
  google: {
    url: `${backendUrl}/google`,
    method: "POST",
  },
  current_user: {
    url: `${backendUrl}/user-details`,
    method: "get",
  },
  logout_user: {
    url: `${backendUrl}/userLogout`,
    method: "GET",
  },
  allUser: {
    url: `${backendUrl}/all-user`,
    method: "GET",
  },
  updateUser: {
    url: `${backendUrl}/update-user`,
    method: "PUT",
  },
  deleteUser: {
    url: `${backendUrl}/delete-user`,
    method: "DELETE",
  },
  // brand 
  getBrandAdmin: {
    url: `${backendUrl}/admin/brand`,
    method: "GET",
  },
  getBrand: {
    url: `${backendUrl}/brand`,
    method: "GET",
  },
  getBrandDetails: {
    url: `${backendUrl}/admin/brand`,
    method: "GET",
  },
  createBrand: {
    url: `${backendUrl}/admin/brand/create`,
    method: "POST",
  },
  updateBrand: {
    url: `${backendUrl}/admin/brand/update`,
    method: "PUT",
  },
  deleteBrand: {
    url: `${backendUrl}/admin/brand`,
    method: "DELETE",
  },
  // product
  getProductAdmin: {
    url: `${backendUrl}/admin/product`,
    method: "GET",
  },
  getProduct: {
    url: `${backendUrl}/product`,
    method: "GET",
  },
  getProductDetails: {
    url: `${backendUrl}/product`,
    method: "GET",
  },
  createProduct: {
    url: `${backendUrl}/admin/product/create`,
    method: "POST",
  },
  updateProduct: {
    url: `${backendUrl}/admin/product/update`,
    method: "PUT",
  },
  deleteProduct: {
    url: `${backendUrl}/admin/product`,
    method: "DELETE",
  },
  getProducts: {
    url: `${backendUrl}/products`,
    method: "GET",
  }
};

export default API;
