import React, { useState, useEffect } from "react";
import { NetworkTablesTypeInfos } from "ntcore-ts-client";
import { ntcore } from "../../ntcoreInstance";

const BottomLimitSwitchComponent: React.FC = () => {
    const [bottomLimitSwitch, setBottomLimitSwitch] = useState(null);

    useEffect(() => {
        const bottomLimitSwitchTopic = ntcore.createTopic<boolean>("/SmartDashboard/BottomLimitSwitchValue", NetworkTablesTypeInfos.kBoolean);

        const checkConnectionStatus = () => {
            if (!ntcore.isRobotConnected()) {
                setBottomLimitSwitch(null);
            }
        };

        bottomLimitSwitchTopic.subscribe((value) => {
            setBottomLimitSwitch(value);
        }, true);

        const interval = setInterval(checkConnectionStatus, 1000);

        return() => {
            clearInterval(interval);
        }
    }, []);

    return (
        <div className={`fault-status ${bottomLimitSwitch === null ? 'unknown' : bottomLimitSwitch ? 'true' : 'false'}`}></div>
    );
}

export default BottomLimitSwitchComponent;