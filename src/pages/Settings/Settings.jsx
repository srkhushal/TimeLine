import { useEffect, useState } from "react";
import { defaultUser, useUser } from "../../providers/UserProvider";
import test from "../../assets/images/test.avif";

export function Settings() {
    const [showAddEvent, setShowAddEvent] = useState(false);
    return (
        <div className="settingsPage">
            <h1 onClick={() => window.location.reload()}>Settings</h1>
            <AppearanceSettings />
            <StorageSettings />
        </div>
    )
}

const AppearanceSettings = () => {
    const { user, setUser } = useUser();

    const handleFilterUpdate = (key, val) => {
        setUser((p) => ({
            ...p,
            settings: {
                ...(p?.settings || {}),
                filter: {
                    ...(p?.settings?.filter || {}),
                    [key]: val
                }
            }
        }));
    };
    const handleFontUpdate = (key, val) => {
        if (key === 'fontFamily') {
            let varFont = null;
            if (val === 'Google Sans Code') varFont = "Google Sans Code, monospace";
            if (val === 'Google Sans Flex') varFont = "Google Sans Flex, system-ui";
            else if (val === 'Open Sans') varFont = "Open Sans, system-ui";
            document.documentElement.style.setProperty('--font', varFont);
        }
        else if (key === 'fontSize') {
            document.documentElement.style.fontSize = (val);
        }

        setUser((p) => ({
            ...p,
            settings: {
                ...(p?.settings || {}),
                font: {
                    ...(p?.settings?.font || {}),
                    [key]: val
                }
            }
        }));
    }
    const handleThemeUpdate = (key, val) => {
        setUser((p) => ({
            ...p,
            settings: {
                ...(p?.settings || {}),
                theme: {
                    ...(p?.settings?.theme || {}),
                    [key]: val
                }
            }
        }));
    }

    return (
        <div className="appearanceSettings">


            <div style={{ display: 'flex', justifyContent: 'start', alignItems: 'center', width: '100%' }}>
                <span style={{ minWidth: '78px' }}>Theme</span>
                <div className="font-styles-wrapper" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', width: 'min(300px, 100%)', flexWrap: 'wrap' }}>
                    <div onClick={() => handleThemeUpdate("mode", "light")} className="font-block" style={{ fontFamily: "var(--font)", border: user?.settings?.theme?.mode === 'light' ? "1px solid rgb( 128 128 128 /0.25 )" : "1px solid transparent" }}>
                        Light
                    </div>
                    <div onClick={() => handleThemeUpdate("mode", "dark")} className="font-block" style={{ fontFamily: "var(--font)", border: user?.settings?.theme?.mode === 'dark' ? "1px solid rgb( 128 128 128 /0.25 )" : "1px solid transparent" }}>
                        Dark
                    </div>
                    <div onClick={() => handleThemeUpdate("mode", "system")} className="font-block" style={{ fontFamily: "var(--font)", border: user?.settings?.theme?.mode === 'system' ? "1px solid rgb( 128 128 128 /0.25 )" : "1px solid transparent" }}>
                        System
                    </div>
                </div>

            </div>


            <label>
                <span>Sepia</span>
                <input
                    style={{ width: 'min(300px, 100%)' }}
                    type="range"
                    name="sepia-val"
                    id="sepia-val"
                    min={0}
                    max={100}
                    value={parseInt(user?.settings?.filter?.sepia ?? 0)}
                    onChange={(e) => {
                        handleFilterUpdate("sepia", Number(e.target.value) + "%");
                    }}
                />
            </label>
            <label>
                <span>Brightness</span>
                <input
                    style={{ width: 'min(300px, 100%)' }}
                    type="range"
                    name="brightness-val"
                    id="brightness-val"
                    min={25}
                    max={100}
                    value={parseInt(user?.settings?.filter?.brightness ?? 0)}
                    onChange={(e) => {
                        handleFilterUpdate("brightness", Number(e.target.value) + "%");
                    }}
                />
            </label>

            <div style={{ display: 'flex', justifyContent: 'start', alignItems: 'center', width: '100%' }}>
                <span style={{ minWidth: '78px' }}>Font</span>
                <div className="font-styles-wrapper" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', width: 'min(300px, 100%)', flexWrap: 'wrap' }}>
                    <div onClick={() => handleFontUpdate("fontFamily", "Google Sans Code")} className="font-block" style={{ fontFamily: "Google Sans Code", border: user?.settings?.font?.fontFamily === 'Google Sans Code' ? "1px solid rgb( 128 128 128 /0.25 )" : "1px solid transparent" }}>
                        Monospace
                    </div>
                    <div onClick={() => handleFontUpdate("fontFamily", "Google Sans Flex")} className="font-block" style={{ fontFamily: "Google Sans Flex", border: user?.settings?.font?.fontFamily === "Google Sans Flex" ? "1px solid rgb( 128 128 128 /0.25 )" : "1px solid transparent" }}>
                        Sans-Serif
                    </div>
                    <div onClick={() => handleFontUpdate("fontFamily", "Open Sans")} className="font-block" style={{ fontFamily: "Open Sans", border: user?.settings?.font?.fontFamily === 'Open Sans' ? "1px solid rgb( 128 128 128 /0.25 )" : "1px solid transparent" }}>
                        Open Sans
                    </div>
                </div>

            </div>

            <div style={{ display: 'flex', justifyContent: 'start', alignItems: 'center', width: '100%' }}>
                <span style={{ minWidth: '78px' }}>Font Size</span>
                <div className="font-styles-wrapper" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', width: 'min(300px, 100%)', flexWrap: 'wrap' }}>
                    <div onClick={() => handleFontUpdate("fontSize", "80%")} className="font-block" style={{ fontFamily: "var(--font)", fontSize: "60%", border: user?.settings?.font?.fontSize === '80%' ? "1px solid rgb( 128 128 128 /0.25 )" : "1px solid transparent" }}>
                        Aa
                    </div>
                    <div onClick={() => handleFontUpdate("fontSize", "100%")} className="font-block" style={{ fontFamily: "var(--font)", fontSize: "90%", border: user?.settings?.font?.fontSize === '100%' ? "1px solid rgb( 128 128 128 /0.25 )" : "1px solid transparent" }}>
                        Aa
                    </div>
                    <div onClick={() => handleFontUpdate("fontSize", "130%")} className="font-block" style={{ fontFamily: "var(--font)", fontSize: "120%", border: user?.settings?.font?.fontSize === '130%' ? "1px solid rgb( 128 128 128 /0.25 )" : "1px solid transparent" }}>
                        Aa
                    </div>
                </div>

            </div>


        </div>
    );
};


