import React, { useState, useEffect } from "react";
import { NetworkTablesTypeInfos } from "ntcore-ts-client";
import { ntcore } from "../../ntcoreInstance";

const CANBusUtilizationComponent: React.FC = () => {
    const [CANBusUtilization, setCANBusUtilization] = useState<string>(null);

    useEffect(() => {
        const checkConnectionStatus = () => {
            if (!ntcore.isRobotConnected()) {
                setCANBusUtilization(null);
            }
        };

        const updateConnection = () => {
            const CANBusUtilizationTopic = ntcore.createTopic<number>("/SmartDashboard/CANBusUtilization", NetworkTablesTypeInfos.kInteger);
            CANBusUtilizationTopic.subscribe((value) => {
                setCANBusUtilization(`${value}`);
            }, true);
            
            setTimeout(() => {
                CANBusUtilizationTopic.unsubscribeAll();
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
        <p id="can-utilization">CAN Utilization: {CANBusUtilization == "null" ? "N/A" : CANBusUtilization}%</p>
    )
};

export default CANBusUtilizationComponent;
