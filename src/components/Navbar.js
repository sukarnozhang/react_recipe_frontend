// Navbar.js

// Icons from Phosphor React
import { House, BookBookmark, ShoppingCart } from "phosphor-react";

// CSS module for styling (though it's not being used as a module yet)
import "../css/Navbar.modules.css";

/**
 * Navigation Bar Component
 * Displays three icons: Home, Bookmarks, and Cart
 */
function Navbar() {
  return (
    <div className="navbar">
      {/* Home Icon */}
      <div className="links">
        <House size={32} />
      </div>

      {/* Bookmarks Icon */}
      <div className="links">
        <BookBookmark size={32} />
      </div>

      {/* Cart Icon */}
      <div className="links">
        <ShoppingCart size={32} />
      </div>
    </div>
  );
}

export default Navbar;
