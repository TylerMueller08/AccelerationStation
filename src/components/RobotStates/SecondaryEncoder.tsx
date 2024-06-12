import React, { useState, useEffect } from "react";
import { NetworkTablesTypeInfos } from "ntcore-ts-client";
import { ntcore } from "../../ntcoreInstance";

const SecondaryEncoderComponent: React.FC = () => {
    const [secondaryEncoder, setSecondaryEncoder] = useState<string>(null);

    useEffect(() => {
        const checkConnectionStatus = () => {
            if (!ntcore.isRobotConnected()) {
                setSecondaryEncoder(null);
            }
        }

        const updateConnection = () => {
            const secondaryEncoderTopic = ntcore.createTopic<number>("/SmartDashboard/SecondaryEncoderValue", NetworkTablesTypeInfos.kDouble);
            secondaryEncoderTopic.subscribe((value) => {
                setSecondaryEncoder(`${value}`);
            }, true);
            
            setTimeout(() => {
                secondaryEncoderTopic.unsubscribeAll();
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
        <p className="state-text">{secondaryEncoder == "null" ? "N/A" : secondaryEncoder}</p>
    );
};

export default SecondaryEncoderComponent;