import { useEffect, useState, useCallback } from "react";

export function useLocalStorageUsage(pollInterval = 500) {
    const calculate = useCallback(() => {
        const json = JSON.stringify(localStorage);
        const bytes = new Blob([json]).size;
        const b = bytes;
        const kb = Number(Number(b / 1000).toPrecision(5)).toFixed(4);
        const mb = Number(Number((b / (1000 * 1000))).toPrecision(5)).toFixed(4);
        const percentageUsageInMb = (mb / 5);
        return {
            bUsed: b || 0,
            kbUsed: kb || 0,
            mbUsed: mb || 0,
            percentageUsageInMb: Number(percentageUsageInMb).toFixed(2)
        };
    }, []);

    const [stats, setStats] = useState(calculate);

    useEffect(() => {
        const updateStats = () => setStats(calculate());
        window.addEventListener("storage", updateStats);
        const interval = setInterval(updateStats, pollInterval);

        return () => {
            window.removeEventListener("storage", updateStats);
            clearInterval(interval);
        };
    }, [calculate, pollInterval]);

    return stats;
}
