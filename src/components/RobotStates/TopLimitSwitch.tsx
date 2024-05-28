import React, { useState, useEffect } from "react";
import { NetworkTablesTypeInfos } from "ntcore-ts-client";
import { ntcore } from "../../ntcoreInstance";

const TopLimitSwitchComponent: React.FC = () => {
    const [topLimitSwitch, setTopLimitSwitch] = useState(null);

    useEffect(() => {
        const topLimitSwitchTopic = ntcore.createTopic<boolean>("/SmartDashboard/TopLimitSwitchValue", NetworkTablesTypeInfos.kBoolean);

        topLimitSwitchTopic.subscribe((value) => {
            setTopLimitSwitch(value);
        }, true);
    }, []);

    return (
        <div className={`fault-status ${topLimitSwitch === null ? 'unknown' : topLimitSwitch ? 'true' : 'false'}`}></div>
    );
}

export default TopLimitSwitchComponent;