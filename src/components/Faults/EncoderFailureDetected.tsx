import React, { useState, useEffect } from "react";
import { NetworkTablesTypeInfos } from "ntcore-ts-client";
import { ntcore } from "../../ntcoreInstance";

const EncoderFailureDetectedComponent: React.FC = () => {
    const [encoderFailureDetected, setEncoderFailureDetected] = useState(null);

    useEffect(() => {
        const checkConnectionStatus = () => {
            if (!ntcore.isRobotConnected()) {
                setEncoderFailureDetected(null);
            }
        };

        const updateConnection = () => {
            const encoderFailureDetectedTopic = ntcore.createTopic<boolean>("/SmartDashboard/EncoderFailureDetected", NetworkTablesTypeInfos.kBoolean);
            encoderFailureDetectedTopic.subscribe((value) => {
                setEncoderFailureDetected(value);
            }, true);
            
            setTimeout(() => {
                encoderFailureDetectedTopic.unsubscribeAll();
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
        <div className={`fault-status ${encoderFailureDetected === null ? 'unknown' : encoderFailureDetected ? 'true' : 'false'}`}></div>
    );
}

export default EncoderFailureDetectedComponent;