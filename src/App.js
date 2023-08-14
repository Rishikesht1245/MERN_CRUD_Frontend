import {
  BrowserRouter as Router,
  Routes,
  Route,
  useNavigate,
  Navigate,
} from "react-router-dom";

import { useSelector } from "react-redux";

import Login from "./components/Login";
import SignUp from "./components/SignUp";
import Home from "./components/Home";
import Products from "./components/Products/Products";
import AddProduct from "./components/Products/AddProduct";
import Managers from "./components/Managers/Managers";
import NotAllowed from "./components/subComponents/NotAllowed";

import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./style.css";

function App() {
  const token =
    useSelector((state) => state?.auth?.token) || localStorage.getItem("token");

  const isAdmin = useSelector((state) => state?.auth?.isAdmin);

  return (
    <Router>
      <ToastContainer />
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/signUp" element={<SignUp />} />
        <Route path="/home" element={!token ? <Login /> : <Home />} />
        <Route path="/products" element={!token ? <Login /> : <Products />} />
        <Route
          path="/products/add-product"
          element={!token ? <Login /> : <Products />}
        />
        <Route
          path="/managers"
          element={token && isAdmin ? <Managers /> : <NotAllowed />}
        />
      </Routes>
    </Router>
  );
}

export default App;
