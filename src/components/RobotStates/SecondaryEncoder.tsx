import React, { useState, useEffect } from "react";
import { NetworkTablesTypeInfos } from "ntcore-ts-client";
import { ntcore } from "../../ntcoreInstance";

const SecondaryEncoderComponent: React.FC = () => {
    const [secondaryEncoder, setSecondaryEncoder] = useState<string>("N/A");

    useEffect(() => {
        const secondaryEncoderTopic = ntcore.createTopic<number>("/SmartDashboard/SecondaryEncoderValue", NetworkTablesTypeInfos.kDouble);

        secondaryEncoderTopic.subscribe((value) => {
            if (value === null) {
                setSecondaryEncoder("N/A");
            } else {
                setSecondaryEncoder(`${value}`);
            }
        }, true);
    }, []);

    return (
        <p className="state-text">{secondaryEncoder}</p>
    );
};

export default SecondaryEncoderComponent;