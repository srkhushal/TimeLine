import { useCallback, useEffect, useMemo, useState } from "react";
import { useDevice, useUser } from "../../providers";

import zs1 from "../../assets/images/zerostate1.avif";
import zs2 from "../../assets/images/zerostate2.avif";
import zs3 from "../../assets/images/zerostate3.avif";
import zs4 from "../../assets/images/zerostate4.avif";
import zs5 from "../../assets/images/zerostate5.avif";
import zs6 from "../../assets/images/zerostate6.avif";
import arrow from "../../assets/images/arrow.svg";
import Switch from "../../components/Switch.jsx";

export function Home() {
    return (
        <>
            <Greeting />
            <AddNewEvent />
            <EventList />
        </>
    )
}

const Greeting = () => {
    const [time, setTime] = useState(new Date());

    useEffect(() => {
        const interval = setInterval(() => {
            setTime(new Date());
        }, 1000);

        return () => clearInterval(interval);
    }, []);

    const hour = time.getHours();

    let greeting = "Hello";
    if (hour < 12) greeting = "Good morning";
    else if (hour < 18) greeting = "Good afternoon";
    else greeting = "Good evening";

    const pad = (num) => String(num).padStart(2, "0");

    return (
        <div style={{ display: "flex", flexWrap: 'wrap', width: '100%', justifyContent: 'space-between', alignItems: 'center' }}>
            <h1>{greeting}</h1>

            <div style={{
                display: 'flex',
                flexWrap: 'wrap',
                alignItems: "center",
                justifyContent: 'space-between',
                gap: '7px'
            }}>
                <span style={{
                    fontSize: "14px", opacity: 0.75
                }}>
                    {time.toDateString()}
                </span>
                <span>
                    {"•"}
                </span>
                <span style={{
                    fontSize: "14px", opacity: 0.75
                }}>
                    {`${pad(time.getHours())}:${pad(time.getMinutes())}`}
                </span>
            </div>
        </div>
    );
};

const AddNewEvent = () => {
    const { user, setUser } = useUser();
    const [inputs, setInputs] = useState({
        endsOn: "",
        label: "",
        note: "",
    })
    const [showAddEvent, setShowAddEvent] = useState(false);
    const [isChecked, setIsChecked] = useState(true);

    const handleLabelInput = (e) => {
        const val = e.target.value;
        setInputs((p) => ({ ...p, label: val }))
    }
    const handleNoteInput = (e) => {
        const val = e.target.value;
        setInputs((p) => ({ ...p, note: val }))
    }
    const handleDTInput = (e) => {
        const val = e.target.value;
        setInputs((p) => ({ ...p, endsOn: val }))
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        setUser((p) => {
            const oldEvents = p?.data?.events
            const currEvent = {
                label: inputs.label,
                note: inputs.note,
                id: `#${Date.now()}`,
                endsOn: inputs.endsOn,
                autoDelete: isChecked
            }
            const updatedEvents = [...oldEvents, currEvent];
            return {
                ...p,
                data: {
                    ...(p?.data || []),
                    events: updatedEvents
                }
            }
        })
        setInputs({
            endsOn: "",
            label: "",
            note: "",
        });
        setIsChecked(true);
        setShowAddEvent(false);
    }
    return (
        <div>
            <button style={{
                background: !showAddEvent ? "light-dark(black,white)" : "var(--accent)"
            }} className="cta" onClick={() => setShowAddEvent(p => !p)}>
                {
                    showAddEvent
                        ? <svg xmlns="http://www.w3.org/2000/svg" width="24px" height="24px" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-x-icon lucide-x"><path d="M18 6 6 18" /><path d="m6 6 12 12" /></svg>
                        : <svg xmlns="http://www.w3.org/2000/svg" width="24px" height="24px" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-plus-icon lucide-plus"><path d="M5 12h14" /><path d="M12 5v14" /></svg>
                }
            </button>
            {
                !showAddEvent ? '' :
                    <form onSubmit={handleSubmit} className="addNewEvent">
                        <label className="field-label-wrapper">

                            <span aria-required className="input-label">Event Name</span>

                            <div className="input-wrapper">
                                <input onBlur={handleLabelInput} required className="event-input" name="event-name" type="text" />
                            </div>
                        </label>

                        <label className="field-label-wrapper">

                            <span aria-required className="input-label">Date & Time</span>

                            <div className="input-wrapper">
                                <input onBlur={handleDTInput} required className="event-input" name="event-dnt" type="datetime-local" />
                            </div>
                        </label>

                        <label className="field-label-wrapper">

                            <span className="input-label" >Quick Note</span>

                            <div className="input-wrapper">
                                <textarea onBlur={handleNoteInput} className="event-input" name="event-note" />
                            </div>
                        </label>

                        <div style={{ display: 'flex', justifyContent: 'start', alignItems: 'center', gap: '12px', marginBlock: '0.125rem 0.5rem' }}>
                            <div style={{ transition: 'none', background: 'none' }}
                                onClick={() => {
                                    setIsChecked(p => !p)
                                }}>
                                <Switch isChecked={isChecked} />
                            </div>
                            <span style={{ fontSize: '14px', opacity: 0.75, cursor: "default", userSelect: "none" }} className="input-label">Auto Delete After Completion</span>
                        </div>



                        <div className="input-wrapper add-event-wrapper">
                            <input type="submit" className="event-input add-event" name="add-event" value="Add Event" />
                        </div>

                    </form>
            }
        </div>
    )
}







