import { createContext, useContext, useEffect, useState } from "react";

const UserContext = createContext(null);
export const defaultUser = {
    settings: {
        hideCompleted: true
    },
    data: {
        events: []
    }
}

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
