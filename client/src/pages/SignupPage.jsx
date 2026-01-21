import axios from "axios";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const SignupPage = () => {
  //three states that are connected to the three inputs to make 'controlled' components
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const nav = useNavigate();
  const handleSignup = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.post("http://localhost:5005/auth/signup", {
        username,
        password,
        email,
      });
      console.log(data);
      nav("/login");
    } catch (err) {
      console.log(err);
      setError(err.response.data.errorMessage);
    }
  };
  return (
    <div>
      <h3>Sign up with us!</h3>
      <form onSubmit={handleSignup}>
        <label>
          Username:
          <input
            type="text"
            value={username}
            onChange={(e) => {
              setUsername(e.target.value);
            }}
          />
        </label>
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
        <label>
          Age:
          <input type="date" />
        </label>
        {/* show the error if there is one  */}
        {error && <p className="error">{error}</p>}
        <button>Signup</button>
        <p>Already a member? </p>
        <Link to="/login">Login</Link>
      </form>
    </div>
  );
};
export default SignupPage;
