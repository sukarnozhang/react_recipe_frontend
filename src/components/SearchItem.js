// SearchItem.js
// Search input component with a magnifying glass icon

import "../css/SearchItem.modules.css";  
import { MagnifyingGlass } from "phosphor-react";  

function SearchItem({ value, onChange }) {
  return (
    <div>
      {/* Search icon */}
      <MagnifyingGlass className="responsiveIcon" />

      {/* Input field controlled by parent component via props */}
      <input
        value={value}
        onChange={(e) => onChange(e.target.value)}  // Pass updated input value to parent
        placeholder="search items ..."
        className="searchItem"
      />
    </div>
  );
}

export default SearchItem;