const EventList = () => {
    const { user, setUser } = useUser();
    const { device } = useDevice();
    const events = useMemo(() => user?.data?.events || [], [user?.data?.events]);

    const [sortMode, setSortMode] = useState({
        field: "endsOn",
        dir: "asc",
    });
    const [input, setInput] = useState("");
    const handleSearchInput = (e) => {
        setInput(e.target.value);
    }

    const handleDelete = (eventId) => {
        setUser((prevUser) => {
            const updatedEvents = prevUser?.data?.events.filter(event => event.id !== eventId);
            return {
                ...prevUser,
                data: {
                    ...prevUser?.data,
                    events: updatedEvents,
                },
            };
        });
    };


    const [currentTime, setCurrentTime] = useState(() => Date.now());

    useEffect(() => {
        const intervalId = setInterval(() => {
            setCurrentTime(Date.now());
        }, 60000);
        return () => clearInterval(intervalId);
    }, []);

    useEffect(() => {
        if (!user?.data?.events) return;

        const expiredAutoDeleteIds = user.data.events
            .filter(event =>
                event.autoDelete &&
                new Date(event.endsOn) < currentTime
            )
            .map(event => event.id);

        if (expiredAutoDeleteIds.length > 0) {
            setUser(prevUser => {
                const updated = prevUser.data.events.filter(
                    e => !expiredAutoDeleteIds.includes(e.id)
                );
                return {
                    ...prevUser,
                    data: {
                        ...prevUser.data,
                        events: updated
                    }
                };
            });
        }
    }, [currentTime, user?.data?.events, setUser]);


    const [viewMode, setViewMode] = useState("grid");
    const toggleViewMode = () => {
        setViewMode(viewMode === "grid" ? "list" : "grid");
    };

    const formatDate = (dateStr) => {
        const date = new Date(dateStr);
        return date.toLocaleDateString();
    };

    const humanizeRemainingTime = useCallback((endDate) => {
        const diffInMs = new Date(endDate) - currentTime;
        if (diffInMs <= 0) return null;

        const diffInSec = diffInMs / 1000;
        const days = Math.floor(diffInSec / (3600 * 24));
        const hours = Math.floor((diffInSec % (3600 * 24)) / 3600);
        const result = `${days}d ${hours}hrs`
        return result.toLowerCase().includes('nan') ? "Invalid Date" : result;
    }, [currentTime]);

    const sortedEvents = useMemo(() => {
        return [...events].sort((a, b) => {
            const { field, dir } = sortMode;

            if (field === "label") {
                const labelA = a.label.toLowerCase();
                const labelB = b.label.toLowerCase();
                if (labelA < labelB) return dir === "asc" ? -1 : 1;
                if (labelA > labelB) return dir === "asc" ? 1 : -1;
                return 0;
            }

            if (field === "endsOn") {
                const dateA = new Date(a.endsOn);
                const dateB = new Date(b.endsOn);
                return dir === "asc" ? dateA - dateB : dateB - dateA;
            }

            return 0;
        }).map(event => {
            const isCompleted = new Date(event.endsOn) < currentTime;
            const remainingTime = !isCompleted ? humanizeRemainingTime(event.endsOn) : null;
            return {
                ...event,
                tag: isCompleted ? 'completed' : 'upcoming',
                status: isCompleted ? 'completed' : 'upcoming',
                remainingTime,
            };
        });
    }, [events, sortMode, currentTime, humanizeRemainingTime]);

    const [hideCompleted, setHideCompleted] = useState(
        user?.settings?.hideCompleted
    );

    const filteredEvents = useMemo(() => {

        const searchFiltered = sortedEvents.filter(event =>
            event.label.toLowerCase().includes(input.toLowerCase())
        );


        const upcomingEvents = searchFiltered.filter(e => e.status === 'upcoming');
        const completedEvents = searchFiltered.filter(e => e.status === 'completed');

        const visibleEvents = hideCompleted
            ? searchFiltered.filter(e => e.status !== 'completed')
            : searchFiltered;

        return {
            total: visibleEvents,
            upcoming: upcomingEvents,
            completed: completedEvents,
        };
    }, [sortedEvents, input, hideCompleted]);


    const [showDelete, setShowDelete] = useState({ id: null, state: false });

    if (!events?.length && input.length) {
        return <ZeroEvents type="noresult" />
    }

    if (!events?.length) {
        return <ZeroEvents type="nodata" />
    }



    return (
        <div className="events-wrapper">
            <div className="events-options">
                <div>
                    <input
                        onChange={handleSearchInput}
                        type="text"
                        name="event-search"
                        placeholder="Search event name..."
                    />
                </div>

                <div
                    style={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "space-between",
                        gap: "0.5rem",
                        position: "relative",
                    }}
                >
                    <SortIcon
                        dir={sortMode.field === "label" ? sortMode.dir : "asc"}
                        mode="label"
                        onClick={() =>
                            setSortMode((prev) => ({
                                field: "label",
                                dir: prev.field === "label" ? (prev.dir === "asc" ? "desc" : "asc") : "asc"
                            }))
                        }
                    />

                    <SortIcon
                        dir={sortMode.field === "endsOn" ? sortMode.dir : "asc"}
                        mode="endsOn"
                        onClick={() =>
                            setSortMode((prev) => ({
                                field: "endsOn",
                                dir: prev.field === "endsOn" ? (prev.dir === "asc" ? "desc" : "asc") : "asc"
                            }))
                        }
                    />


                    {!device?.type?.isMobile && (
                        <ViewIcon onClick={toggleViewMode} mode={viewMode} />
                    )}
                </div>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap', alignItems: 'center' }}>
                <span style={{ marginTop: '16px', fontSize: '11px', opacity: 0.75, marginLeft: '6px', fontFamily: "monospace" }}>{filteredEvents.upcoming.length} Upcoming Event{filteredEvents.upcoming.length > 1 ? "s" : ""}, {filteredEvents.completed.length} Completed</span>
                {
                    <span onClick={() => {
                        setHideCompleted(p => !p);
                        setUser((p) => ({
                            ...p, settings: {
                                ...(p?.settings || {}),
                                hideCompleted: !p?.settings?.hideCompleted
                            }
                        }))
                    }} style={{ userSelect: "none", marginTop: '16px', fontSize: '11px', opacity: 1, marginLeft: '6px', fontFamily: "monospace" }}>
                        [{hideCompleted ? "Unhide" : "Hide"} Completed]
                    </span>
                }
            </div>
            <div className="events-container">
                {
                    !filteredEvents.total.length ? <ZeroEvents type="noresult" /> :
                        filteredEvents.total.map((item) => (
                            <div
                                onMouseEnter={() => {
                                    setShowDelete({
                                        id: item.id,
                                        state: true
                                    })
                                }}
                                onMouseLeave={() => {
                                    setShowDelete({
                                        id: null,
                                        state: false
                                    })
                                }}
                                key={item.id}
                                className={item?.remainingTime ? "event-card" : "event-card-coloredBorder"}
                                style={{
                                    ...(viewMode === "list" ? { minWidth: "100%" } : {}),
                                    ...(device?.type?.isMobile ? { minWidth: "100%" } : {}),
                                }}
                            >
                                <div>
                                    <div className="event-label">
                                        <h3>{item.label}</h3>
                                        <span className={item?.remainingTime ? "upcoming" : "completed"} >{item.remainingTime ?? "Completed"}</span>
                                    </div>
                                    {!item?.note ? '' : <div className="event-note">{item.note}</div>}
                                    <div className="event-date" style={{ opacity: 1 }}>{formatDate(item.endsOn)}</div>
                                </div>
                                {!item.autoDelete ? "" : <div className="event-date">#autoDelete</div>}
                                {
                                    ((showDelete.id === item.id) && showDelete.state) ? <button
                                        className={device?.type?.isMobile ? "delete-event-btn" : "delete-event-icon"}
                                        onClick={() => handleDelete(item.id)}
                                    >
                                        {
                                            device?.type?.isMobile ? "Delete" :
                                                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round"><path d="M18 6 6 18" /><path d="m6 6 12 12" /></svg>
                                        }
                                    </button> : ''
                                }
                            </div>
                        ))}
            </div>

        </div>
    );
};


