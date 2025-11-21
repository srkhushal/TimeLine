export function Fab({ state, label, onlyIcon = false, icon }) {
    if (onlyIcon) {
        return (
            <button onClick={() => {
                state?.set(p => !p);
            }} className={`fab${state?.get ? " active" : ""}`}>
                {icon}
            </button>
        )
    }
    return (
        <button onClick={() => {
            state?.set(p => !p);
        }} className={`fab${state?.get ? "active" : ""}`}>
            {label}
        </button>
    )
}