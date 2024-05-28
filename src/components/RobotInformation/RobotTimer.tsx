import React, { useState, useEffect } from "react";
import { NetworkTablesTypeInfos } from "ntcore-ts-client";
import { ntcore } from "../../ntcoreInstance";

const RobotTimerComponent: React.FC = () => {
    const [remainingTime, setRemainingTime] = useState<string>("N/A");

    useEffect(() => {
        const matchTimeRemainingTopic = ntcore.createTopic<number>("/SmartDashboard/MatchTimeRemaining", NetworkTablesTypeInfos.kInteger);
    
        matchTimeRemainingTopic.subscribe((value) => {
            if (value === -1 || value === null) {
                setRemainingTime("N/A");
            } else {
                const minutes = Math.floor(value / 60);
                const seconds = value % 60;
                setRemainingTime(`${minutes}:${seconds.toString().padStart(2, '0')}`);
            }
        }, true);
    }, []);

    return (
        <p id="timer">Time Remaining: {remainingTime}</p>
    )
};

export default RobotTimerComponent;
