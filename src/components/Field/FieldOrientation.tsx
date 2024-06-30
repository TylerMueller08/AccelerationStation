import React, { useState, useEffect, useRef } from "react";
import { NetworkTablesTypeInfos } from "ntcore-ts-client";
import { ntcore } from "../../ntcoreInstance";

const lerp = (start: number, end: number, amt: number) => (1 - amt) * start + amt * end;

const FieldOrientationComponent: React.FC = () => {
    const [fieldOrientation, setFieldOrientation] = useState<boolean | null>(null);
    const [xPosition, setXPosition] = useState(0);
    const [yPosition, setYPosition] = useState(0);
    const [rotation, setRotation] = useState(0);
    const [isConnected, setIsConnected] = useState<boolean>(false);

    const targetXPosition = useRef(0);
    const targetYPosition = useRef(0);
    const targetRotation = useRef(0);

    useEffect(() => {
        const allianceColorTopic = ntcore.createTopic<boolean>("/FMSInfo/IsRedAlliance", NetworkTablesTypeInfos.kBoolean);
        const fieldXPositionTopic = ntcore.createTopic<number>("/SmartDashboard/FieldXPosition", NetworkTablesTypeInfos.kDouble);
        const fieldYPositionTopic = ntcore.createTopic<number>("/SmartDashboard/FieldYPosition", NetworkTablesTypeInfos.kDouble);
        const fieldRotationTopic = ntcore.createTopic<number>("/SmartDashboard/FieldRotation", NetworkTablesTypeInfos.kDouble);
        
        allianceColorTopic.subscribe((value) => setFieldOrientation(value), true);
        fieldXPositionTopic.subscribe((value) => targetXPosition.current = value * 32.9 - 15.7692307692, true);
        fieldYPositionTopic.subscribe((value) => targetYPosition.current = value * 36.15 - 13.1923076923, true);
        fieldRotationTopic.subscribe((value) => targetRotation.current = value, true);

        const interval = setInterval(() => {
            const connected = ntcore.isRobotConnected();
            if (connected) {
                setIsConnected(true);
            } else {
                setFieldOrientation(null);
                setXPosition(0);
                setYPosition(0);
                setRotation(0);
                setIsConnected(false);
            }
        }, 1000);

        return () => {
            clearInterval(interval);
        };
    }, []);

    useEffect(() => {
        let animationFrameId: number;
        
        const updatePosition = () => {
            setXPosition((prev) => lerp(prev, targetXPosition.current, 0.1)); 
            setYPosition((prev) => lerp(prev, targetYPosition.current, 0.1));
            setRotation((prev) => lerp(prev, targetRotation.current, 0.1));
            
            animationFrameId = requestAnimationFrame(updatePosition);
        };

        updatePosition();

        return () => {
            cancelAnimationFrame(animationFrameId);
        };
    }, []);

    return (
        <div className="card"
            style={{
                transform: fieldOrientation == null || fieldOrientation ? 'rotate(0)' : 'rotate(180deg)'
            }}
        >
            <div id="robotframe" 
                style={{
                    transform: !fieldOrientation
                    ? `translate(${isConnected ? yPosition : 188}px, ${isConnected ? xPosition : 481}px) rotate(${isConnected ? 180 - rotation : 180}deg)`
                    : `translate(${isConnected ? yPosition : 188}px, ${isConnected ? xPosition : 31}px) rotate(${isConnected ? 180 - rotation : 0}deg)`
                }}
            ></div>
        </div>
    );
};

export default FieldOrientationComponent;
