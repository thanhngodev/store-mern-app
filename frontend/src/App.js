import "./App.css";
import { Outlet, useNavigate } from "react-router-dom";
import Header from "./components/Header";
import Footer from "./components/Footer";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import API from "./common";
import { useEffect } from "react";
import Context from "./context";
import { useDispatch } from "react-redux";
import { setUserDetails } from "./store/userSlice";

function App() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    fetchUserDetails();
  }, []);

  const fetchUserDetails = async () => {
    const dataResponse = await fetch(API.current_user.url, {
      method: API.current_user.method,
      credentials: "include",
    });

    const dataApi = await dataResponse.json();
    if(dataApi.success) {
      dispatch(setUserDetails(dataApi.data));
    }

    if(dataApi.error) {
      navigate('/login');
    }
  };

  return (
    <>
      <Context.Provider  value={{fetchUserDetails}} >
        <Header />
        <main className="min-h-[calc(100vh-57px)] pt-16">
          <Outlet />
        </main>
        <Footer />
        <ToastContainer position="top-center" />
      </Context.Provider>
    </>
  );
}

export default App;
