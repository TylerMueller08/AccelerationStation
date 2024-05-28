import React, { useState, useEffect } from "react";
import { NetworkTablesTypeInfos } from "ntcore-ts-client";
import { ntcore } from "../../ntcoreInstance";

const CANBusUtilizationComponent: React.FC = () => {
    const [CANBusUtilization, setCANBusUtilization] = useState<string>(null);

    useEffect(() => {
        const CANBusUtilizationTopic = ntcore.createTopic<number>("/SmartDashboard/CANBusUtilization", NetworkTablesTypeInfos.kInteger);
    
        CANBusUtilizationTopic.subscribe((value) => {
            if (value === null) {
                setCANBusUtilization("N/A");
            } else {
                setCANBusUtilization(`${value}`);
            }
        }, true);
    }, []);

    return (
        <p id="can-utilization">CAN Utilization: {CANBusUtilization}%</p>
    )
};

export default CANBusUtilizationComponent;
