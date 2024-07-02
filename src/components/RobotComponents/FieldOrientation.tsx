import React, { useState, useEffect, useRef } from "react";
import { NetworkTablesTypeInfos } from "ntcore-ts-client";
import { ntcore } from "../../ntcoreInstance";

const lerp = (start: number, end: number, amt: number) => (1 - amt) * start + amt * end;

interface Point {
    x: number;
    y: number;
    timestamp: number;
}

const FieldOrientationComponent: React.FC = () => {
    const [fieldOrientation, setFieldOrientation] = useState<boolean | null>(null);
    const [xPosition, setXPosition] = useState(0);
    const [yPosition, setYPosition] = useState(0);
    const [rotation, setRotation] = useState(0);
    const [isConnected, setIsConnected] = useState<boolean>(false);
    const [trail, setTrail] = useState<Point[]>([]);

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
                if (Math.abs(fieldXPositionTopic.getValue()) < 0.01 && Math.abs(fieldYPositionTopic.getValue()) < 0.01) {
                    setIsConnected(false);
                }
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

            const newTrailPoint = { x: targetXPosition.current, y: targetYPosition.current, timestamp: Date.now() };
            if (trail.length === 0 || trail[trail.length - 1].x !== newTrailPoint.x || trail[trail.length - 1].y !== newTrailPoint.y) {
                setTrail((trail) => [...trail, newTrailPoint]);
            }

            animationFrameId = requestAnimationFrame(updatePosition);
        };

        updatePosition();

        return () => {
            cancelAnimationFrame(animationFrameId);
        };
    }, []);

    useEffect(() => {
        const interval = setInterval(() => {
            setTrail((trail) => trail.filter(point => Date.now() - point.timestamp < 5000));
        }, 1000);

        return () => {
            clearInterval(interval);
        };
    }, []);

    return (
        <div className="card"
            style={{
                transform: fieldOrientation == null || fieldOrientation ? 'rotate(0)' : 'rotate(180deg)',
                position: 'relative',
            }}
        >
            <div id="robotframe"
                style={{
                    position: 'absolute',
                    transform: !fieldOrientation
                        ? `translate(${isConnected ? yPosition : 140}px, ${isConnected ? xPosition : 215}px) rotate(${isConnected ? 180 - rotation : 180}deg)`
                        : `translate(${isConnected ? yPosition : 140}px, ${isConnected ? xPosition : 300}px) rotate(${isConnected ? 180 - rotation : 0}deg)`
                }}
            ></div>
            <svg width="100%" height="100%" style={{ position: 'absolute', top: 0, left: 0 }}>
                {trail.map((point, index) => {
                    if (index === 0) return null;
                    const prevPoint = trail[index - 1];
                    return (
                        <line
                            key={index}
                            x1={prevPoint.y + 13.1923076923}
                            y1={prevPoint.x + 15.7692307692}
                            x2={point.y + 13.1923076923}
                            y2={point.x + 15.7692307692}
                            stroke="yellow"
                            strokeWidth="3"
                            strokeOpacity={(5000 - (Date.now() - point.timestamp)) / 5000}
                        />
                    );
                })}
            </svg>
        </div>
    );
};

export default FieldOrientationComponent;
