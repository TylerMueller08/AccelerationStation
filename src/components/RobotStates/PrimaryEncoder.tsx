import React, { useState, useEffect } from "react";
import { NetworkTablesTypeInfos } from "ntcore-ts-client";
import { ntcore } from "../../ntcoreInstance";

const PrimaryEncoderComponent: React.FC = () => {
    const [primaryEncoder, setPrimaryEncoder] = useState<string>(null);

    useEffect(() => {
        const primaryEncoderTopic = ntcore.createTopic<number>("/SmartDashboard/PrimaryEncoderValue", NetworkTablesTypeInfos.kDouble);

        const checkConnectionStatus = () => {
            if (!ntcore.isRobotConnected()) {
                setPrimaryEncoder(null);
            }
        };

        primaryEncoderTopic.subscribe((value) => {
            setPrimaryEncoder(`${value}`);
        }, true);

        const interval = setInterval(checkConnectionStatus, 1000);

        return() => {
            clearInterval(interval);
        }
    }, []);

    return (
        <p className="state-text">{primaryEncoder === null ? "N/A" : primaryEncoder}</p>
    );
};

export default PrimaryEncoderComponent;