import { useMemo, useRef } from "react";
import { XIcon } from "../icons/Icons";

export function InputBox({ startIcon, state, inputProps, wrapperProps }) {
    const type = inputProps?.type ?? "text";
    const inputRef = useRef(null);

    const handleActivateInput = () => {
        inputRef.current?.focus();
    };

    const handleChange = e => {
        state?.set(e.target.value);
    };

    const showDeleteIcon = Boolean(state?.get);
    const inputBorderRadius = useMemo(() => {
        const br = wrapperProps?.style?.borderRadius || "0.35rem";
        if (startIcon && showDeleteIcon) return `0 ${br} ${br} 0`;
        else if (startIcon && !showDeleteIcon) return `0 ${br} ${br} 0`;
        else if (!startIcon && showDeleteIcon) return `${br} ${br} ${br} ${br}`;
        else return `${br} ${br} ${br} ${br}`;
    }, [startIcon, showDeleteIcon, wrapperProps?.style?.borderRadius])
    return (
        <div onClick={handleActivateInput} className="input-box-wrapper" {...wrapperProps}>
            {startIcon && (
                <div className="input-icon">{startIcon}</div>
            )}
            <input
                value={state?.get || ''}
                autoFocus
                ref={inputRef}
                className={`input-box-${type}`}
                type={type}
                name={inputProps?.name ?? "unnamed-input"}
                onChange={handleChange}
                {...inputProps}
                style={{
                    ...inputProps?.styles,
                    borderRadius: inputBorderRadius,
                    borderLeft: startIcon ? "none" : "1px solid var(--btn-fill-accent-inactive)",
                    // borderRight: showDeleteIcon ? "none" : "1px solid var(--btn-fill-accent-inactive)"
                }}
            />
            {!showDeleteIcon ? '' : <div onClick={() => state?.set("")} className="input-reset-icon">
                <XIcon />
            </div>}
        </div>
    );
}


export function TimeInput({ label }) {
    return (
        <div style={{ display: "flex", flexDirection: "column" }}>
            <span>{label}</span>
            00:00
        </div>
    )
}