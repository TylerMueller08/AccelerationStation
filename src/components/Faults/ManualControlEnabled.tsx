import React, { useState, useEffect } from "react";
import { NetworkTablesTypeInfos } from "ntcore-ts-client";
import { ntcore } from "../../ntcoreInstance";

const ManualControlEnabledComponent: React.FC = () => {
    const [manualControlEnabled, setManualControlEnabled] = useState(null);

    useEffect(() => {
        const manualControlEnabledTopic = ntcore.createTopic<boolean>("/SmartDashboard/ManualControlEnabled", NetworkTablesTypeInfos.kBoolean);
        
        manualControlEnabledTopic.subscribe((value) => {
            setManualControlEnabled(value);
        }, true);

        const interval = setInterval(() => {
            if (!ntcore.isRobotConnected()) {
                setManualControlEnabled(null);
            } else {
                manualControlEnabledTopic.resubscribeAll(ntcore.client);
            }
        }, 1000);

        return() => {
            clearInterval(interval);
        }
    }, []);

    return (
        <>
            <p className="fault-name">Manual Control: </p>
            <div className={`fault-status ${manualControlEnabled == null ? 'unknown' : manualControlEnabled ? 'true' : 'false'}`}></div>
        </>
    );
}

export default ManualControlEnabledComponent;