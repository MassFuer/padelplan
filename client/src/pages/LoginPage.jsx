import axios from "axios";
import { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../contexts/AuthContext";

const Login = () => {
  //three states that are connected to the three inputs to make 'controlled' components
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const nav = useNavigate();
  const { authenticateUser } = useContext(AuthContext);
  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");
    try {
      const { data } = await axios.post("http://localhost:5005/auth/login", {
        password,
        email,
      });
      console.log(data);
      //store the authToken in local storage
      localStorage.setItem("authToken", data.authToken);
      await authenticateUser();
      nav("/profile");
    } catch (err) {
      console.log(err);
      setError(err.response.data.errorMessage);
    }
  };
  return (
    <div>
      <h3>Login!</h3>
      <form onSubmit={handleLogin}>
        <label>
          Email:
          <input
            type="email"
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
            }}
          />
        </label>
        <label>
          Password:
          <input
            type="password"
            value={password}
            onChange={(e) => {
              setPassword(e.target.value);
            }}
          />
        </label>
        {/* show the error if there is one  */}
        {error && <p className="error">{error}</p>}
        <button>Login</button>
        <p>New Here? </p>
        <Link to="/">Sign Up</Link>
      </form>
    </div>
  );
};
export default Login;
