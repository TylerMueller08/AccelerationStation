import React, { useState, useEffect } from "react";
import { NetworkTablesTypeInfos } from "ntcore-ts-client";
import { ntcore } from "../../ntcoreInstance";

const BottomLimitSwitchComponent: React.FC = () => {
    const [bottomLimitSwitch, setBottomLimitSwitch] = useState(null);

    useEffect(() => {
        const checkConnectionStatus = () => {
            if (!ntcore.isRobotConnected()) {
                setBottomLimitSwitch(null);
            }
        };

        const updateConnection = () => {
            const bottomLimitSwitchTopic = ntcore.createTopic<boolean>("/SmartDashboard/BottomLimitSwitchValue", NetworkTablesTypeInfos.kBoolean);
            bottomLimitSwitchTopic.subscribe((value) => {
                setBottomLimitSwitch(value);
            }, true);
            
            setTimeout(() => {
                bottomLimitSwitchTopic.unsubscribeAll();
            }, 500);
        }

        const interval = setInterval(() => {
            checkConnectionStatus();
            updateConnection();
        }, 1000);

        return() => {
            clearInterval(interval);
        }
    }, []);

    return (
        <div className={`fault-status ${bottomLimitSwitch === null ? 'unknown' : bottomLimitSwitch ? 'true' : 'false'}`}></div>
    );
}

export default BottomLimitSwitchComponent;