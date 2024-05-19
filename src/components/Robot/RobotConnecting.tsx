import React, { useState, useEffect } from "react";
import { NetworkTables } from "ntcore-ts-client";

const RobotConnectingComponent: React.FC = () => {
    const [robotConnecting, setRobotConnecting] = useState(false);

    useEffect(() => {
        const checkConnectingStatus = () => {
            setRobotConnecting(NetworkTables.getInstanceByTeam(4593).isRobotConnecting());
        };

        // Set up interval to toggle every second
        const connectingInterval = setInterval(checkConnectingStatus, 1000);

        // Clear the interval when component unmounts
        return () => clearInterval(connectingInterval);
    }, []);

    return (
        <div className={`fault-status ${robotConnecting ? 'true' : 'false'}`}></div>
    );
};

export default RobotConnectingComponent;
