import axios from "axios";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const SignUp = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await axios
        .post("http://localhost:5000/signUp", {
          name,
          email,
          password,
        })
        .then((res) => {
          // send from server in res.json
          if (res.data === "exist") {
            alert("User Already exists");
          } else if (res.data === "not exists") {
            navigate("/home", { state: { id: email } });
          }
        })
        .catch((error) => {
          alert("Wrong Details");
          console.log("wrong Details : " + error);
        });
    } catch (error) {
      console.log("Error in Sign Up verification" + error);
    }
  };
  return (
    <div>
      <h1>Sign Up</h1>

      <form action="POST">
        <input
          type="name"
          name="name"
          id="name"
          onChange={(e) => setName(e.target.value)}
          placeholder="Enter your name"
          value={name}
        />
        <input
          type="email"
          name="email"
          id="email"
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Enter your email"
          value={email}
        />
        <input
          type="password"
          name="password"
          id="password"
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Enter password"
          value={password}
        />
        <input type="submit" onClick={handleSubmit} />
      </form>

      <br />
      <p>OR</p>
      <br />

      <Link to="/signUp">Click here to Register</Link>
    </div>
  );
};
export default SignUp;
