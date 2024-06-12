import React, { useState, useEffect } from "react";
import { NetworkTablesTypeInfos } from "ntcore-ts-client";
import { ntcore } from "../../ntcoreInstance";

const ArmStateComponent: React.FC = () => {
    const [armState, setArmState] = useState(null);

    useEffect(() => {
        const checkConnectionStatus = () => {
            if (!ntcore.isRobotConnected()) {
                setArmState(null);
            }
        };

        const updateConnection = () => {
            const armStateTopic = ntcore.createTopic<string>("/SmartDashboard/ArmState", NetworkTablesTypeInfos.kString);
            armStateTopic.subscribe((value) => {
                setArmState(value);
            }, true);
            
            setTimeout(() => {
                armStateTopic.unsubscribeAll();
            }, 500);
        };

        const interval = setInterval(() => {
            checkConnectionStatus();
            updateConnection();
        }, 1000);

        return() => {
            clearInterval(interval);
        }
    }, []);

    return (
        <p className="state-text">{armState === null ? "N/A" : armState}</p>
    );
};

export default ArmStateComponent;