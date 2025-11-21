import { UserIcon } from "../icons/Icons"

export function Avatar({ imgUrl = null, initials = "", ...props }) {
    if (imgUrl) {
        return (
            <div className="user-avatar-wrapper" {...props}>
                <img className="user-avatar-image" src={imgUrl} />
            </div>
        )
    }
    else if (initials) {
        return (
            <div className="user-avatar-wrapper" {...props}>
                <span className="user-avatar-initials">{initials}</span>
            </div>
        )
    }
    return (
        <div className="user-avatar-wrapper" {...props}>
            <UserIcon />
        </div>
    )
}