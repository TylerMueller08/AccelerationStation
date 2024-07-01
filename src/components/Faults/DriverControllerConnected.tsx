import React, { useState, useEffect } from "react";
import { NetworkTablesTypeInfos } from "ntcore-ts-client";
import { ntcore } from "../../ntcoreInstance";

const DriverControllerConnectedComponent: React.FC = () => {
    const [driverControllerConnected, setDriverControllerConnected] = useState(null);

    useEffect(() => {
        const driverControllerConnectedTopic = ntcore.createTopic<boolean>("/SmartDashboard/DriverControllerConnected", NetworkTablesTypeInfos.kBoolean);
        
        driverControllerConnectedTopic.subscribe((value) => {
            setDriverControllerConnected(value);
        }, true);

        const interval = setInterval(() => {
            if (!ntcore.isRobotConnected()) {
                setDriverControllerConnected(null);
            } else {
                driverControllerConnectedTopic.resubscribeAll(ntcore.client);
            }
        }, 1000);

        return() => {
            clearInterval(interval);
        }
    }, []);

    return (
        <>
            <p className="fault-name">Driver Controller: </p>
            <div className={`fault-status ${driverControllerConnected == null ? 'unknown' : driverControllerConnected ? 'true' : 'false'}`}></div>
        </>
    );
}

export default DriverControllerConnectedComponent;