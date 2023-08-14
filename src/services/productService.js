import axios from "axios";
import { toast } from "react-toastify";
import Swal from "sweetalert2";
const BACKEND_URL = process.env.REACT_APP_API;

/* ================= Fetch All Products ================= */
export const FetchProducts = async (token) => {
  try {
    Swal.fire({
      text: "Fetching Data Please wait...",
      imageUrl: "https://hackernoon.com/images/0*4Gzjgh9Y7Gu8KEtZ.gif",
      showConfirmButton: false,
      allowOutsideClick: false,
      width: "250px",
    });
    const response = await axios.get(`${BACKEND_URL}/products`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
    Swal.close();
    return response.data;
  } catch (error) {
    console.log("Error in Fetch Products Service");
  }
};

/* ============= Add new Product ====================== */
export const AddNewProduct = async (token, data, formData, updaterName) => {
  try {
    const response = await axios.post(
      `${BACKEND_URL}/products/add-product`,
      {
        image: data.secure_url,
        formData: formData,
        updatedBy: updaterName,
      },
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    );
    if (response?.data?.success) {
      toast.success(response?.data?.message);
    } else {
      toast.error(response?.data?.message);
    }
    return response.data;
  } catch (error) {
    console.log("error in add new product " + error);
    toast.error(error);
  }
};

/* ============= Edit Product ====================== */
export const UpdateProduct = async (token, data, formData, updaterName) => {
  try {
    const response = await axios.put(
      `${BACKEND_URL}/products/edit-product`,
      {
        image: data.secure_url,
        formData: formData,
        updatedBy: updaterName,
      },
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    );

    if (response?.data?.success) {
      toast.success(response?.data?.message);
    } else {
      toast.error(response?.data?.message);
    }
    return response.data;
  } catch (error) {
    console.log("Error in Update Product Service : " + error);
  }
};

export const DeleteProduct = async (id, token) => {
  try {
    const response = await axios.delete(
      `${BACKEND_URL}/products/delete-product/${id}`,
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    );
    if (response?.data?.success) {
      toast.success(response?.data?.message);
    } else {
      toast.error(response?.data?.message);
    }
    return response.data;
  } catch (error) {
    console.log("Error in Deleting Product : " + error);
  }
};
