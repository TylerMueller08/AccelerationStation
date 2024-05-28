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
    }, []);

    return (
        <p className="state-text">{armState ? armState : "N/A"}</p>
    );
};

export default ArmStateComponent;