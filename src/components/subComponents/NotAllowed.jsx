import { SiPrivateinternetaccess } from "react-icons/si";
import { useNavigate } from "react-router-dom";

const NotAllowed = () => {
  const navigate = useNavigate();
  return (
    <div className=" bg-slate-100 flex flex-col items-center justify-center w-[100vw] h-[100vh] gap-10">
      <SiPrivateinternetaccess className="text-4xl text-red-500" />
      <h1 className="sm:text-3xl text-2xl font-semibold text-red-500">
        You are not authorized to access the manager details
      </h1>
      <button
        className="bg-indigo-800/[0.9] shadow-lg p-2 px-4 rounded-md text-xl font-semibold text-white"
        onClick={() => navigate(-1)}
      >
        Click here to go back
      </button>
    </div>
  );
};
export default NotAllowed;