const StorageSettings = () => {
    const { user, setUser } = useUser();
    const [showInput, setShowInput] = useState(false);
    const [confirmInput, setConfirmInput] = useState("");

    const resetApp = () => {
        setShowInput(false);
        localStorage.clear();
        setUser(defaultUser);
    }
    const showDeleteInput = () => {
        setShowInput(p => !p);
    }
    return (
        <div className="storageSettings">
            <button className="reset-app"
                onClick={showDeleteInput}
                style={{
                    background: showInput ? "var(--text)" : "light-dark(red, rgb(255, 82, 82))",
                }}
            >
                {showInput ? "Cancel" : "Reset App"}
            </button>
            <div style={{ marginTop: '0.5rem', fontSize: "0.78rem", opacity: 0.75, display: "flex", justifyContent: "start", alignItems: 'start', gap: "8px" }}>
                <svg style={{ marginTop: '4px' }} xmlns="http://www.w3.org/2000/svg" width="calc(0.78rem)" height="calc(0.78rem)" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-info-icon lucide-info"><circle cx="12" cy="12" r="10" /><path d="M12 16v-4" /><path d="M12 8h.01" /></svg>
                <span>Deletes all events and settings data.</span>
            </div>

            {
                !showInput ? "" :
                    <>
                        <div style={{ marginTop: '1rem', fontSize: "0.78rem", opacity: 0.75, display: "flex", justifyContent: "start", alignItems: 'center', gap: "4px" }}>
                            <span>type <strong>delete</strong> and hit enter/return to confirm</span>
                        </div>
                        <input onChange={(e) => {
                            setConfirmInput(e.target.value)
                        }}
                            onKeyDown={(e) => {
                                if (e.code === 'Enter') {
                                    resetApp();
                                    return;
                                } return;
                            }}
                            type="text" name="confirm-deletion" id="confirm-deletion" />
                    </>
            }
        </div>
    )
}

