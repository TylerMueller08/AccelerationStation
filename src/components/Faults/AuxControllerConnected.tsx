import React, { useState, useEffect } from "react";
import { NetworkTablesTypeInfos } from "ntcore-ts-client";
import { ntcore } from "../../ntcoreInstance";

const AuxControllerConnectedComponent: React.FC = () => {
    const [auxControllerConnected, setAuxControllerConnected] = useState(null);

    useEffect(() => {
        const checkConnectionStatus = () => {
            if (!ntcore.isRobotConnected()) {
                setAuxControllerConnected(null);
            }
        };

        const updateConnection = () => {
            const auxControllerConnectedTopic = ntcore.createTopic<boolean>("/SmartDashboard/AuxControllerConnected", NetworkTablesTypeInfos.kBoolean);
            auxControllerConnectedTopic.subscribe((value) => {
                setAuxControllerConnected(value);
            }, true);
            
            setTimeout(() => {
                auxControllerConnectedTopic.unsubscribeAll();
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
        <div className={`fault-status ${auxControllerConnected === null ? 'unknown' : auxControllerConnected ? 'true' : 'false'}`}></div>
    );
}

export default AuxControllerConnectedComponent;