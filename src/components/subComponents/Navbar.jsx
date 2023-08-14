import { Link, useNavigate } from "react-router-dom";
import { logout } from "../../Redux/Slices/authSlice";
import { useDispatch } from "react-redux";
import { AiFillHome } from "react-icons/ai";
import { FcManager } from "react-icons/fc";
import { BiLaptop } from "react-icons/bi";
import { IoMdLogOut } from "react-icons/io";

const Navbar = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    dispatch(logout());
    localStorage.removeItem("token");
    window.history.replaceState(null, "", "/");
    navigate("/");
  };
  return (
    <>
      <div className="bg-gray-800 h-[60px] px-10 w-full">
        <div className="hidden sm:flex justify-between items-center h-full w-full">
          <Link to={"/home"} className="text-white font-bold text-xl">
            Dashboard
          </Link>
          <div className="flex items-center gap-10 text-white font-semibold">
            <Link to="/managers">Managers</Link>
            <Link to="/products">Products</Link>
          </div>
          <div className="flex items-center gap-10 text-white font-semibold">
            <button onClick={handleLogout}>Logout</button>
          </div>
        </div>
        <div className="flex sm:hidden justify-between items-center h-full w-full">
          <Link to={"/home"} className="text-white font-bold text-xl">
            <AiFillHome />
          </Link>
          <div className="flex items-center gap-10 text-white font-semibold">
            <Link to="/managers">
              <FcManager className="text-2xl font-semibold" />
            </Link>
            <Link to="/products">
              <BiLaptop className="text-2xl font-semibold" />
            </Link>
          </div>
          <div className="flex items-center gap-10 text-white font-semibold">
            <button onClick={handleLogout}>
              <IoMdLogOut className="text-2xl font-semibold text-slate-100" />
            </button>
          </div>
        </div>
      </div>
    </>
  );
};
export default Navbar;
