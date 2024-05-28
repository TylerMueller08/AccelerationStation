import React, { useState, useEffect } from "react";
import { NetworkTablesTypeInfos } from "ntcore-ts-client";
import { ntcore } from "../../ntcoreInstance";

const IntakeLimitSwitchComponent: React.FC = () => {
    const [intakeLimitSwitch, setIntakeLimitSwitch] = useState(null);

    useEffect(() => {
        const intakeLimitSwitchTopic = ntcore.createTopic<boolean>("/SmartDashboard/IntakeLimitSwitchValue", NetworkTablesTypeInfos.kBoolean);

        intakeLimitSwitchTopic.subscribe((value) => {
            setIntakeLimitSwitch(value);
        }, true);
    }, []);

    return (
        <div className={`fault-status ${intakeLimitSwitch === null ? 'unknown' : intakeLimitSwitch ? 'true' : 'false'}`}></div>
    );
}

export default IntakeLimitSwitchComponent;