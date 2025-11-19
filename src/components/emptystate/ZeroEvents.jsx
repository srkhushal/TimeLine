import { useMemo, useState } from "react";
import { useUser } from "../../providers";
import { useSystemDark } from "../../utils/hooks/theme/useSystemDark";

import zs1 from "../../assets/images/zerostate1.avif";
import zs2 from "../../assets/images/zerostate2.avif";
import zs3 from "../../assets/images/zerostate3.avif";
import zs4 from "../../assets/images/zerostate4.avif";
import zs5 from "../../assets/images/zerostate5.avif";
import zs6 from "../../assets/images/zerostate6.avif";
import arrow from "../../assets/images/arrow.svg";




// type-> nodata or noresult
export function ZeroEvents({ type = 'nodata', showAddEvent, setShowAddEvent }) {
    const allImages = useMemo(() => {
        return [zs1, zs2, zs3, zs4, zs5, zs6];
    }, []);

    const [randomImg, setRandomImg] = useState(() => {
        const rnIdx = Math.floor(allImages.length * Math.random());
        return type === 'noresult' ? allImages[3] : allImages[rnIdx];
    });
    const { user } = useUser();

    const systemDark = useSystemDark();

    const isDark =
        user?.settings?.theme?.mode === "dark" ||
        (user?.settings?.theme?.mode === "system" && systemDark);

    return (
        <div className="zero-events-wrapper" >
            <div className="zero-events-image-container">
                <img
                    style={{
                        filter: isDark ? "invert(1)" : "unset",
                    }}
                    src={randomImg}
                    className="zero-state-image"
                    alt="No events illustration"
                />
            </div>
            {
                type === 'nodata' ? <div className="no-events-message" style={{ gap: '0.125rem', marginTop: '1.5rem' }}>
                    <span style={{ opacity: 0.95, fontSize: '0.72rem', fontStyle: '' }}>Looks like you haven't added any events yet.</span>
                    <span style={{ opacity: 0.95, fontSize: '0.72rem', fontStyle: '' }}>{""}Add your first event and stay organized.</span>
                </div>
                    : <div className="no-events-message" style={{ gap: '0.125rem', marginTop: '1.5rem' }}>

                        <span style={{ opacity: 0.95, fontSize: '0.72rem', fontStyle: '' }}>Nothing here :( </span>
                        <span style={{ opacity: 0.95, fontSize: '0.72rem', fontStyle: '' }}>{""}No event found with this name.</span>
                    </div>
            }

            {((type === 'nodata') && !showAddEvent) ? <div className="arrowImageWrapper">
                <img style={{
                    filter: isDark ? "invert(1)" : "unset",
                }} src={arrow} className="arrowImage" />
            </div> : ""}
        </div>
    );
};