import React, { useState, useEffect } from "react";
import { NetworkTables } from "ntcore-ts-client";

const RobotConnectionComponent: React.FC = () => {
    const [robotConnected, setRobotConnected] = useState(false);

    useEffect(() => {
        const checkConnectionStatus = () => {
            setRobotConnected(NetworkTables.getInstanceByTeam(4593).isRobotConnected());
        };

        checkConnectionStatus();

        const connectionInterval = setInterval(checkConnectionStatus, 1000);

        return () => clearInterval(connectionInterval);
    }, []);

    return (
        <p id="robot-state">Connection: {robotConnected ? 'Connected' : 'Disconnected'}</p>
    );
};

export default RobotConnectionComponent;