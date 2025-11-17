import { createContext, useContext, useEffect, useMemo, useState } from "react";

const DeviceContext = createContext(null);

export const DeviceProvider = ({ children }) => {
    const [screen, setScreen] = useState({
        w: window.innerWidth || 0,
        h: window.innerHeight || 0,
    });

    useEffect(() => {
        const updateDimensions = () => {
            setScreen({
                w: window.innerWidth,
                h: window.innerHeight,
            });
        };

        window.addEventListener("resize", updateDimensions);
        return () => window.removeEventListener("resize", updateDimensions);
    }, []);

    const device = useMemo(() => ({
        size: screen,
        orientation: screen.w > screen.h ? 'landscape' : 'portrait',
        type: {
            isMobile: screen.w <= 425,
            isTablet: screen.w > 425 && screen.w <= 768,
            isDesktop: screen.w > 768,
        }
    }), [screen]);

    return (
        <DeviceContext.Provider value={{
            device,
        }}>
            {children}
        </DeviceContext.Provider>
    );
};

// eslint-disable-next-line react-refresh/only-export-components
export const useDevice = () => {
    const context = useContext(DeviceContext);
    if (!context) throw new Error("useDevice cant be used outside UserProvider");
    return context;
};
