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
    method: "POST",
  },
  deleteUser: {
    url: `${backendUrl}/delete-user`,
    method: "DELETE",
  },
  // brand 
  getBrand: {
    url: `${backendUrl}/brand`,
    method: "GET",
  },
  getBrandDetails: {
    url: `${backendUrl}/brand`,
    method: "GET",
  },
  createBrand: {
    url: `${backendUrl}/brand/create`,
    method: "POST",
  },
  updateBrand: {
    url: `${backendUrl}/brand/update`,
    method: "PUT",
  },
  deleteBrand: {
    url: `${backendUrl}/brand`,
    method: "DELETE",
  }
};

export default API;
