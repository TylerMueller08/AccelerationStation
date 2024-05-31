import React, { useState, useEffect } from "react";
import { NetworkTablesTypeInfos } from "ntcore-ts-client";
import { ntcore } from "../../ntcoreInstance";

const FieldOrientationComponent: React.FC = () => {
    const [fieldOrientation, setFieldOrientation] = useState(null);

    useEffect(() => {
        const allianceColorTopic = ntcore.createTopic<boolean>("/FMSInfo/IsRedAlliance", NetworkTablesTypeInfos.kBoolean);

        const checkConnectionStatus = () => {
            if (!ntcore.isRobotConnected()) {
                setFieldOrientation(null);
            }
        };

        allianceColorTopic.subscribe((value) => {
            setFieldOrientation(value);
        }, true);

        const interval = setInterval(checkConnectionStatus, 1000);

        return() => {
            clearInterval(interval);
        }
    })

    return (
        <div className="card"
            style={{
                transform: fieldOrientation === null || fieldOrientation ? 'scaleY(1)' : 'scaleY(-1)',
            }}
        >
            <div id="robotframe" 
                style={{
                    transform: fieldOrientation === null || fieldOrientation ? 'scaleY(1) translate(187px, 482px) rotate(180deg)' : 'scaleY(-1) translate(187px, -31px) rotate(180deg)',
                }}
            ></div>
        </div>
    );
};

export default FieldOrientationComponent;