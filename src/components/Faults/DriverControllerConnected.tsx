import React, { useState, useEffect } from "react";
import { NetworkTablesTypeInfos } from "ntcore-ts-client";
import { ntcore } from "../../ntcoreInstance";

const DriverControllerConnectedComponent: React.FC = () => {
    const [driverControllerConnected, setDriverControllerConnected] = useState(null);

    useEffect(() => {
        const driverControllerConnectedTopic = ntcore.createTopic<boolean>("/SmartDashboard/DriverControllerConnected", NetworkTablesTypeInfos.kBoolean);

        const checkConnectionStatus = () => {
            if (!ntcore.isRobotConnected()) {
                setDriverControllerConnected(null);
            }
        };

        driverControllerConnectedTopic.subscribe((value) => {
            setDriverControllerConnected(value);
        }, true);

        const interval = setInterval(checkConnectionStatus, 1000);

        return() => {
            clearInterval(interval);
        }
    }, []);

    return (
        <div className={`fault-status ${driverControllerConnected === null ? 'unknown' : driverControllerConnected ? 'true' : 'false'}`}></div>
    );
}

export default DriverControllerConnectedComponent;