import { useEffect, useRef } from "react";

export function Menu({ itemsHandlerArray = [] }) {
    const itemRefs = useRef([]);

    useEffect(() => {
        if (itemRefs.current[0]) {
            itemRefs.current[0].focus();
        }
    }, [itemsHandlerArray]);

    if (!itemsHandlerArray.length) return null;

    return (
        <nav className="profile-menu">
            <ul>
                {itemsHandlerArray.map((item, i) => (
                    <li
                        key={i}
                        tabIndex={0}
                        ref={(el) => itemRefs.current[i] = el}
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
