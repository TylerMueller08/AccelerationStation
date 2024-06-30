import React, { useState, useEffect } from "react";
import { ntcore } from "../../ntcoreInstance";

const RobotConnectionComponent: React.FC = () => {

    const [robotConnected, setRobotConnected] = useState(ntcore.isRobotConnected());

    useEffect(() => {
        const interval = setInterval(() => {
            setRobotConnected(ntcore.isRobotConnected());
        }, 1000);

        return () => clearInterval(interval);
    }, []);

    return (
        <p id="robot-state">Connection: {robotConnected ? 'Connected' : 'Disconnected'}</p>
    );
};

export default RobotConnectionComponent;