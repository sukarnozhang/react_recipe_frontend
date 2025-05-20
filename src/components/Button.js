import styles from "../css/Button.modules.css"

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