import React, { useState, useEffect } from "react";
import { NetworkTables, NetworkTablesTypeInfos } from "ntcore-ts-client";

const BottomLimitSwitchComponent: React.FC = () => {
    const [bottomLimitSwitch, setBottomLimitSwitch] = useState(null);

    useEffect(() => {
        const ntcore = NetworkTables.getInstanceByTeam(4593);
        const bottomLimitSwitchTopic = ntcore.createTopic<boolean>("/accelerationstation/bottomLimitSwitchBool", NetworkTablesTypeInfos.kBoolean);

        const interval = setInterval(() => {
            bottomLimitSwitchTopic.subscribe((value) => {
                setBottomLimitSwitch(value);
            }, true);
        }, 1000);
        
        return () => clearInterval(interval);
    }, []);

    return (
        <div className={`fault-status ${bottomLimitSwitch === null ? 'unknown' : bottomLimitSwitch ? 'true' : 'false'}`}></div>
    );
}

export default BottomLimitSwitchComponent;