// type-> nodata or noresult
const ZeroEvents = ({ type = 'nodata' }) => {
    const allImages = useMemo(() => {
        return [zs1, zs2, zs3, zs4, zs5, zs6];
    }, []);

    const randomImg = useMemo(() => {
        const rnIdx = Math.floor(allImages.length * Math.random());
        const idx = type === 'noresult' ? 3 : rnIdx;
        return allImages[idx];
    }, [allImages, type]);

    return (
        <div className="zero-events-wrapper">
            <div className="zero-events-image-container">
                <img
                    src={randomImg}
                    className="zero-state-image"
                    alt="No events illustration"
                />
            </div>
            {
                type === 'nodata' ? <div className="no-events-message" style={{ gap: '0.125rem' }}>
                    <span style={{ opacity: 0.95, fontSize: '13px', fontStyle: '' }}>Looks like you haven't added any events yet.</span>
                    <span style={{ opacity: 0.95, fontSize: '13px', fontStyle: '' }}>{""}Add your first event and stay organized.</span>
                </div>
                    : <div className="no-events-message" style={{ gap: '0.125rem' }}>

                        <span style={{ opacity: 0.95, fontSize: '13px', fontStyle: '' }}>Nothing here :( </span>
                        <span style={{ opacity: 0.95, fontSize: '13px', fontStyle: '' }}>{""}No event found with this name.</span>
                    </div>
            }

            {(type === 'nodata') ? <div className="arrowImageWrapper">
                <img src={arrow} className="arrowImage" />
            </div> : ""}
        </div>
    );
};

const commonStyle = {
    all: "unset",
    minWidth: "36px",
    minHeight: "36px",
    userSelect: "none",
    border: "1.5px solid rgb(128 128 128 /0.25)",
    background:
        "light-dark( rgba(128,128,128,0.125),rgba(128,128,128,0.25) )",
    width: "32px",
    height: "32px",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: "14px",
};

const SortIcon = ({ dir = "asc", onClick, mode = "label" }) => {
    const [clicked, setClicked] = useState(false);
    if (mode === "endsOn") {
        return (
            <span onClick={() => {
                onClick();
                setClicked(true);
            }} style={{ ...commonStyle, backgroundColor: clicked ? "var(--text)" : "var(--bg)", color: !clicked ? "var(--text)" : "var(--bg)" }}>
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="18"
                    height="18"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                >
                    {dir === "asc" ? (
                        <path d="m14 18 4 4 4-4" />
                    ) : (
                        <path d="m14 18 4-4 4 4" />
                    )}
                    <path d="M16 2v4" />
                    <path d="M18 14v8" />
                    <path d="M21 11.354V6a2 2 0 0 0-2-2H5a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h7.343" />
                    <path d="M3 10h18" />
                    <path d="M8 2v4" />
                </svg>
            </span>
        );
    }
};

const ViewIcon = ({ mode = "grid", onClick }) => {


    return mode === "grid" ? (
        <span onClick={onClick} style={{ ...commonStyle, backgroundColor: "var(--text)", color: "var(--bg)" }}>
            <svg
                xmlns="http://www.w3.org/2000/svg"
                width="18"
                height="18"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"

                strokeLinecap="round"
                strokeLinejoin="round"
            >
                <rect width="18" height="7" x="3" y="3" rx="1" />
                <rect width="7" height="7" x="3" y="14" rx="1" />
                <rect width="7" height="7" x="14" y="14" rx="1" />
            </svg>
        </span>
    ) : (
        <span onClick={onClick} style={{ ...commonStyle, backgroundColor: "var(--text)", color: "var(--bg)" }}>
            <svg
                xmlns="http://www.w3.org/2000/svg"
                width="18"
                height="18"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"

                strokeLinecap="round"
                strokeLinejoin="round"
            >
                <rect width="18" height="18" x="3" y="3" rx="2" />
                <path d="M21 9H3" />
                <path d="M21 15H3" />
            </svg>
        </span>
    );
};

