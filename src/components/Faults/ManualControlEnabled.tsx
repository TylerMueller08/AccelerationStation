import React, { useState, useEffect } from "react";
import { NetworkTablesTypeInfos } from "ntcore-ts-client";
import { ntcore } from "../../ntcoreInstance";

const ManualControlEnabledComponent: React.FC = () => {
    const [manualControlEnabled, setManualControlEnabled] = useState(null);

    useEffect(() => {
        const manualControlEnabledTopic = ntcore.createTopic<boolean>("/SmartDashboard/ManualControlEnabled", NetworkTablesTypeInfos.kBoolean);

        const checkConnectionStatus = () => {
            if (!ntcore.isRobotConnected()) {
                setManualControlEnabled(null);
            }
        };

        manualControlEnabledTopic.subscribe((value) => {
            setManualControlEnabled(value);
        }, true);

        const interval = setInterval(checkConnectionStatus, 1000);

        return() => {
            clearInterval(interval);
        }
    }, []);

    return (
        <div className={`fault-status ${manualControlEnabled === null ? 'unknown' : manualControlEnabled ? 'true' : 'false'}`}></div>
    );
}

export default ManualControlEnabledComponent;