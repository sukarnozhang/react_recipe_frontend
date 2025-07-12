// Navigation Bar in general
import { House, BookBookmark, ShoppingCart } from "phosphor-react";
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
