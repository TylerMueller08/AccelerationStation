import React, { useState, useEffect } from "react";
import { NetworkTables } from "ntcore-ts-client";

const RobotConnectionComponent: React.FC = () => {
    const [robotConnected, setRobotConnected] = useState(NetworkTables.getInstanceByTeam(4593).isRobotConnected());

    useEffect(() => {
        const ntcore = NetworkTables.getInstanceByTeam(4593);

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