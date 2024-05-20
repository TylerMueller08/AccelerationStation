import React, { useState, useEffect } from "react";
import { NetworkTables, NetworkTablesTypeInfos } from "ntcore-ts-client";

const PrimaryEncoderComponent: React.FC = () => {
    const [primaryEncoder, setPrimaryEncoder] = useState<string>("N/A");

    useEffect(() => {
        const ntcore = NetworkTables.getInstanceByTeam(4593);
        const primaryEncoderTopic = ntcore.createTopic<number>("/accelerationstation/primaryEncoderValue", NetworkTablesTypeInfos.kDouble);

        const interval = setInterval(() => {
            primaryEncoderTopic.subscribe((value) => {
                if (value === null) {
                    setPrimaryEncoder("N/A");
                } else {
                    setPrimaryEncoder(`${value}`);
                }
            }, true);
        }, 1000);

        return () => clearInterval(interval);
    }, []);

    return (
        <p className="state-text">{primaryEncoder}</p>
    );
};

export default PrimaryEncoderComponent;