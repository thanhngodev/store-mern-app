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
    method: "get",
  },
  updateUser: {
    url: `${backendUrl}/update-user`,
    method: "post",
  }
};

export default API;
