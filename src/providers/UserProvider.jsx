import { createContext, useContext, useEffect, useState } from "react";
import { filterColor } from "../utils/func/func";

export const defaultUser = {
    settings: {
        hideCompleted: true,
        filter: {
            sepia: `0%`,
            brightness: `100%`
        },
        font: {
            fontFamily: "Google Sans Code",
            fontSize: "100%"
        }
    },
    data: {
        events: []
    }
}
const UserContext = createContext({ user: defaultUser, setUser: () => { } });

export const UserProvider = ({ children }) => {
    const [user, setUser] = useState(() => {
        try {
            const stored = localStorage.getItem("app");
            return stored ? JSON.parse(stored) : defaultUser;
        } catch (err) {
            console.error("Failed to parse localStorage user data:", err);
            return {};
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

        const themeElements = document.querySelectorAll(".theme-content");
        themeElements.forEach(el => {
            const originalColor = getComputedStyle(el).color; // normally #000 or #fff
            const hex = originalColor === "rgb(255, 255, 255)" ? "#fff" : "#000";
            el.style.color = filterColor(hex, filter);
        });
    }, [user?.settings?.filter]);

    useEffect(() => {
        const font = user?.settings?.font;
        if (!font) return;
        let varFont = null;
        if (font?.fontFamily === 'Google Sans Code') varFont = "Google Sans Code, monospace";
        else if (font?.fontFamily === 'Open Sans') varFont = "Open Sans, system-ui";
        else if (font?.fontFamily === 'Google Sans Flex') varFont = "Google Sans Flex, system-ui";

        document.documentElement.style.setProperty('--font', varFont);
        document.documentElement.style.fontSize = (font?.fontSize);

    }, [user?.settings?.font]);



    const value = { user, setUser };

    return (
        <UserContext.Provider value={value}>
            {children}
        </UserContext.Provider>
    );
};

export const useUser = () => {
    const ctx = useContext(UserContext);
    if (ctx === null) {
        throw new Error("useUser must be used within a UserProvider");
    }
    return ctx;
};
