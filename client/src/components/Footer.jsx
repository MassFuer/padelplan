import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer>
      <p>© {new Date().getFullYear()} PadelPlan. All rights reserved.</p>
      <p>
        PadelPlan is a platform for finding and booking padel courts around the
        world.
      </p>
      <p>Our address: 123 Padel Street, Padel City, PC 12345</p>
      <Link to="/privacy">Privacy Policy</Link>
      <Link to="/terms">Terms of Service</Link>
      <Link to="/contact">Contact Us</Link>
    </footer>
  );
};
export default Footer;
