import { useCallback, useRef } from "react";

export function Slider({ state, onChange = () => { } }) {
    const { value, setValue, min = 0, max = 100 } = state;
    const trackRef = useRef(null);

    const clamp = useCallback((val) => {
        return Math.min(max, Math.max(min, val))
    }, [max, min]);

    const percent = ((value - min) / (max - min)) * 100;

    const updateFromEvent = useCallback((e) => {
        const track = trackRef.current;
        if (!track) return;

        const rect = track.getBoundingClientRect();
        const x = e.clientX ?? e.touches?.[0]?.clientX;

        const ratio = (x - rect.left) / rect.width;
        const nextValue = clamp(min + ratio * (max - min));

        setValue(nextValue);
        onChange?.(nextValue);
    }, [clamp, min, max, setValue, onChange]);


    const startDrag = (e) => {
        updateFromEvent(e);

        const move = (ev) => updateFromEvent(ev);
        const stop = () => {
            window.removeEventListener("mousemove", move);
            window.removeEventListener("touchmove", move);
            window.removeEventListener("mouseup", stop);
            window.removeEventListener("touchend", stop);
        };

        window.addEventListener("mousemove", move);
        window.addEventListener("touchmove", move, { passive: false });
        window.addEventListener("mouseup", stop);
        window.addEventListener("touchend", stop);
    };

    return (
        <div
            className="slider-track-path"
            ref={trackRef}
            onMouseDown={startDrag}
            onTouchStart={startDrag}
        >

            <div className="slider-track-filled" style={{ width: `${percent}%` }} />
            <button className="slider-thumb" style={{ left: `${percent}%` }} />
        </div>
    );
}
