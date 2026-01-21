import "./Navbar.css";
import { useContext } from "react";
import { NavLink } from "react-router-dom";
import { AuthContext } from "../contexts/AuthContext.jsx";

const Navbar = () => {
  const { handleLogout, isLoggedIn } = useContext(AuthContext);

  return (
    <nav>
      {/* <img src="/src/assets/logo.png" alt="PadelPlan Logo" /> */}
      <NavLink to="/" className="company">
        <span className="logo">🎯</span>
        <h2>PadelPlan</h2>
      </NavLink>
      <NavLink to="/clubs">Clubs around the world</NavLink>
      {isLoggedIn ? (
        <button onClick={handleLogout}>Logout</button>
      ) : (
        <section>
          <NavLink to="/login">Login</NavLink>
          <NavLink to="/signup">Signup</NavLink>
        </section>
      )}
    </nav>
  );
};
export default Navbar;
