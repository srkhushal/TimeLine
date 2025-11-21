import { useState, useEffect, useRef } from "react";

export function Menu({ itemsHandlerArray = [] }) {
    const itemRefs = useRef([]);
    const [isHovered, setIsHovered] = useState(false);
    useEffect(() => {
        if (!isHovered && itemRefs.current[0]) {
            // itemRefs.current[0].focus();
        }
    }, [itemsHandlerArray, isHovered]);

    if (!itemsHandlerArray.length) return null;

    return (
        <nav
            className="profile-menu"
        >
            <ul>
                {itemsHandlerArray.map((item, i) => (
                    <li
                        key={i}
                        tabIndex={0}
                        ref={(el) => itemRefs.current[i] = el}
                        onKeyDown={(e) => {
                            if (e.key === 'Enter') item?.onClick?.()
                        }}
                        onClick={() => item?.onClick?.()}
                    >
                        <span>{item?.label}</span>
                        {item?.icon}
                    </li>
                ))}
            </ul>
        </nav>
    );
}
