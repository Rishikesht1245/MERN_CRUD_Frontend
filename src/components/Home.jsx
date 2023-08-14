import { useLocation } from "react-router-dom";
import Navbar from "./subComponents/Navbar";
import { Link } from "react-router-dom";
import axios from "axios";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";

const BACKEND_URL = process.env.RECT_APP_API || "http://localhost:5000";
console.log("Backend URL");
console.log(BACKEND_URL);

const Home = () => {
  const token =
    useSelector((state) => state?.auth?.token) ||
    JSON.parse(localStorage.getItem("loginDetails")).token;
  const [homeData, setHomeData] = useState({});
  const getData = async () => {
    const response = await axios.get(`${BACKEND_URL}/home`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
    if (response?.data?.success) {
      setHomeData(response?.data?.count);
    }
  };

  useEffect(() => {
    getData();
  }, []);

  const location = useLocation();
  return (
    <div>
      <Navbar />
      <div className="bg-gray-300 w-[100vw] sm:h-[calc(100vh-60px)] flex items-center ">
        <div className="flex flex-col bg-gray-600 sm:w-[70%] w-full sm:h-[70%] h-[80%] sm:rounded-lg shadow-xl m-auto px-10">
          <h3 className="text-gray-300 text-3xl font-serif text-center my-10 font-semibold">
            Welcome to the Dashboard
          </h3>
          <div className="flex flex-col sm:flex-row justify-around sm:gap-10 gap-5">
            <Link
              to="/products"
              className="bg-gradient-to-r from-cyan-700 to-blue-700 sm:w-[40%] w-[full]] h-[200px] rounded-xl shadow-xl text-center flex flex-col"
            >
              <h1 className="font-semibold sm:p-6 p-4 text-xl text-slate-100 ">
                Products
              </h1>
              <ul className="text-start sm:px-10 px-5">
                <li className="sm:my-2 font-semibold text-slate-200">
                  Total Products : {homeData.productCount}
                </li>
                <li className="my-2 font-semibold text-slate-200">
                  Active Products : {homeData.productCount}
                </li>
                <li className="my-2 font-semibold text-slate-200">
                  In-Active Products : 0
                </li>
              </ul>
            </Link>
            <Link
              to="/managers"
              className="bg-gradient-to-r from-purple-500 to-pink-500 sm:w-[40%] w-[full] h-[200px] rounded-xl shadow-xl text-center flex flex-col"
            >
              <h1 className="font-semibold sm:p-6 p-4 text-xl text-slate-100">
                Managers
              </h1>
              <ul className="text-start sm:px-10  px-5">
                <li className="my-2 font-semibold text-slate-200">
                  Total Managers : {homeData.managerCount}
                </li>
                <li className="my-2 font-semibold text-slate-200">
                  Active Managers : {homeData.managerCount}
                </li>
                <li className="my-2 font-semibold text-slate-200">
                  In-Active Managers : 0
                </li>
              </ul>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};
export default Home;
