import React, { useState, useEffect } from "react";
import { NetworkTablesTypeInfos } from "ntcore-ts-client";
import { ntcore } from "../../ntcoreInstance";

const ArmStateComponent: React.FC = () => {
    const [armState, setArmState] = useState(null);

    useEffect(() => {
        const armStateTopic = ntcore.createTopic<string>("/SmartDashboard/ArmState", NetworkTablesTypeInfos.kString);

        armStateTopic.subscribe((value) => {
            setArmState(value);
        }, true);

        const interval = setInterval(() => {
            if (!ntcore.isRobotConnected()) {
                setArmState(null);
            } else {
                armStateTopic.resubscribeAll(ntcore.client);
            }
        }, 1000);

        return() => {
            clearInterval(interval);
        }
    }, []);

    return (
        <>
            <p className="state-name">Arm State: </p>
            <p className="state-text">{armState == null ? "N/A" : armState}</p>
        </>
    );
};

export default ArmStateComponent;