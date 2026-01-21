import "./Footer.css";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer>
      <div className="desc">
        <p>© {new Date().getFullYear()} PadelPlan. All rights reserved.</p>
        <p>
          PadelPlan is a platform for finding and booking padel courts around
          the world.
        </p>
        <p>Our address: 123 Padel Street, Padel City, PC 12345</p>
      </div>

      <div className="links">
        <Link to="/privacy">Privacy Policy</Link>
        <Link to="/terms">Terms of Service</Link>
        <Link to="/contact">Contact Us</Link>
      </div>
      <div className="map">
        <h3>Visit our HeadQuarters</h3>
        <iframe
          title="Padel Court Location"
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3153.019456789123!2d-122.41941548468167!3d37.77492977975971!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x8085809c5b6c8e7b%3A0x4a4b4b4b4b4b4b4b!2sPadel%20Court!5e0!3m2!1sen!2sus!4v1616161616161!5m2!1sen!2sus"
          width="300"
          height="200"
          style={{ border: 0 }}
          allowFullScreen=""
          loading="lazy"
        ></iframe>
      </div>
    </footer>
  );
};
export default Footer;
