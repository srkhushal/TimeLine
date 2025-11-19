import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { defaultUser, useUser } from "../../providers/UserProvider";

export function Settings() {
    const [showAddEvent, setShowAddEvent] = useState(false);
    const nav = useNavigate();
    return (
        <div className="settingsPage">
            <div style={{ display: "flex", justifyContent: 'space-between', alignItems: 'baseline' }}>
                <h1 onClick={() => window.location.reload()}>Settings</h1>
                <span style={{ fontSize: '1rem', display: "flex", cursor: "pointer", alignItems: "center", gap: '4px' }}>
                    <span onClick={() => {
                        nav("/")
                    }} style={{ opacity: 0.75, textDecoration: 'underline' }}>
                        Home
                    </span>

                </span>
            </div>
            <AppearanceSettings />
            <ShareSettings />
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
    const [brightnessRange, setBrightnessRange] = useState(100);

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
                        const val = Number(e.target.value);
                        handleFilterUpdate("sepia", val + "%");
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
                    min={0.25 * brightnessRange}
                    max={brightnessRange}
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



function exportData() {
    try {
        const appRaw = localStorage.getItem("app") || "{}";
        const app = JSON.parse(appRaw);

        const jsonString = JSON.stringify(app, null, 2);
        const file = new Blob([jsonString], { type: "application/json" });
        const url = URL.createObjectURL(file);
        const a = document.createElement("a");
        a.href = url;
        a.download = "app-data.json";
        document.body.appendChild(a);
        a.click();

        // Cleanup
        document.body.removeChild(a);
        URL.revokeObjectURL(url);

    } catch (e) {
        console.error("Error exporting data:", e);
    }
}

function importData(setUser) {
    const input = document.createElement("input");
    input.type = "file";
    input.accept = "application/json";

    input.onchange = () => {
        const file = input.files?.[0];
        if (!file) return;

        const reader = new FileReader();

        reader.onload = (e) => {
            try {
                const json = e.target?.result;
                const APP = JSON.parse(json);
                setUser(APP);

            } catch (err) {
                console.error("Invalid JSON file:", err);
            }
        };

        reader.readAsText(file);
    };

    input.click();
}

const ShareSettings = () => {
    const { user, setUser } = useUser();

    return (
        <div className="shareSettings">
            <div style={{ display: 'flex', justifyContent: 'start', alignItems: 'center', width: '100%' }}>
                <span style={{ minWidth: '78px' }}>Share</span>

                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', width: 'min(300px, 100%)', flexWrap: 'wrap', gap: 0 }}>

                    {/* pass setUser into importData */}
                    <button onClick={() => importData(setUser)} className="importSettings">
                        <svg xmlns="http://www.w3.org/2000/svg" width="calc(0.75rem)" height="calc(0.75rem)" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-file-up-icon lucide-file-up"><path d="M6 22a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h8a2.4 2.4 0 0 1 1.704.706l3.588 3.588A2.4 2.4 0 0 1 20 8v12a2 2 0 0 1-2 2z" /><path d="M14 2v5a1 1 0 0 0 1 1h5" /><path d="M12 12v6" /><path d="m15 15-3-3-3 3" /></svg>
                        Import Data
                    </button>

                    <button onClick={exportData} className="exportSettings">
                        <svg xmlns="http://www.w3.org/2000/svg" width="calc(0.75rem)" height="calc(0.75rem)" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-file-down-icon lucide-file-down"><path d="M6 22a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h8a2.4 2.4 0 0 1 1.704.706l3.588 3.588A2.4 2.4 0 0 1 20 8v12a2 2 0 0 1-2 2z" /><path d="M14 2v5a1 1 0 0 0 1 1h5" /><path d="M12 18v-6" /><path d="m9 15 3 3 3-3" /></svg>
                        Export Data
                    </button>
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
    const resetSettings = () => {
        setShowInput(false);
        setUser({
            data: user?.data,
            settings: defaultUser?.settings
        });
    }
    const resetData = () => {
        setShowInput(false);
        setUser({
            data: defaultUser?.data,
            settings: user?.settings
        });
    }
    const showDeleteInput = () => {
        setShowInput(p => !p);
    }
    useEffect(() => {
        resetSettings();
    }, [])
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
            <div style={{ marginTop: '0.5rem', fontSize: "0.72rem", opacity: 0.75, display: "flex", justifyContent: "start", alignItems: 'start', gap: "8px" }}>
                <svg style={{ marginTop: '4px' }} xmlns="http://www.w3.org/2000/svg" width="calc(0.72rem)" height="calc(0.72rem)" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-info-icon lucide-info"><circle cx="12" cy="12" r="10" /><path d="M12 16v-4" /><path d="M12 8h.01" /></svg>
                <span>Deletes all events and settings data after confirmation.</span>
            </div>

            {
                !showInput ? "" :
                    <>
                        <div style={{ marginTop: '1rem', fontSize: "0.78rem", opacity: 0.75, display: "flex", flexDirection: "column", gap: "4px" }}>
                            <span>• Type <strong>delete all</strong> to reset the entire app.</span>
                            <span>• Type <strong>delete settings</strong> to reset your preferences.</span>
                            <span>• Type <strong>delete events</strong> to clear all events.</span>
                            <span>Press Enter to confirm.</span>
                        </div>


                        <input onChange={(e) => {
                            setConfirmInput(e.target.value)
                        }}
                            onKeyDown={(e) => {
                                if (e.code === 'Enter') {
                                    if (confirmInput.toLowerCase() === 'delete all') {
                                        resetApp();
                                    } else if (confirmInput.toLowerCase() === 'delete settings') {
                                        resetSettings();
                                    } else if (confirmInput.toLowerCase() === 'delete events') {
                                        resetData();
                                    }
                                    return;
                                } return;
                            }}
                            type="text" name="confirm-deletion" id="confirm-deletion" />
                    </>
            }
        </div>
    )
}

