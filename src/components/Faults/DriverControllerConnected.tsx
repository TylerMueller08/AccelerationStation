import React, { useState, useEffect } from "react";
import { NetworkTablesTypeInfos } from "ntcore-ts-client";
import { ntcore } from "../../ntcoreInstance";

const DriverControllerConnectedComponent: React.FC = () => {
    const [driverControllerConnected, setDriverControllerConnected] = useState(null);

    useEffect(() => {
        const checkConnectionStatus = () => {
            if (!ntcore.isRobotConnected()) {
                setDriverControllerConnected(null);
            }
        };

        const updateConnection = () => {
            const driverControllerConnectedTopic = ntcore.createTopic<boolean>("/SmartDashboard/DriverControllerConnected", NetworkTablesTypeInfos.kBoolean);
            driverControllerConnectedTopic.subscribe((value) => {
                setDriverControllerConnected(value);
            }, true);
            
            setTimeout(() => {
                driverControllerConnectedTopic.unsubscribeAll();
            }, 500);
        };

        const interval = setInterval(() => {
            checkConnectionStatus();
            updateConnection();
        }, 1000);

        return() => {
            clearInterval(interval);
        }
    }, []);

    return (
        <div className={`fault-status ${driverControllerConnected === null ? 'unknown' : driverControllerConnected ? 'true' : 'false'}`}></div>
    );
}

export default DriverControllerConnectedComponent;