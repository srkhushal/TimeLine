import { useCallback, useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { InputBox, Slider, SplitButton } from "../../components";
import ButtonGroup from "../../components/button/ButtonGroup";
import { AccentIcon, AlertIcon, BackIcon, BrightnessIcon, DarkIcon, FontIcon, FontSizeIcon, HistoryIcon, LightIcon, SepiaIcon, SystemThemeIcon, ThemeIcon } from "../../components/icons/Icons";
import { defaultUser, useUser } from "../../providers/UserProvider";
import { exportData, importData, useScrollProgress } from "../../utils";
import { capitalizeWord } from "../../utils/strings/strings";

export function Settings() {
    const [showAddEvent, setShowAddEvent] = useState(false);
    const nav = useNavigate();
    const [stickyHeader, setStickyHeader] = useState(false);
    useEffect(() => {
        const handleScroll = (e) => {
            setStickyHeader(Boolean(window.scrollY))
        };

        window.addEventListener('scroll', handleScroll, { passive: true });

        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    return (
        <div className="settingsPage">
            <div
                className={`page-header${stickyHeader ? " sticky" : ""}`}
                style={{
                    ...(stickyHeader ? {
                        background: `linear-gradient(to bottom, var(--bg) 37%, var(--bg-for-blur))`
                    } : {
                        background: `linear-gradient(to bottom, var(--bg) 37%, var(--bg))`
                    })
                }}
            >
                <div onClick={() => {
                    nav("/")
                }}>
                    <BackIcon />
                </div>
                <h1 onClick={() => window.location.reload()}>Settings</h1>
            </div>
            <AppearanceSettings />
            <ShareSettings />
            <StorageSettings />
        </div>
    )
}

const availableColors = [
    { label: "Purple" },
    { label: "Green" },
    { label: "Blue" },
]

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

    const handleFontUpdate = useCallback((key, val) => {
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
    }, [setUser])

    const handleThemeUpdate = useCallback((key, val) => {
        setUser((p) => ({
            ...p,
            settings: {
                ...(p?.settings || {}),
                theme: {
                    ...(p?.settings?.theme || {}),
                    [key]: val,
                    ...(key === 'ui' ? { accent: '' } : {})
                }
            }
        }));
    }, [setUser]);

    const [brightnessRange, setBrightnessRange] = useState(100);

    const themeItems = useMemo(() => {
        return ([
            {
                children: <LightIcon />,
                isActive: user?.settings?.theme?.mode === "light",
                props: {
                    onClick: () => {
                        handleThemeUpdate("mode", "light");
                    }
                }
            }, {
                children: <DarkIcon />,
                isActive: user?.settings?.theme?.mode === "dark",
                props: {
                    onClick: () => {
                        handleThemeUpdate("mode", "dark");
                    }
                }
            }, {
                children: <SystemThemeIcon />,
                isActive: user?.settings?.theme?.mode === "system",
                props: {
                    onClick: () => {
                        handleThemeUpdate("mode", "system");
                    }
                }
            }
        ])
    }, [handleThemeUpdate, user?.settings?.theme?.mode])



    const fontStyleItems = useMemo(() => {
        return ([
            {
                children: 'Aa',
                isActive: user?.settings?.font?.fontFamily === 'Google Sans Code',
                props: {
                    onClick: () => {
                        handleFontUpdate("fontFamily", 'Google Sans Code');
                    }
                },
                style: { fontFamily: "Google Sans Code" }
            }, {
                children: 'Aa',
                isActive: user?.settings?.font?.fontFamily === 'Google Sans Flex',
                props: {
                    onClick: () => {
                        handleFontUpdate("fontFamily", 'Google Sans Flex');
                    }
                },
                style: { fontFamily: "Google Sans Flex" }
            }, {
                children: 'Aa',
                isActive: user?.settings?.font?.fontFamily === 'Open Sans',
                props: {
                    onClick: () => {
                        handleFontUpdate("fontFamily", 'Open Sans');
                    }
                },
                style: { fontFamily: "Open Sans" }
            }
        ])
    }, [handleFontUpdate, user?.settings?.font?.fontFamily])

    const fontSizeItems = useMemo(() => {
        return ([
            {
                children: '12px',
                isActive: user?.settings?.font?.fontSize === '80%',
                props: {
                    onClick: () => {
                        handleFontUpdate("fontSize", '80%');
                    }
                }
            }, {
                children: '16px',
                isActive: user?.settings?.font?.fontSize === '100%',
                props: {
                    onClick: () => {
                        handleFontUpdate("fontSize", '100%');
                    }
                }
            }, {
                children: '20px',
                isActive: user?.settings?.font?.fontSize === '130%',
                props: {
                    onClick: () => {
                        handleFontUpdate("fontSize", '130%');
                    }
                }
            }
        ])
    }, [handleFontUpdate, user?.settings?.font?.fontSize])

    const [sepiaValue, setSepiaValue] = useState(() => {
        return parseInt(user?.settings?.filter?.sepia);
    });
    const [brightnessValue, setBrightnessValue] = useState(() => {
        return parseInt(user?.settings?.filter?.brightness);
    });

    const handleThemeUiUpdate = (val) => {
        setUser((p) => ({
            ...p,
            settings: {
                ...(p?.settings || {}),
                theme: {
                    ...(p?.settings?.theme || {}),
                    ui: "dynamic",
                    accent: val?.toLowerCase()
                }
            }
        }))
    }

    const [accentClicked, setAccentClicked] = useState(false);
    return (
        <div className="appearanceSettings">

            <div className="settingsItem">
                <span>
                    <ThemeIcon />
                    Theme
                </span>
                <ButtonGroup items={themeItems} />
            </div>


            <div className="settingsItem">
                <span>
                    <AccentIcon />
                    Accent
                </span>
                <div style={{ display: 'flex', alignItems: 'center', width: 'min( 400px, 100% )', gap: '0.125rem' }}>
                    <button
                        style={{
                            ...((user?.settings?.theme?.accent === 'gray') ? {
                                background: "var(--btn-fill-accent-active)",
                                color: "var(--bg)"
                            } : { background: "var(--btn-fill-accent-inactive)" })
                        }}
                        onClick={() => {
                            handleThemeUiUpdate("gray")
                        }}
                        className={`split-btn-item single-btn ${user?.settings?.theme?.accent === 'gray' ? "active" : ""}`}>
                        {"Mono"}
                    </button>

                    <SplitButton
                        isActive={(user?.settings?.theme?.ui === 'dynamic') && (user?.settings?.theme?.accent !== 'gray')}
                        label={
                            ((user?.settings?.theme?.ui === 'dynamic') && (user?.settings?.theme?.accent !== 'gray'))
                                ? `Dynamic ${capitalizeWord(user?.settings?.theme?.accent)}`
                                : `Dynamic`
                        }
                        state={{ set: setAccentClicked, get: accentClicked }} />

                </div>
                {
                    !accentClicked ? '' :
                        <div className="horizontalList">
                            {
                                availableColors.map((item, i) => (
                                    <button onClick={() => {
                                        handleThemeUiUpdate(item.label)
                                    }} key={i}
                                        className={`split-btn-item single-btn ${user?.settings?.theme?.accent === item?.label?.toLowerCase() ? "active" : ""}`}
                                        style={{
                                            ...((user?.settings?.theme?.accent === item?.label?.toLowerCase()) ? {
                                                background: "var(--btn-fill-accent-active)",
                                                color: "var(--bg)"
                                            } : { background: "var(--btn-fill-accent-inactive)" })
                                        }}
                                    >
                                        {item.label}
                                    </button>
                                ))
                            }
                        </div>
                }
            </div>

            <div className="settingsItem">
                <span>
                    <SepiaIcon />
                    Sepia
                </span>
                <Slider
                    onChange={(val) => {
                        handleFilterUpdate("sepia", val + "%");
                    }}
                    state={{
                        value: sepiaValue, setValue: setSepiaValue
                    }}
                />
            </div>

            <div className="settingsItem">
                <span>
                    <BrightnessIcon level={`${brightnessValue >= 80 ? "high" : brightnessValue >= 40 ? "mid" : "low"}`} />
                    Brightness
                </span>
                <Slider
                    onChange={(val) => {
                        handleFilterUpdate("brightness", val + "%");
                    }}
                    state={{
                        value: brightnessValue, setValue: setBrightnessValue
                    }}
                />
            </div>

            <div className="settingsItem">
                <span>
                    <FontIcon />
                    Font
                </span>
                <ButtonGroup items={fontStyleItems} />
            </div>

            <div className="settingsItem">
                <span>
                    <FontSizeIcon />
                    Font Size
                </span>
                <ButtonGroup items={fontSizeItems} />
            </div>
        </div>
    );
};



const ShareSettings = () => {
    const { user, setUser } = useUser();
    const shareItems = useMemo(() => {
        return ([
            {
                children: "Import Data",
                type: "uncolored",
                props: {
                    onClick: () => {
                        importData(setUser);
                    }
                }
            }, {
                children: "Export Data",
                type: "uncolored",
                props: {
                    onClick: () => {
                        exportData(user)
                    }
                }
            }
        ])
    }, [setUser, user])
    return (
        <div className="shareSettings">
            <div className="settingsItem">
                <span>
                    <HistoryIcon />
                    Backup & Restore
                </span>
                <ButtonGroup items={shareItems} />
            </div>
        </div>
    );
};



const StorageSettings = () => {
    const { user, setUser } = useUser();
    const [showInput, setShowInput] = useState(false);
    const [inputText, setInputText] = useState("");

    const resetApp = () => {
        setShowInput(false);
        localStorage.clear();
        setUser(defaultUser);
        setInputText("");
    }
    const resetSettings = () => {
        setShowInput(false);
        setUser({
            data: user?.data,
            settings: defaultUser?.settings
        });
        setInputText("");
    }
    const resetData = () => {
        setShowInput(false);
        setUser({
            data: defaultUser?.data,
            settings: user?.settings
        });
        setInputText("");
    }


    useEffect(() => {
        console.log({ inputText })
    }, [inputText])
    return (
        <div className="storageSettings">
            <div className="settingsItem">
                <span>
                    <AlertIcon />
                    Reset
                </span>
                <button
                    style={{ background: showInput ? "var(--btn-fill-accent-active)" : "var(--btn-fill-accent-inactive)", color: showInput ? "var(--bg)" : "var(--text)", width: "min(400px,100%)" }}
                    className="single-btn"
                    onClick={() => {
                        setShowInput(p => !p);
                    }}>
                    {showInput ? "Cancel" : "Reset App"}
                </button>
                {
                    !showInput ? <div style={{ marginTop: '0.25rem' }}>
                        <span className="tip">Deletes all events and settings data after confirmation.</span>
                    </div> :
                        <>
                            <InputBox
                                wrapperProps={{
                                    style: { marginTop: '0.5rem' }
                                }}
                                inputProps={{
                                    placeholder: "Confirmation",
                                    onKeyDown: (e) => {
                                        if (e.code === 'Enter') {
                                            if (inputText.toLowerCase() === 'delete all') {
                                                resetApp();
                                            } else if (inputText.toLowerCase() === 'delete settings') {
                                                resetSettings();
                                            } else if (inputText.toLowerCase() === 'delete events') {
                                                resetData();
                                            }
                                            return;
                                        } return;
                                    },
                                    type: "text",
                                    name: "confirm-deletion",
                                    id: "confirm-deletion"
                                }}
                                state={{ set: setInputText, get: inputText }}
                            />


                            <div style={{ marginTop: '0.5rem', opacity: 0.75, display: "flex", flexDirection: "column", gap: "4px" }}>
                                <span style={{ fontSize: "0.75rem" }}>• Type `delete all` to reset the entire app.</span>
                                <span style={{ fontSize: "0.75rem" }}>• Type `delete settings` to reset your preferences.</span>
                                <span style={{ fontSize: "0.75rem" }}>• Type `delete events` to clear all events.</span>
                                <span style={{ fontSize: "0.75rem" }}>Press Enter to confirm.</span>
                            </div>


                        </>
                }

            </div>
        </div>
    )
}

