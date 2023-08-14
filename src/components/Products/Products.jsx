import Navbar from "../subComponents/Navbar";

import { useEffect, useState, useRef } from "react";
import { useSelector } from "react-redux";

import AddProduct from "./AddProduct";
import ConfirmDialog from "../subComponents/ConfirmDialog";

import { DeleteProduct, FetchProducts } from "../../services/productService";

import { LiaLaptopSolid } from "react-icons/lia";
import { FaPencil } from "react-icons/fa6";
import { RiDeleteBin6Fill } from "react-icons/ri";

import { toast } from "react-toastify";

// responsive data table
import { Table, Thead, Tbody, Tr, Th, Td } from "react-super-responsive-table";
import "react-super-responsive-table/dist/SuperResponsiveTableStyle.css";

const Products = () => {
  const token =
    useSelector((state) => state?.auth?.token) ||
    JSON.parse(localStorage.getItem("loginDetails")).token;

  const [addForm, setAddForm] = useState(false);
  const [editForm, setEditForm] = useState(false);
  const [editFormData, setEditFormData] = useState({});
  const [productList, setProductList] = useState([]);
  const [showConfirm, setShowConfirm] = useState(false);
  const [deleteId, setDeleteId] = useState(null);

  /* ==================== GET ALL PRODUCTS ==================*/

  //function to call fetchProducts service which will make api call
  const getFetchedProducts = async () => {
    const data = await FetchProducts(token);
    if (data?.success) {
      setProductList(data?.allProducts);
    }
  };

  //fetching data in initial mounting
  useEffect(() => {
    getFetchedProducts();
  }, []);

  /* =================== ADD NEW PRODUCT =====================*/

  /* =================== UPDATE PRODUCT =====================*/
  const handleUpdate = async (product) => {
    setEditForm(true);
    setEditFormData(product);
  };

  /* =================== DELETE PRODUCT =====================*/
  const handleDelete = async (id) => {
    setDeleteId(id);
    setShowConfirm(true);
  };

  const onConfirm = async () => {
    const data = await DeleteProduct(deleteId, token);
    if (data?.success) {
      setShowConfirm(false);
      getFetchedProducts();
    } else {
      toast.error(data?.message);
    }
  };

  const onCancel = () => {
    setShowConfirm(false);
  };

  return (
    <div className="relative">
      <Navbar />
      <div className="w-full max-w-[1000px] bg-gray-600 h-[50px] mx-auto my-10 flex items-center justify-around ">
        <LiaLaptopSolid className="text-5xl text-teal-500" />
        <h1 className="text-xl text-end text-gray-100 font-bold">Products</h1>
        <button
          className=" p-1 px-3 bg-teal-600 shadow-lg hover:shadow-teal-600/40 text-white font-semibold rounded-lg cursor-pointer"
          onClick={() => setAddForm(true)}
        >
          Add Products
        </button>
      </div>
      {/* add form only display on button click */}
      {addForm && (
        <AddProduct
          handleClose={setAddForm}
          title={"Add"}
          getFetchedProducts={getFetchedProducts}
        />
      )}
      {/* Edit form pending */}
      {editForm && (
        <AddProduct
          handleClose={setEditForm}
          title={"Edit"}
          getFetchedProducts={getFetchedProducts}
          data={editFormData}
        />
      )}
      {/* Table to show all the available products */}
      <div className="h-auto mx-auto my-10 w-full max-w-[1000px]">
        <Table className="shadow-lg bg-white border-collapse">
          <Thead>
            <Tr>
              <Th className="bg-blue-100 border text-left px-8 py-4">Image</Th>
              <Th className="bg-blue-100 border text-left px-8 py-4">Name</Th>
              <Th className="bg-blue-100 border text-left px-8 py-4">
                Category
              </Th>
              <Th className="bg-blue-100 border text-left px-8 py-4">Price</Th>
              <Th className="bg-blue-100 border text-left px-8 py-4">Stock</Th>
              <Th className="bg-blue-100 border text-left px-8 py-4">
                Updated By
              </Th>
              <Th className="bg-blue-100 border text-left px-8 py-4">
                Actions
              </Th>
            </Tr>
          </Thead>

          {/* Table body */}
          {productList.length === 0 ? (
            <h1 className="font-medium text-l text-center mx-auto p-5">
              No data to show
            </h1>
          ) : (
            <Tbody>
              {productList.map((product, index) => {
                return (
                  <Tr
                    key={product._id}
                    className={`hover:bg-gray-300 focus:bg-gray-300 ${
                      index % 2 === 0 ? "bg-gray-200" : "bg-gray-50"
                    }`}
                    tabIndex="0"
                  >
                    <Td className="border px-8 py-4">
                      <img
                        className="w-[100px] h-[100px]"
                        src={product.image}
                        alt="Product Img"
                      />
                    </Td>
                    <Td className="border px-8 py-4">{product.name}</Td>
                    <Td className="border px-8 py-4">{product.category}</Td>
                    <Td className="border px-8 py-4">{product.price}</Td>
                    <Td className="border px-8 py-4">{product.stock}</Td>
                    <Td className="border px-8 py-4">{product.updatedBy}</Td>
                    <Td className="border px-8 py-4">
                      <div className="flex justify-around">
                        <FaPencil
                          className="text-xl hover:text-green-900 text-green-700"
                          onClick={() => handleUpdate(product)}
                        />
                        <RiDeleteBin6Fill
                          className="text-xl text-red-700 hover:text-red-900"
                          onClick={() => handleDelete(product._id)}
                        />
                      </div>
                    </Td>
                  </Tr>
                );
              })}
            </Tbody>
          )}
        </Table>
      </div>
      {/* cofirm */}
      {showConfirm && (
        <ConfirmDialog
          message={"Are you sure you want to delete this item?"}
          onCancel={onCancel}
          onConfirm={onConfirm}
        />
      )}
    </div>
  );
};
export default Products;
