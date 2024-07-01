import React, { useState, useEffect } from "react";
import { NetworkTablesTypeInfos } from "ntcore-ts-client";
import { ntcore } from "../../ntcoreInstance";

const EncoderFailureDetectedComponent: React.FC = () => {
    const [encoderFailureDetected, setEncoderFailureDetected] = useState(null);

    useEffect(() => {
        const encoderFailureDetectedTopic = ntcore.createTopic<boolean>("/SmartDashboard/EncoderFailureDetected", NetworkTablesTypeInfos.kBoolean);
            
        encoderFailureDetectedTopic.subscribe((value) => {
            setEncoderFailureDetected(value);
        }, true);

        const interval = setInterval(() => {
            if (!ntcore.isRobotConnected()) {
                setEncoderFailureDetected(null);
            } else {
                encoderFailureDetectedTopic.resubscribeAll(ntcore.client);
            }
        }, 1000);

        return() => {
            clearInterval(interval);
        }
    }, []);

    return (
        <>
            <p className="fault-name">Encoder Failure: </p>
            <div className={`fault-status ${encoderFailureDetected == null ? 'unknown' : encoderFailureDetected ? 'true' : 'false'}`}></div>
        </>
    );
}

export default EncoderFailureDetectedComponent;