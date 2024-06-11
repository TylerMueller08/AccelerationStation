import React, { useState, useEffect } from "react";
import { NetworkTablesTypeInfos } from "ntcore-ts-client";
import { ntcore } from "../../ntcoreInstance";

const FieldOrientationComponent: React.FC = () => {
    const [fieldOrientation, setFieldOrientation] = useState(null);
    const [xPosition, setXPosition] = useState(0);
    const [yPosition, setYPosition] = useState(0);
    const [rotation, setRotation] = useState(0);
    const [isConnected, setIsConnected] = useState<boolean>(false);

    useEffect(() => {
        const allianceColorTopic = ntcore.createTopic<boolean>("/FMSInfo/IsRedAlliance", NetworkTablesTypeInfos.kBoolean);
        const fieldXPositionTopic = ntcore.createTopic<number>("/SmartDashboard/FieldXPosition", NetworkTablesTypeInfos.kDouble);
        const fieldYPositionTopic = ntcore.createTopic<number>("/SmartDashboard/FieldYPosition", NetworkTablesTypeInfos.kDouble);
        const fieldRotationTopic = ntcore.createTopic<number>("/SmartDashboard/FieldRotation", NetworkTablesTypeInfos.kDouble);

        const checkConnectionStatus = () => {
            const connected = ntcore.isRobotConnected();
            if (connected) {
                if (xPosition < 0.1 && yPosition < 0.1 && rotation < 0.1) {
                    setIsConnected(false);
                } else {
                    setIsConnected(true);
                }
            } else {
                setFieldOrientation(null);
                setXPosition(0);
                setYPosition(0);
                setRotation(0);
                setIsConnected(false);
            }
        };

        allianceColorTopic.subscribe((value) => {
            setFieldOrientation(value);
        }, true);

        fieldXPositionTopic.subscribe((value) => {
            setXPosition(value * 32.9 - 15.7692307692);
        }, true);

        fieldYPositionTopic.subscribe((value) => {
            setYPosition(value * 36.15 - 13.1923076923);
        }, true);

        fieldRotationTopic.subscribe((value) => {
            setRotation(value);
        }, true);


        const interval = setInterval(() => {
            checkConnectionStatus();
        }, 1000);

        return() => {
            clearInterval(interval);
            allianceColorTopic.unsubscribeAll();
            fieldXPositionTopic.unsubscribeAll();
            fieldYPositionTopic.unsubscribeAll();
            fieldRotationTopic.unsubscribeAll();
        }
    })

    return (
        <div className="card"
            style={{
                transform: fieldOrientation === null || fieldOrientation ? 'rotate(0)' : 'rotate(180deg)'
            }}
        >
            <div id="robotframe" 
                style={{
                    transform: !fieldOrientation
                    ? `translate(${isConnected ? yPosition : 188}px, ${isConnected ? xPosition : 31}px) rotate(${isConnected ? 180 - rotation : 0}deg)`
                    : `translate(${isConnected ? yPosition : 188}px, ${isConnected ? xPosition : 481}px) rotate(${isConnected ? 180 - rotation : 180}deg)`

                }}
            ></div>
        </div>
    );
};

export default FieldOrientationComponent;