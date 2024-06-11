import React, { useState, useEffect } from "react";
import { ntcore } from "../../ntcoreInstance";

const RobotConnectingComponent: React.FC = () => {

    const [robotStatus, setRobotStatus] = useState({
        isConnecting: ntcore.isRobotConnecting(),
        isConnected: ntcore.isRobotConnected(),
    });

    useEffect(() => {
        const interval = setInterval(() => {
            setRobotStatus({
                isConnecting: ntcore.isRobotConnecting(),
                isConnected: ntcore.isRobotConnected(),
            });
        }, 100);

        return () => clearInterval(interval);
    }, []);

    const getClassName = () => {
        const { isConnecting, isConnected } = robotStatus;
        return (isConnecting && !isConnected) || (!isConnecting && isConnected) ? 'true' : 'false';
    }

    return (
        <div className={`fault-status ${getClassName()}`}></div>
    );
};

export default RobotConnectingComponent;