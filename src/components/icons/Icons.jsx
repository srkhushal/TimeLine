import { useState } from "react";

const commonStyle = {
    all: "unset",
    minWidth: "41px",
    minHeight: "41px",
    userSelect: "none",
    border: "1.5px solid rgb(128 128 128 /0.25)",
    background:
        "light-dark( rgba(128,128,128,0.125),rgba(128,128,128,0.25) )",
    width: "32px",
    height: "32px",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: "14px",
    cursor: "pointer",
    boxShadow: "box-shadow: 1px 1px 5px rgb(128 128 128 /0.125)"
};

export function SortIcon({ dir = "asc", onClick, mode = "label" }) {
    const [clicked, setClicked] = useState(false);
    if (mode === "endsOn") {
        return (
            <span onClick={() => {
                onClick();
                setClicked(true);
            }} style={{ ...commonStyle, backgroundColor: clicked ? "var(--text)" : "var(--bg)", color: !clicked ? "var(--text)" : "var(--bg)" }}>
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="18"
                    height="18"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                >
                    {dir === "asc" ? (
                        <path d="m14 18 4 4 4-4" />
                    ) : (
                        <path d="m14 18 4-4 4 4" />
                    )}
                    <path d="M16 2v4" />
                    <path d="M18 14v8" />
                    <path d="M21 11.354V6a2 2 0 0 0-2-2H5a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h7.343" />
                    <path d="M3 10h18" />
                    <path d="M8 2v4" />
                </svg>
            </span>
        );
    }
};

export function ViewIcon({ mode = "grid", onClick }) {
    return mode === "grid" ? (
        <span onClick={onClick} style={{ ...commonStyle, backgroundColor: "var(--text)", color: "var(--bg)" }}>
            <svg
                xmlns="http://www.w3.org/2000/svg"
                width="18"
                height="18"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"

                strokeLinecap="round"
                strokeLinejoin="round"
            >
                <rect width="18" height="7" x="3" y="3" rx="1" />
                <rect width="7" height="7" x="3" y="14" rx="1" />
                <rect width="7" height="7" x="14" y="14" rx="1" />
            </svg>
        </span>
    ) : (
        <span onClick={onClick} style={{ ...commonStyle, backgroundColor: "var(--text)", color: "var(--bg)" }}>
            <svg
                xmlns="http://www.w3.org/2000/svg"
                width="18"
                height="18"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"

                strokeLinecap="round"
                strokeLinejoin="round"
            >
                <rect width="18" height="18" x="3" y="3" rx="2" />
                <path d="M21 9H3" />
                <path d="M21 15H3" />
            </svg>
        </span>
    );
};


const svgStyles = {
    width: "20",
    height: "20",
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: "2",
    strokeLinecap: "round",
    strokeLinejoin: "round"
}

const circleIconWrapper = {
    all: "unset",
    minWidth: "36px",
    minHeight: "36px",
    userSelect: "none",
    border: "1.5px solid rgb(128 128 128 /0)",
    background:
        "light-dark( rgba(128,128,128,0.125),rgba(128,128,128,0.25) )",
    width: "36px",
    height: "36px",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: "50%",
    cursor: "pointer",
    boxShadow: "box-shadow: 1px 1px 5px rgb(128 128 128 /0.125)"
};

export function BackIcon() {
    return (
        <div style={{ ...circleIconWrapper }}>
            <svg xmlns="http://www.w3.org/2000/svg"
                {...svgStyles}
            >
                <path d="m12 19-7-7 7-7" />
                <path d="M19 12H5" />
            </svg>
        </div>
    )
}
export function LightMode() {
    return (
        <svg xmlns="http://www.w3.org/2000/svg"
            {...svgStyles}
        >
            <circle cx="12" cy="12" r="4" />
            <path d="M12 2v2" />
            <path d="M12 20v2" />
            <path d="m4.93 4.93 1.41 1.41" />
            <path d="m17.66 17.66 1.41 1.41" />
            <path d="M2 12h2" />
            <path d="M20 12h2" />
            <path d="m6.34 17.66-1.41 1.41" />
            <path d="m19.07 4.93-1.41 1.41" />
        </svg>
    )
}
export function DarkMode() {
    return (
        <svg xmlns="http://www.w3.org/2000/svg"
            {...svgStyles}
        >
            <path d="M20.985 12.486a9 9 0 1 1-9.473-9.472c.405-.022.617.46.402.803a6 6 0 0 0 8.268 8.268c.344-.215.825-.004.803.401" />
        </svg>
    )
}

export function SystemTheme() {
    return (
        <svg xmlns="http://www.w3.org/2000/svg"
            {...svgStyles}
        >
            <rect width="20" height="14" x="2" y="3" rx="2" />
            <line x1="8" x2="16" y1="21" y2="21" />
            <line x1="12" x2="12" y1="17" y2="21" />
        </svg>
    )
}