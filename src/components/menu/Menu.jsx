export function Menu({ itemsHandlerArray = [] }) {
    if (!itemsHandlerArray.length) return;
    return (
        <nav className="profile-menu">
            <ul>
                {
                    itemsHandlerArray.map((item, i) => {
                        return (
                            <li key={i} onClick={() => item?.onClick?.()}>
                                {item?.label}
                            </li>
                        )
                    })
                }
            </ul>
        </nav>
    )
}
