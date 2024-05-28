import React, { useState, useEffect } from "react";
import { NetworkTablesTypeInfos } from "ntcore-ts-client";
import { ntcore } from "../../ntcoreInstance";

const PrimaryEncoderComponent: React.FC = () => {
    const [primaryEncoder, setPrimaryEncoder] = useState<string>("N/A");

    useEffect(() => {
        const primaryEncoderTopic = ntcore.createTopic<number>("/SmartDashboard/PrimaryEncoderValue", NetworkTablesTypeInfos.kDouble);

        primaryEncoderTopic.subscribe((value) => {
            if (value === null) {
                setPrimaryEncoder("N/A");
            } else {
                setPrimaryEncoder(`${value}`);
            }
        }, true);
    }, []);

    return (
        <p className="state-text">{primaryEncoder}</p>
    );
};

export default PrimaryEncoderComponent;