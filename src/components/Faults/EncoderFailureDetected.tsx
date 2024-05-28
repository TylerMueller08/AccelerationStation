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
    }, []);

    return (
        <div className={`fault-status ${encoderFailureDetected === null ? 'unknown' : encoderFailureDetected ? 'true' : 'false'}`}></div>
    );
}

export default EncoderFailureDetectedComponent;