import { useMemo, useState } from "react";

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
    width: "1rem",
    height: "1rem",
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: "2",
    strokeLinecap: "round",
    strokeLinejoin: "round"
}

const circleIconWrapper = {
    all: "unset",
    minWidth: "28px",
    minHeight: "36px",
    userSelect: "none",
    border: "1.5px solid rgb(128 128 128 /0)",
    background:
        "light-dark( rgba(128,128,128,0.125),rgba(128,128,128,0.25) )",
    width: "28px",
    height: "36px",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: "10dvw",
    cursor: "pointer",
    boxShadow: "box-shadow: 1px 1px 5px rgb(128 128 128 /0.125)"
};

export function BackIcon({ ...props }) {
    return (
        <div style={{ ...circleIconWrapper }} >
            <svg xmlns="http://www.w3.org/2000/svg"
                {...svgStyles}{...props} style={{
                    width: '0.9rem',
                    height: '0.9rem',
                    opacity: 0.75,
                }}
            >
                <path d="m12 19-7-7 7-7" />
                <path d="M19 12H5" />
            </svg>
        </div>
    )
}
export function LightIcon({ ...props }) {
    return (
        <svg xmlns="http://www.w3.org/2000/svg"
            {...svgStyles}{...props}
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
export function DarkIcon({ ...props }) {
    return (
        <svg xmlns="http://www.w3.org/2000/svg"
            {...svgStyles}{...props}
        >
            <path d="M20.985 12.486a9 9 0 1 1-9.473-9.472c.405-.022.617.46.402.803a6 6 0 0 0 8.268 8.268c.344-.215.825-.004.803.401" />
        </svg>
    )
}

export function SystemThemeIcon({ ...props }) {
    return (
        <svg xmlns="http://www.w3.org/2000/svg"
            {...svgStyles}{...props}
        >
            <rect width="20" height="14" x="2" y="3" rx="2" />
            <line x1="8" x2="16" y1="21" y2="21" />
            <line x1="12" x2="12" y1="17" y2="21" />
        </svg>
    )
}
export function ThemeIcon({ ...props }) {
    return (
        <svg xmlns="http://www.w3.org/2000/svg"
            {...svgStyles}{...props}
        >
            <path d="M12 22a1 1 0 0 1 0-20 10 9 0 0 1 10 9 5 5 0 0 1-5 5h-2.25a1.75 1.75 0 0 0-1.4 2.8l.3.4a1.75 1.75 0 0 1-1.4 2.8z" />
            <circle cx="13.5" cy="6.5" r=".5" fill="currentColor" />
            <circle cx="17.5" cy="10.5" r=".5" fill="currentColor" />
            <circle cx="6.5" cy="12.5" r=".5" fill="currentColor" />
            <circle cx="8.5" cy="7.5" r=".5" fill="currentColor" />
        </svg>
    )
}

export function SepiaIcon({ ...props }) {
    return (
        <svg xmlns="http://www.w3.org/2000/svg"
            {...svgStyles}{...props}
        >
            <rect width="16" height="6" x="2" y="2" rx="2" />
            <path d="M10 16v-2a2 2 0 0 1 2-2h8a2 2 0 0 0 2-2V7a2 2 0 0 0-2-2h-2" />
            <rect width="4" height="6" x="8" y="16" rx="1" />
        </svg>
    )
}
export function BrightnessIcon({ level = 'mid' }) {
    if (level === 'mid') {
        return (
            <svg xmlns="http://www.w3.org/2000/svg"
                {...svgStyles}
            >
                <circle cx="12" cy="12" r="4" />
                <path d="M12 3v1" />
                <path d="M12 20v1" />
                <path d="M3 12h1" />
                <path d="M20 12h1" />
                <path d="m18.364 5.636-.707.707" />
                <path d="m6.343 17.657-.707.707" />
                <path d="m5.636 5.636.707.707" />
                <path d="m17.657 17.657.707.707" />
            </svg>
        )
    } else if (level === 'high') {
        return <LightIcon />
    } else if (level === 'low')
        return (
            <svg xmlns="http://www.w3.org/2000/svg"
                {...svgStyles}
            >
                <circle cx="12" cy="12" r="4" />
                <path d="M12 4h.01" />
                <path d="M20 12h.01" />
                <path d="M12 20h.01" />
                <path d="M4 12h.01" />
                <path d="M17.657 6.343h.01" />
                <path d="M17.657 17.657h.01" />
                <path d="M6.343 17.657h.01" />
                <path d="M6.343 6.343h.01" />
            </svg>
        )
}
export function FontIcon({ ...props }) {
    return (
        <svg xmlns="http://www.w3.org/2000/svg"
            {...svgStyles}{...props}>
            <path d="m2 16 4.039-9.69a.5.5 0 0 1 .923 0L11 16" />
            <path d="M22 9v7" />
            <path d="M3.304 13h6.392" />
            <circle cx="18.5" cy="12.5" r="3.5" />
        </svg>
    )
}
export function FontSizeIcon({ ...props }) {
    return (
        <svg xmlns="http://www.w3.org/2000/svg" {...svgStyles}{...props}>
            <path d="M15 5h6" />
            <path d="M15 12h6" />
            <path d="M3 19h18" />
            <path d="m3 12 3.553-7.724a.5.5 0 0 1 .894 0L11 12" />
            <path d="M3.92 10h6.16" />
        </svg>
    )
}
export function HistoryIcon({ ...props }) {
    return (
        <svg xmlns="http://www.w3.org/2000/svg" {...svgStyles}{...props}>
            <path d="M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8" />
            <path d="M3 3v5h5" />
            <path d="M12 7v5l4 2" />
        </svg>
    )
}
export function ResetIcon({ ...props }) {
    return (
        <svg xmlns="http://www.w3.org/2000/svg"{...svgStyles}{...props}>
            <path d="M21 21H8a2 2 0 0 1-1.42-.587l-3.994-3.999a2 2 0 0 1 0-2.828l10-10a2 2 0 0 1 2.829 0l5.999 6a2 2 0 0 1 0 2.828L12.834 21" />
            <path d="m5.082 11.09 8.828 8.828" />
        </svg>
    )
}
export function AlertIcon({ ...props }) {
    return (
        <svg xmlns="http://www.w3.org/2000/svg" {...svgStyles}{...props}>
            <path d="M12 16h.01" />
            <path d="M12 8v4" />
            <path d="M15.312 2a2 2 0 0 1 1.414.586l4.688 4.688A2 2 0 0 1 22 8.688v6.624a2 2 0 0 1-.586 1.414l-4.688 4.688a2 2 0 0 1-1.414.586H8.688a2 2 0 0 1-1.414-.586l-4.688-4.688A2 2 0 0 1 2 15.312V8.688a2 2 0 0 1 .586-1.414l4.688-4.688A2 2 0 0 1 8.688 2z" />
        </svg>
    )
}
export function InfoIcon({ ...props }) {
    return (
        <svg xmlns="http://www.w3.org/2000/svg" {...svgStyles} {...props}>
            <circle cx="12" cy="12" r="10" />
            <path d="M12 16v-4" />
            <path d="M12 8h.01" />
        </svg>
    )
}
export function AccentIcon({ ...props }) {
    return (
        <svg xmlns="http://www.w3.org/2000/svg" {...svgStyles}{...props}>
            <circle cx="9" cy="9" r="7" />
            <circle cx="15" cy="15" r="7" />
        </svg>
    )
}
export function ChevronIcon({ direction, ...props }) {
    const path = useMemo(() => {
        if (direction === 'down') {
            return <path d="m6 9 6 6 6-6" />
        }
        if (direction === 'left') {
            return <path d="m15 18-6-6 6-6" />
        }
        if (direction === 'right') {
            return <path d="m9 18 6-6-6-6" />

        }
        if (direction === 'up') {
            return <path d="m18 15-6-6-6 6" />

        }
    }, [direction])
    return (
        <svg xmlns="http://www.w3.org/2000/svg" {...svgStyles} {...props}>
            {path}
        </svg>
    )
}
export function XIcon() {
    return (
        <svg xmlns="http://www.w3.org/2000/svg" {...svgStyles}>
            <path d="M18 6 6 18" />
            <path d="m6 6 12 12" />
        </svg>
    )
}