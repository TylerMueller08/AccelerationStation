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

        const interval = setInterval(() => {
            if (!ntcore.isRobotConnected()) {
                setIntakeLimitSwitch(null);
            } else {
                intakeLimitSwitchTopic.resubscribeAll(ntcore.client);
            }
        }, 1000);

        return() => {
            clearInterval(interval);
        }
    }, []);

    return (
        <>
            <p className="state-name">Intake Limit Switch: </p>
            <div className={`fault-status ${intakeLimitSwitch == null ? 'unknown' : intakeLimitSwitch ? 'true' : 'false'}`}></div>
        </>
    );
}

export default IntakeLimitSwitchComponent;