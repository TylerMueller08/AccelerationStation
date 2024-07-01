import React, { useState, useEffect } from "react";
import { NetworkTablesTypeInfos } from "ntcore-ts-client";
import { ntcore } from "../../ntcoreInstance";

const BottomLimitSwitchComponent: React.FC = () => {
    const [bottomLimitSwitch, setBottomLimitSwitch] = useState(null);

    useEffect(() => {
        const bottomLimitSwitchTopic = ntcore.createTopic<boolean>("/SmartDashboard/BottomLimitSwitchValue", NetworkTablesTypeInfos.kBoolean);
        
        bottomLimitSwitchTopic.subscribe((value) => {
            setBottomLimitSwitch(value);
        }, true);

        const interval = setInterval(() => {
            if (!ntcore.isRobotConnected()) {
                setBottomLimitSwitch(null);
            } else {
                bottomLimitSwitchTopic.resubscribeAll(ntcore.client);
            }
        }, 1000);

        return() => {
            clearInterval(interval);
        }
    }, []);

    return (
        <>
            <p className="state-name">Bottom Limit Switch: </p>
            <div className={`fault-status ${bottomLimitSwitch == null ? 'unknown' : bottomLimitSwitch ? 'true' : 'false'}`}></div>
        </>
    );
}

export default BottomLimitSwitchComponent;