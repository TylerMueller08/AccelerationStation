import React, { useState, useEffect } from "react";
import { NetworkTables, NetworkTablesTypeInfos } from "ntcore-ts-client";

const SecondaryEncoderComponent: React.FC = () => {
    const [secondaryEncoder, setSecondaryEncoder] = useState<string>("N/A");

    useEffect(() => {
        const ntcore = NetworkTables.getInstanceByTeam(4593);
        const secondaryEncoderTopic = ntcore.createTopic<number>("/accelerationstation/secondaryEncoderValue", NetworkTablesTypeInfos.kDouble);

        const interval = setInterval(() => {
            secondaryEncoderTopic.subscribe((value) => {
                if (value === null) {
                    setSecondaryEncoder("N/A");
                } else {
                    setSecondaryEncoder(`${value}`);
                }
            }, true);
        }, 1000);

        return () => clearInterval(interval);
    }, []);

    return (
        <p className="state-text">{secondaryEncoder}</p>
    );
};

export default SecondaryEncoderComponent;