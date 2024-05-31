import React, { useState, useEffect } from "react";
import { NetworkTablesTypeInfos } from "ntcore-ts-client";
import { ntcore } from "../../ntcoreInstance";

const EncoderFailureDetectedComponent: React.FC = () => {
    const [encoderFailureDetected, setEncoderFailureDetected] = useState(null);

    useEffect(() => {
        const encoderFailureDetectedTopic = ntcore.createTopic<boolean>("/SmartDashboard/EncoderFailureDetected", NetworkTablesTypeInfos.kBoolean);

        const checkConnectionStatus = () => {
            if (!ntcore.isRobotConnected()) {
                setEncoderFailureDetected(null);
            }
        };

        encoderFailureDetectedTopic.subscribe((value) => {
            setEncoderFailureDetected(value);
        }, true);

        const interval = setInterval(checkConnectionStatus, 1000);

        return() => {
            clearInterval(interval);
        }
    }, []);

    return (
        <div className={`fault-status ${encoderFailureDetected === null ? 'unknown' : encoderFailureDetected ? 'true' : 'false'}`}></div>
    );
}

export default EncoderFailureDetectedComponent;