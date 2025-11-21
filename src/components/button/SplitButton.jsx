import { useEffect } from "react";
import { ChevronIcon } from "../icons/Icons";

export function SplitButton({ label, state, isActive = false }) {

    useEffect(() => {
        const handleClick = (e) => {
            if (!e.target.closest('[class*="split-btn"]')) {
                state?.set(false);
            }
        };

        document.addEventListener("click", handleClick);

        return () => {
            document.removeEventListener("click", handleClick);
        };
    }, [state]);

    return (
        <div
            className="split-btn-wrapper"
            onClick={(e) => {
                state?.set(p => !p);
            }}
        >
            <button className="split-btn-text" style={{
                ...((isActive) ? {
                    background: "var(--btn-fill-accent-active)",
                    color: "var(--bg)"
                } : { background: "var(--btn-fill-accent-inactive)" })
            }}>
                {label}
            </button>

            <button
                className={`split-btn-icon ${state?.get ? "active-split" : ""}`}
            >
                <ChevronIcon direction={state?.get ? "up" : "down"} />
            </button>
        </div>
    );
}


// items : [ { children, isActive, props, styles } ]
const OptionsMenu = ({ items }) => {
    return (
        <ul>
            <li>Yellow</li>
            <li>Blue</li>
            <li>Purple</li>
            <li>Green</li>
        </ul>
    )
}