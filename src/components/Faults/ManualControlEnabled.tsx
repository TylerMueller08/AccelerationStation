import React, { useState, useEffect } from "react";
import { NetworkTablesTypeInfos } from "ntcore-ts-client";
import { ntcore } from "../../ntcoreInstance";

const ManualControlEnabledComponent: React.FC = () => {
    const [manualControlEnabled, setManualControlEnabled] = useState(null);

    useEffect(() => {
        const checkConnectionStatus = () => {
            if (!ntcore.isRobotConnected()) {
                setManualControlEnabled(null);
            }
        };

        const updateConnection = () => {
            const manualControlEnabledTopic = ntcore.createTopic<boolean>("/SmartDashboard/ManualControlEnabled", NetworkTablesTypeInfos.kBoolean);
            manualControlEnabledTopic.subscribe((value) => {
                setManualControlEnabled(value);
            }, true);
            
            setTimeout(() => {
                manualControlEnabledTopic.unsubscribeAll();
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
        <div className={`fault-status ${manualControlEnabled === null ? 'unknown' : manualControlEnabled ? 'true' : 'false'}`}></div>
    );
}

export default ManualControlEnabledComponent;