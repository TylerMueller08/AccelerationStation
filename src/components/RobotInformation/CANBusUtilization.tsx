import React, { useState, useEffect } from "react";
import { NetworkTablesTypeInfos } from "ntcore-ts-client";
import { ntcore } from "../../ntcoreInstance";

const CANBusUtilizationComponent: React.FC = () => {
    const [CANBusUtilization, setCANBusUtilization] = useState<string>(null);

    useEffect(() => {
        const CANBusUtilizationTopic = ntcore.createTopic<number>("/SmartDashboard/CANBusUtilization", NetworkTablesTypeInfos.kInteger);
    
        const checkConnectionStatus = () => {
            if (!ntcore.isRobotConnected()) {
                setCANBusUtilization(null);
            }
        }

        CANBusUtilizationTopic.subscribe((value) => {
            setCANBusUtilization(`${value}`);
        }, true);

        const interval = setInterval(checkConnectionStatus, 1000);

        return() => {
            clearInterval(interval);
        }
    }, []);

    return (
        <p id="can-utilization">CAN Utilization: {CANBusUtilization === null ? "N/A" : CANBusUtilization}%</p>
    )
};

export default CANBusUtilizationComponent;
