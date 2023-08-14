import axios from "axios";
import { toast } from "react-toastify";

const BACKEND_URL = process.env.REACT_APP_API;

// ==================== email validation using regex ==================== //
export const ValidateEmail = (email) => {
  //returns true of false
  return email.match(
    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
  );
};

// ======================== User Log In =============================//

export const LoginPerson = async (userData) => {
  try {
    const response = await axios.post(`${BACKEND_URL}/`, userData);
    // send from server in res.json
    if (response.data.status === "OK") {
      toast.success("Login Successful!");
      console.log(response.data.loginDetails);

      //incorrect password
    } else if (response.data === "incorrectPassword") {
      toast.error("Incorrect Password");

      // invalid credential
    } else if (response.data === "invalidCredentials") {
      toast.error("invalid Credentials");
    }
    return response.data;
  } catch (error) {
    console.log("Error in Login verification" + error);
  }
};
