import React, { useState, useEffect } from "react";
import { NetworkTablesTypeInfos } from "ntcore-ts-client";
import { ntcore } from "../../ntcoreInstance";

const ArmStateComponent: React.FC = () => {
    const [armState, setArmState] = useState(null);

    useEffect(() => {
        const armStateTopic = ntcore.createTopic<string>("/SmartDashboard/ArmState", NetworkTablesTypeInfos.kString);

        const checkConnectionStatus = () => {
            if (!ntcore.isRobotConnected()) {
                setArmState(null);
            }
        };

        armStateTopic.subscribe((value) => {
            setArmState(value);
        }, true);

        const interval = setInterval(checkConnectionStatus, 1000);

        return() => {
            clearInterval(interval);
        }
    }, []);

    return (
        <p className="state-text">{armState === null ? "N/A" : armState}</p>
    );
};

export default ArmStateComponent;