// Button.js

import "../css/Button.modules.css"; // Import styles

/**
 * Reusable button component.
 * onClick - Function to execute on button click.
 * label - Text to display inside the button.
 */
function Button({ onClick, label }) {
  return (
    <div>
      <button className="itemButton" onClick={onClick}>
        {label}
      </button>
    </div>
  );
}

export default Button;
