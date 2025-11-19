export function Switch({ isChecked }) {
    return (
        <div
            className="checkbox-container"
            style={{
                background: isChecked ? "var(--text)" : "var(--bg)",
                color: isChecked ? "var(--bg)" : "var(--text)",
                border: isChecked ? "1px solid var(--text)" : "1px solid rgb(128 128 128 /0.5)"
            }}>
            {
                !isChecked ? '' :
                    <svg xmlns="http://www.w3.org/2000/svg" style={{ marginTop: '1px' }} width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-check-icon lucide-check"><path d="M20 6 9 17l-5-5" /></svg>
            }

        </div>
    )
};

