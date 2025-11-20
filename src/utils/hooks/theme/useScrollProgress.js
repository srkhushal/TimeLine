import { useState, useEffect, useRef } from 'react';

function throttle(fn, wait) {
    let lastTime = 0;
    return function (...args) {
        const now = Date.now();
        if (now - lastTime >= wait) {
            lastTime = now;
            fn(...args);
        }
    };
}

export function useScrollProgress(selector, throttleMs = 50) {
    const [progress, setProgress] = useState(0);
    const throttledRef = useRef(null);

    useEffect(() => {
        const container = document.querySelector(selector);
        if (!container) return;

        const calculateProgress = () => {
            const { scrollTop, scrollHeight, clientHeight } = container;
            const value = scrollHeight > clientHeight ? scrollTop / (scrollHeight - clientHeight) : 0;
            setProgress(value);
        };

        throttledRef.current = throttle(calculateProgress, throttleMs);

        container.addEventListener('scroll', throttledRef.current, { passive: true });
        calculateProgress();

        return () => container.removeEventListener('scroll', throttledRef.current);
    }, [selector, throttleMs]);

    return progress;
}
