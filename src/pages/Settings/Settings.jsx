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
            if (val === 'GoogleSansCode') varFont = "GoogleSansCode, monospace";
            else if (val === 'Inter') varFont = "Inter, system-ui";
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

    return (
        <div className="appearanceSettings">

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
                    name="sepia-val"
                    id="sepia-val"
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
                    <div onClick={() => handleFontUpdate("fontFamily", "GoogleSansCode")} className="font-block" style={{ fontFamily: "GoogleSansCode", border: user?.settings?.font?.fontFamily === 'GoogleSansCode' ? "1px solid rgb( 128 128 128 /0.25 )" : "1px solid transparent" }}>
                        Monospace
                    </div>
                    <div onClick={() => handleFontUpdate("fontFamily", "Inter")} className="font-block" style={{ fontFamily: "Inter", border: user?.settings?.font?.fontFamily === 'Inter' ? "1px solid rgb( 128 128 128 /0.25 )" : "1px solid transparent" }}>
                        Sans-Serif
                    </div>
                </div>

            </div>

            <div style={{ display: 'flex', justifyContent: 'start', alignItems: 'center', width: '100%' }}>
                <span style={{ minWidth: '78px' }}>Font Size</span>
                <div className="font-styles-wrapper" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', width: 'min(300px, 100%)', flexWrap: 'wrap' }}>
                    <div onClick={() => handleFontUpdate("fontSize", "80%")} className="font-block" style={{ fontFamily: "var(--font)", fontSize: "80%", border: user?.settings?.font?.fontSize === '80%' ? "1px solid rgb( 128 128 128 /0.25 )" : "1px solid transparent" }}>
                        Aa
                    </div>
                    <div onClick={() => handleFontUpdate("fontSize", "100%")} className="font-block" style={{ fontFamily: "var(--font)", fontSize: "100%", border: user?.settings?.font?.fontSize === '100%' ? "1px solid rgb( 128 128 128 /0.25 )" : "1px solid transparent" }}>
                        Aa
                    </div>
                    <div onClick={() => handleFontUpdate("fontSize", "120%")} className="font-block" style={{ fontFamily: "var(--font)", fontSize: "120%", border: user?.settings?.font?.fontSize === '120%' ? "1px solid rgb( 128 128 128 /0.25 )" : "1px solid transparent" }}>
                        Aa
                    </div>
                </div>

            </div>

            <div className="sample-text" >
                <span>
                    The quick brown fox jumps over the lazy dog.
                    <br />
                    0123456789
                </span>
                <img src={test} style={{ width: "min(100%,150px)", height: "min(100%,150px)", aspectRatio: 1, objectFit: "cover" }} />
            </div>

        </div>
    );
};


const StorageSettings = () => {
    const { user, setUser } = useUser();
    const resetApp = () => {
        localStorage.clear();
        setUser(defaultUser);
    }
    return (
        <div className="storageSettings">
            <button className="reset-app" onClick={resetApp}>Reset App</button>
        </div>
    )
}

