import "../css/Button.modules.css"

// get the label and function
function Button({ onClick, label }) {
    return (
        <div>
            <button className="itemButton" onClick={onClick}>
                {label}
            </button>
        </div>
    )
}

export default Button;