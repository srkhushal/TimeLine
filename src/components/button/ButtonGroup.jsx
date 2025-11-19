import { useState } from "react";

export default function ButtonGroup({ items = [] }) {

    const [activeIndex, setActiveIndex] = useState(() => {
        return items.findIndex(i => i?.isActive);
    });

    return (
        <div className="btn-grp">
            {items.map((item, index) => (
                <button
                    {...item.props}
                    key={index}
                    className={`btn-grp-item ${activeIndex === index ? "active" : ""}`}
                    onClick={() => {
                        setActiveIndex(index);
                        item?.props?.onClick?.();
                    }}
                >
                    {item.children}
                </button>
            ))}
        </div>
    );
}
