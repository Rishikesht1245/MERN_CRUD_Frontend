import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
import { toast } from "react-toastify";
import login_img from "../assets/login_Img.jpg";
import { LoginPerson, ValidateEmail } from "../services/authService";
import { useDispatch } from "react-redux";
import { login } from "../Redux/Slices/authSlice";

const Login = () => {
  const initialState = {
    email: "",
    password: "",
  };

  const [formData, setFormData] = useState(initialState);
  const { email, password } = formData;
  const navigate = useNavigate();
  const dispatch = useDispatch();

  // input change handler
  const handleInputChange = (e) => {
    //destructuring e.target.name and e.target.value
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // form submit handler
  const handleSubmit = async (e) => {
    e.preventDefault();

    //checking if email or password is empty
    if (!email || !password) {
      return toast.error("All fields are required");
    }

    //email validation : returns true or false
    if (!ValidateEmail(email)) {
      return toast.error("Please enter a valid email");
    }

    const userData = {
      email,
      password,
    };

    try {
      //calling logiPerson and navigate is set there
      const data = await LoginPerson(userData);
      if (data.status === "OK") {
        console.log(data.loginDetails);
        dispatch(login(data.loginDetails));
        localStorage.setItem("loginDetails", data.loginDetails);
        navigate("/home", { state: { id: formData.email } });
      }
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 h-screen w-full">
      <div className="hidden sm:block">
        <img
          className="w-full h-full object-cover mix-blend-screen"
          src={login_img}
          alt="Login Image"
        />
      </div>
      <div className="bg-gray-800 flex flex-col justify-center">
        <form
          className="max-w-[400px] w-full mx-auto bg-gray-900 p-8 px-8 rounded-lg"
          action="POST"
          onSubmit={handleSubmit}
        >
          <h2 className="text-4xl dark:text-white font-bold text-center">
            SIGN IN
          </h2>
          <div className="flex flex-col text-gray-400 py-2">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              name="email"
              id="email"
              onChange={handleInputChange}
              placeholder="Enter your email"
              className="rounded-lg bg-gray-700 mt-2 p-2 focus:border-y-blue-500 focus:bg-gray-800 focus:outline-none"
            />
          </div>
          <div className="flex flex-col text-gray-400 py-2">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              name="password"
              id="password"
              onChange={handleInputChange}
              placeholder="Enter password"
              className="rounded-lg bg-gray-700 mt-2 p-2 focus:border-y-blue-500 focus:bg-gray-800 focus:outline-none"
            />
          </div>
          <div className="flex justify-between text-gray-400 py-2">
            <p className="flex items-center">
              <input type="checkbox" className="mr-2" />
              Remember Me
            </p>
            <Link to="/forgotPassword">
              <p>Forgot Password</p>
            </Link>
          </div>
          <button
            type="submit"
            className="w-full my-5 py-2 bg-teal-500 shadow-lg shadow-teal-500/50 hover:shadow-teal-500/40 text-white font-semibold rounded-lg"
          >
            Sign In
          </button>
        </form>
      </div>

      {/* <br />
      <p>OR</p>
      <br />

      <Link to="/signUp">Click here to Register</Link> */}
    </div>
  );
};
export default Login;
