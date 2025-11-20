import { createContext, useContext, useEffect, useState } from "react";
import { filterColor } from "../utils/func/func";
import { themes } from "../utils/theme/theme";

export const defaultUser = {
    settings: {
        hideCompleted: true,
        theme: {
            mode: "system",       // system | light | dark
            ui: "monochrome",     // monochrome | dynamic
            accent: "purple" // ui-dynamic ? { purple | blue | green } : ui-monochrome ? { gray }
        },
        filter: {
            sepia: `0%`,
            brightness: `100%`
        },
        font: {
            fontFamily: "Google Sans Flex",
            fontSize: "130%"
        }
    },
    data: {
        events: []
    }
};

const UserContext = createContext({ user: defaultUser, setUser: () => { } });

export const UserProvider = ({ children }) => {
    const [user, setUser] = useState(() => {
        try {
            const stored = localStorage.getItem("app");
            return stored ? JSON.parse(stored) : defaultUser;
        } catch (err) {
            console.error("Failed to parse localStorage user data:", err);
            return defaultUser;
        }
    });

    useEffect(() => {
        try {
            localStorage.setItem("app", JSON.stringify(user));
        } catch (err) {
            console.error("Failed to save user to localStorage:", err);
        }
    }, [user]);

    useEffect(() => {
        const filter = user?.settings?.filter;
        if (!filter) return;

        const filterStr = Object.entries(filter)
            .map(([key, value]) => `${key}(${value})`)
            .join(" ");
        document.documentElement.style.filter = filterStr;

        document.querySelectorAll(".theme-content").forEach(el => {
            const originalColor = getComputedStyle(el).color;
            const hex = originalColor === "rgb(255, 255, 255)" ? "#fff" : "#000";
            el.style.color = filterColor(hex, filter);
        });
    }, [user?.settings?.filter]);

    useEffect(() => {
        const font = user?.settings?.font;
        if (!font) return;

        let varFont = null;
        if (font.fontFamily === 'Google Sans Code') varFont = "Google Sans Code, monospace";
        else if (font.fontFamily === 'Open Sans') varFont = "Open Sans, system-ui";
        else if (font.fontFamily === 'Google Sans Flex') varFont = "Google Sans Flex, system-ui";

        document.documentElement.style.setProperty('--font', varFont);
        document.documentElement.style.fontSize = font.fontSize;
    }, [user?.settings?.font]);


    useEffect(() => {
        document.documentElement.setAttribute(
            "data-ui",
            user.settings.theme.ui
        );
    }, [user.settings.theme.ui]);

    useEffect(() => {
        const themeMode = user.settings.theme.mode;

        document.documentElement.setAttribute("data-theme", themeMode);

        let resolved = themeMode;

        const media = window.matchMedia("(prefers-color-scheme: dark)");

        const updateResolved = () => {
            resolved = themeMode === "system"
                ? media.matches ? "dark" : "light"
                : themeMode;

            document.documentElement.setAttribute(
                "data-resolved-theme",
                resolved
            );
        };

        updateResolved();

        if (themeMode === "system") {
            media.addEventListener("change", updateResolved);
            return () => media.removeEventListener("change", updateResolved);
        }
    }, [user.settings.theme.mode]);

    useEffect(() => {
        const palette = user.settings.theme.accent;

        const applyColors = () => {
            const resolvedTheme = document.documentElement.getAttribute("data-resolved-theme") || "light";
            const colors = themes[resolvedTheme]?.[palette];

            if (!colors) return;

            document.documentElement.setAttribute("data-accent", palette);

            Object.entries(colors).forEach(([key, value]) => {
                document.documentElement.style.setProperty(key, value);
            });
        };
        applyColors();
        if (user.settings.theme.mode === "system") {
            const media = window.matchMedia("(prefers-color-scheme: dark)");
            media.addEventListener("change", applyColors);
            return () => media.removeEventListener("change", applyColors);
        }
    }, [user.settings.theme]);



    return (
        <UserContext.Provider value={{ user, setUser }}>
            {children}
        </UserContext.Provider>
    );
};

export const useUser = () => {
    const ctx = useContext(UserContext);
    if (!ctx) throw new Error("useUser must be used within a UserProvider");
    return ctx;
};
