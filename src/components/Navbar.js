// Navigation Bar
import { House, BookBookmark, ShoppingCart } from "phosphor-react";
import { Link } from "react-router-dom";
import styles from "../css/Navbar.modules.css";

function Navbar() {
  return (
    <div className="navbar">
      <div className="links">
        <House size={32} />
      </div>

      <div className="links">
        <BookBookmark size={32} />
      </div>
      
      <div className="links">
        <ShoppingCart size={32} />
      </div>
    </div>
  );
}

export default Navbar;
