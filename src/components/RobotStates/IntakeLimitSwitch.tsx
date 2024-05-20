import React, { useState, useEffect } from "react";
import { NetworkTables, NetworkTablesTypeInfos } from "ntcore-ts-client";

const IntakeLimitSwitchComponent: React.FC = () => {
    const [intakeLimitSwitch, setIntakeLimitSwitch] = useState(null);

    useEffect(() => {
        const ntcore = NetworkTables.getInstanceByTeam(4593);
        const intakeLimitSwitchTopic = ntcore.createTopic<boolean>("/accelerationstation/intakeLimitSwitchBool", NetworkTablesTypeInfos.kBoolean);

        const interval = setInterval(() => {
            intakeLimitSwitchTopic.subscribe((value) => {
                setIntakeLimitSwitch(value);
            }, true);
        }, 1000);
        
        return () => clearInterval(interval);
    }, []);

    return (
        <div className={`fault-status ${intakeLimitSwitch === null ? 'unknown' : intakeLimitSwitch ? 'true' : 'false'}`}></div>
    );
}

export default IntakeLimitSwitchComponent;