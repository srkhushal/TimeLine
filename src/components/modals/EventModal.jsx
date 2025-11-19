import { useRef } from "react";

export function EventModal({ item, setItem, handleDelete }) {
    const emRef = useRef(null);


    const id = item?.id;
    const label = item?.label || '';
    const note = item?.note || '';
    const endsOn = item?.endsOn || 'Invalid Date';
    const autoDelete = item?.autoDelete;
    const tag = item?.tag || '';
    const status = item?.status || '';
    const remainingTime = item?.remainingTime;


    const formattedDate = new Date(endsOn).toLocaleString([], {
        dateStyle: "medium",
        timeStyle: "short"
    });

    if (!item) return null;

    return (
        <div onClick={() => setItem(null)}
            className="event-modal-backdrop">
            <div ref={emRef} onClick={(e) => e.stopPropagation()} className="event-modal">
                <div className="modal-header">
                    <h3>{label}</h3>
                </div>

                <div className="modal-meta">
                    <span className={status === "completed" ? "completed" : "upcoming"}>
                        {status === "completed" ? "Completed" : "Upcoming"}
                    </span>

                    {autoDelete && (
                        <span className="auto-delete-badge">
                            <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" ><path d="M12 2a10 10 0 0 1 7.38 16.75" /><path d="M12 6v6l4 2" /><path d="M2.5 8.875a10 10 0 0 0-.5 3" /><path d="M2.83 16a10 10 0 0 0 2.43 3.4" /><path d="M4.636 5.235a10 10 0 0 1 .891-.857" /><path d="M8.644 21.42a10 10 0 0 0 7.631-.38" /></svg>
                            Auto Delete
                        </span>
                    )}
                </div>

                <div className="modal-body">

                    <div className="modal-section">
                        <h4>Ends On</h4>
                        <p>{formattedDate}</p>
                    </div>

                    <div className="modal-section">
                        <h4>Remaining</h4>
                        <p>{remainingTime || "Expired"}</p>
                    </div>

                    {note && (
                        <div className="modal-section">
                            <h4>Note</h4>
                            <p style={{ whiteSpace: "pre-wrap" }}>{note}</p>
                        </div>
                    )}
                    <div className="modal-footer">
                        <button onClick={() => {
                            handleDelete(id);
                            setItem(null);
                        }} className="modal-delete">Delete</button>
                        <button onClick={() => setItem(null)} className="modal-close">Close</button>
                    </div>
                </div>
            </div>
        </div>
    );
};