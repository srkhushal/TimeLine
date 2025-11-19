import { useEffect, useState } from "react";

export const useSystemDark = () => {
    const [isSystemDark, setIsSystemDark] = useState(
        window.matchMedia("(prefers-color-scheme: dark)").matches
    );

    useEffect(() => {
        const mql = window.matchMedia("(prefers-color-scheme: dark)");
        const handler = (e) => setIsSystemDark(e.matches);

        mql.addEventListener("change", handler);
        return () => mql.removeEventListener("change", handler);
    }, []);

    return isSystemDark;
};
