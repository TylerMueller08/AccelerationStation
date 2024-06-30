import React, { useState, useEffect } from "react";
import { NetworkTablesTypeInfos } from "ntcore-ts-client";
import { ntcore } from "../../ntcoreInstance";

const RobotTimerComponent: React.FC = () => {
    const [remainingTime, setRemainingTime] = useState<string>(null);

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

        const interval = setInterval(() => {
            if (!ntcore.isRobotConnected()) {
                setRemainingTime(null);
            }
        }, 1000);

        return() => {
            clearInterval(interval);
        }
    }, []);

    return (
        <p id="timer">Time Remaining: {remainingTime == null || remainingTime == "-1" ? "N/A" : remainingTime}</p>
    )
};

export default RobotTimerComponent;
