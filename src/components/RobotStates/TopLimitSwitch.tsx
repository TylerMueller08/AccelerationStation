import React, { useState, useEffect } from "react";
import { NetworkTables, NetworkTablesTypeInfos } from "ntcore-ts-client";

const TopLimitSwitchComponent: React.FC = () => {
    const [topLimitSwitch, setTopLimitSwitch] = useState(null);

    useEffect(() => {
        const ntcore = NetworkTables.getInstanceByTeam(4593);
        const topLimitSwitchTopic = ntcore.createTopic<boolean>("/accelerationstation/topLimitSwitchBool", NetworkTablesTypeInfos.kBoolean);

        const interval = setInterval(() => {
            topLimitSwitchTopic.subscribe((value) => {
                setTopLimitSwitch(value);
            }, true);
        }, 1000);
        
        return () => clearInterval(interval);
    }, []);

    return (
        <div className={`fault-status ${topLimitSwitch === null ? 'unknown' : topLimitSwitch ? 'true' : 'false'}`}></div>
    );
}

export default TopLimitSwitchComponent;