
const Switch = ({ isChecked, setIsChecked }) => {

    return (
        <div className="switch-container">
            <div className={`switch ${isChecked ? 'checked' : ''}`}>
                <div className="switch-handle"></div>
            </div>
        </div>
    );
};

export default Switch;
