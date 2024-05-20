import React, { useState, useEffect } from "react";
import { NetworkTables, NetworkTablesTypeInfos } from "ntcore-ts-client";

const ArmStateComponent: React.FC = () => {
    const [armState, setArmState] = useState("N/A");

    useEffect(() => {
        const ntcore = NetworkTables.getInstanceByTeam(4593);
        const armStateTopic = ntcore.createTopic<string>("/accelerationstation/armState", NetworkTablesTypeInfos.kString);

        const interval = setInterval(() => {
            armStateTopic.subscribe((value) => {
                setArmState(value);
            }, true);
        }, 1000);

        return () => clearInterval(interval);
    }, []);

    return (
        <p className="state-text">{armState ? armState : "N/A"}</p>
    );
};

export default ArmStateComponent;