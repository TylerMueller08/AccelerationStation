import React, { useState, useEffect } from "react";
import { NetworkTables } from "ntcore-ts-client";

const RobotConnectingComponent: React.FC = () => {
    const [robotConnecting, setRobotConnecting] = useState(NetworkTables.getInstanceByTeam(4593).isRobotConnecting());

    useEffect(() => {
        const ntcore = NetworkTables.getInstanceByTeam(4593);

        const interval = setInterval(() => {
            setRobotConnecting(ntcore.isRobotConnecting());
        }, 1000);

        return () => clearInterval(interval);
    }, []);

    return (
        <div className={`fault-status ${robotConnecting ? 'true' : 'false'}`}></div>
    );
};

export default RobotConnectingComponent;
