import React, {useState, useEffect} from "react";

function DigitalClock() {

    const [currentTime, setCurrentTime] = useState(new Date()); //initial value is the current date and time

    useEffect(() => {
        const timerId = setInterval(() => {
            setCurrentTime(new Date()); //update the current time every second
        }, []);
    }, []);
    return (
        <div className="digital-clock">
            <div className = "Clock">
                <span>{currentTime.toLocaleTimeString()}</span>

            </div>

        </div>
    );


}

export default DigitalClock;