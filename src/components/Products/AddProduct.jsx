import { useState } from "react";
import { useSelector } from "react-redux";

import Swal from "sweetalert2";
import axios from "axios";

import { AiOutlineCloseCircle } from "react-icons/ai";
import { toast } from "react-toastify";

import { AddNewProduct, UpdateProduct } from "../../services/productService";

const AddProduct = ({
  handleClose,
  title,
  getFetchedProducts,
  data = null,
}) => {
  const updaterName =
    useSelector((state) => state?.auth?.name) ||
    JSON.parse(localStorage.getItem("loginDetails")).name;
  let initialState;
  if (title === "Add") {
    initialState = {
      name: "",
      category: "",
      price: "",
      stock: "",
      updatedBy: updaterName,
    };
  } else {
    initialState = {
      id: data._id,
      name: data.name,
      category: data.category,
      price: data.price,
      stock: data.stock,
      image: data.image,
    };
  }

  const cloudName = process.env.REACT_APP_CLOUD_NAME || "djcn6luvw";
  const BACKEND_URL = process.env.REACT_APP_API;

  const [formData, setFormData] = useState(initialState);
  const [selectedFile, setSelectedFile] = useState();
  const { id, name, category, price, stock, image } = formData;

  console.log(image);
  const token =
    useSelector((state) => state?.auth?.token) ||
    JSON.parse(localStorage.getItem("loginDetails")).token;
  // handling input change
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setSelectedFile(file);
  };
  // handling submit for both edit and add products
  const handleSubmit = async (e) => {
    if (!name || !category || !price || !stock) {
      return toast.error("All fields are required");
    }
    Swal.fire({
      text: "Please wait...",
      imageUrl: "https://hackernoon.com/images/0*4Gzjgh9Y7Gu8KEtZ.gif",
      showConfirmButton: false,
      allowOutsideClick: false,
      width: "250px",
    });
    e.preventDefault();
    // for uploading to cloudinary => formData
    const data = new FormData();
    data.append("file", selectedFile);
    data.append("upload_preset", "merncrud");
    data.append("cloud_name", cloudName);
    await fetch(`https://api.cloudinary.com/v1_1/${cloudName}/image/upload`, {
      method: "post",
      body: data,
    })
      .then((res) => res.json())
      .then(async (data) => {
        let response;
        // add product
        if (title === "Add") {
          response = await AddNewProduct(token, data, formData, updaterName);
        } else {
          //edit product
          response = await UpdateProduct(token, data, formData, updaterName);
        }

        if (response.success) {
          Swal.close();
          handleClose(false);
          getFetchedProducts();
        } else {
          Swal.close();
          getFetchedProducts();
        }
      })
      .catch((error) => {
        console.log("Error in Cloudinary Upload" + error);
        Swal.close();
      });
  };

  return (
    <form
      className={`fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-50 z-[5] shadow-lg transition-all ease-in`}
      onSubmit={handleSubmit}
    >
      <div
        className={`max-w-[550px] sm:w-[500px] bg-gray-900 p-5 overflow-y-auto rounded-lg ${
          data ? "h-[100vh] overflow-y-scroll scrollbar-none" : ""
        }`}
      >
        <AiOutlineCloseCircle
          className="ml-auto text-2xl text-white"
          onClick={() => handleClose(false)}
        />
        <h2 className="text-2xl dark:text-white font-bold text-center">
          {`${title} Product Form`}
        </h2>
        <div className="flex flex-col text-gray-400 py-2">
          <label htmlFor="name">Name</label>
          <input
            type="text"
            required
            name="name"
            id="name"
            value={name}
            onChange={handleInputChange}
            placeholder="Enter name"
            className="rounded-lg bg-gray-700 mt-2 p-2 focus:border-y-blue-500 focus:bg-gray-800 focus:outline-none"
          />
        </div>
        <div className="flex flex-col text-gray-400 py-2">
          <label htmlFor="category">Category</label>
          <input
            type="text"
            name="category"
            required
            id="category"
            value={category}
            onChange={handleInputChange}
            placeholder="Enter Category"
            className="rounded-lg bg-gray-700 mt-2 p-2 focus:border-y-blue-500 focus:bg-gray-800 focus:outline-none"
          />
        </div>
        <div className="flex flex-col text-gray-400 py-2">
          <label htmlFor="price">Price</label>
          <input
            type="number"
            name="price"
            required
            id="price"
            value={price}
            onChange={handleInputChange}
            placeholder="Enter price"
            className="rounded-lg bg-gray-700 mt-2 p-2 focus:border-y-blue-500 focus:bg-gray-800 focus:outline-none"
          />
        </div>
        <div className="flex flex-col text-gray-400 py-2">
          <label htmlFor="stock">Stock</label>
          <input
            type="number"
            name="stock"
            id="stock"
            required
            value={stock}
            onChange={handleInputChange}
            placeholder="Enter stock"
            className="rounded-lg bg-gray-700 mt-2 p-2 focus:border-y-blue-500 focus:bg-gray-800 focus:outline-none"
          />
        </div>
        <div className="flex flex-col text-gray-400 py-2">
          <label htmlFor="image">Upload Image</label>
          <input
            name="addPic"
            type="file"
            className="rounded-lg bg-gray-700 mt-2 p-2 focus:border-y-blue-500 focus:bg-gray-800 focus:outline-none"
            alt=""
            accept=".jpg"
            onChange={handleFileChange}
          />
        </div>
        {/* div for image preview while editing */}
        {data && (
          <div className="flex flex-col w-[100px] h-[100px]">
            <img src={image} alt="Preview Image" />
          </div>
        )}
        <input
          type="text"
          name="updatedBy"
          required
          value={updaterName}
          id="updatedBy"
          hidden
          className="rounded-lg bg-gray-700 mt-2 p-2 focus:border-y-blue-500 focus:bg-gray-800 focus:outline-none"
        />
        <button
          type="submit"
          className="w-full my-5 py-2 bg-indigo-500 shadow-lg hover:shadow-teal-500/40 text-white font-semibold rounded-lg"
        >
          {`${title}`}
        </button>
      </div>
    </form>
  );
};

export default AddProduct;
