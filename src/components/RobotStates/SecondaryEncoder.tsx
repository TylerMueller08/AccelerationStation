import React, { useState, useEffect } from "react";
import { NetworkTablesTypeInfos } from "ntcore-ts-client";
import { ntcore } from "../../ntcoreInstance";

const SecondaryEncoderComponent: React.FC = () => {
    const [secondaryEncoder, setSecondaryEncoder] = useState<string>(null);

    useEffect(() => {
        const secondaryEncoderTopic = ntcore.createTopic<number>("/SmartDashboard/SecondaryEncoderValue", NetworkTablesTypeInfos.kDouble);

        const checkConnectionStatus = () => {
            if (!ntcore.isRobotConnected()) {
                setSecondaryEncoder(null);
            }
        }

        secondaryEncoderTopic.subscribe((value) => {
            setSecondaryEncoder(`${value}`);
        }, true);

        const interval = setInterval(checkConnectionStatus, 1000);

        return() => {
            clearInterval(interval);
        }
    }, []);

    return (
        <p className="state-text">{secondaryEncoder === null ? "N/A" : secondaryEncoder}</p>
    );
};

export default SecondaryEncoderComponent;