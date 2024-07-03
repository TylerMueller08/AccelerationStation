import React, { useState, useEffect, useRef } from "react";
import { NetworkTablesTypeInfos } from "ntcore-ts-client";
import { ntcore } from "../../ntcoreInstance";
import { Button, Dialog, DialogActions, DialogContent, DialogTitle, TextField } from "@mui/material";

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
    const [showDialog, setShowDialog] = useState(false);
    const [robotLength, setRobotLength] = useState<number>(25.2);
    const [robotWidth, setRobotWidth] = useState<number>(25.2);
    const [robotLengthInput, setRobotLengthInput] = useState<string>("0.80");
    const [robotWidthInput, setRobotWidthInput] = useState<string>("0.80");

    const targetXPosition = useRef(0);
    const targetYPosition = useRef(0);
    const targetRotation = useRef(0);

    useEffect(() => {
        // Load saved dimensions from local storage
        const savedRobotLength = localStorage.getItem("robotLength");
        const savedRobotWidth = localStorage.getItem("robotWidth");
        const savedRobotLengthInput = localStorage.getItem("robotLengthInput");
        const savedRobotWidthInput = localStorage.getItem("robotWidthInput");

        if (savedRobotLength) setRobotLength(parseFloat(savedRobotLength));
        if (savedRobotWidth) setRobotWidth(parseFloat(savedRobotWidth));
        if (savedRobotLengthInput) setRobotLengthInput(savedRobotLengthInput);
        if (savedRobotWidthInput) setRobotWidthInput(savedRobotWidthInput);

        const allianceColorTopic = ntcore.createTopic<boolean>("/FMSInfo/IsRedAlliance", NetworkTablesTypeInfos.kBoolean);
        const fieldXPositionTopic = ntcore.createTopic<number>("/SmartDashboard/FieldXPosition", NetworkTablesTypeInfos.kDouble);
        const fieldYPositionTopic = ntcore.createTopic<number>("/SmartDashboard/FieldYPosition", NetworkTablesTypeInfos.kDouble);
        const fieldRotationTopic = ntcore.createTopic<number>("/SmartDashboard/FieldRotation", NetworkTablesTypeInfos.kDouble);

        allianceColorTopic.subscribe((value) => setFieldOrientation(value), true);
        fieldXPositionTopic.subscribe((value) => targetXPosition.current = value * 32.9 - (robotWidth / 2), true);
        fieldYPositionTopic.subscribe((value) => targetYPosition.current = value * 36.15 - (robotLength / 2), true);
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

            setTrail((trail) => trail.filter(point => Date.now() - point.timestamp < 5000));
        }, 1000);

        return () => {
            clearInterval(interval);
        };
    }, []);

    useEffect(() => {
        let animationFrameId: number;

        const updatePosition = () => {
            setXPosition((prev) => lerp(prev, targetXPosition.current, 0.27));
            setYPosition((prev) => lerp(prev, targetYPosition.current, 0.27));
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

    const handleOpenDialog = () => {
        setShowDialog(true);
    };

    const handleCloseDialog = () => {
        setShowDialog(false);
    };

    const handleRobotLengthChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const value = event.target.value;
        setRobotLengthInput(value);
    };

    const handleRobotWidthChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const value = event.target.value;
        setRobotWidthInput(value);
    };

    const handleSave = () => {
        const lengthInMeters = parseFloat(robotLengthInput);
        if (!isNaN(lengthInMeters) && lengthInMeters >= 0.25 && lengthInMeters <= 2) {
            const lengthInPixels = parseFloat((lengthInMeters * 31.5).toFixed(2));
            setRobotLength(lengthInPixels);
            localStorage.setItem("robotLength", lengthInPixels.toString());
            localStorage.setItem("robotLengthInput", robotLengthInput);
        }

        const widthInMeters = parseFloat(robotWidthInput);
        if (!isNaN(widthInMeters) && widthInMeters >= 0.25 && widthInMeters <= 2) {
            const widthInPixels = parseFloat((widthInMeters * 31.5).toFixed(2));
            setRobotWidth(widthInPixels);
            localStorage.setItem("robotWidth", widthInPixels.toString());
            localStorage.setItem("robotWidthInput", robotWidthInput);
        }

        handleCloseDialog();
    };

    return (
        <>
            <div onContextMenu={handleOpenDialog} className="card"
                style={{
                    transform: fieldOrientation == null || fieldOrientation ? 'rotate(0)' : 'rotate(180deg)',
                    position: 'relative',
                }}
            >
                <svg width="100%" height="100%" style={{ position: 'absolute', top: 0, left: 0 }}>
                    {trail.map((point, index) => {
                        if (index === 0) return null;
                        const prevPoint = trail[index - 1];
                        return (
                            <line
                                key={index}
                                x1={prevPoint.y + (robotLength / 2)}
                                y1={prevPoint.x + (robotWidth / 2)}
                                x2={point.y + (robotLength / 2)}
                                y2={point.x + (robotWidth / 2)}
                                stroke="yellow"
                                strokeWidth="3"
                                strokeOpacity={(5000 - (Date.now() - point.timestamp)) / 5000}
                            />
                        );
                    })}
                </svg>

                <div className="arrow-square"
                    style={{
                        width: `${robotLength}px`,
                        height: `${robotWidth}px`,
                        position: 'absolute',
                        transform: !fieldOrientation
                            ? `translate(${(isConnected ? yPosition : 140) - 3}px, ${(isConnected ? xPosition : 215) - 3}px) rotate(${isConnected ? 180 - rotation : 180}deg)`
                            : `translate(${(isConnected ? yPosition : 140) - 3}px, ${(isConnected ? xPosition : 300) - 3}px) rotate(${isConnected ? 180 - rotation : 0}deg)`
                    }}
                >
                    <div className="arrow-up"></div>
                </div>
            </div>
            <Dialog open={showDialog} onClose={handleCloseDialog}>
                <DialogTitle>Edit Robot Dimensions</DialogTitle>
                <DialogContent>
                    <TextField
                        autoFocus
                        margin="dense"
                        label="Length (Meters)"
                        type="number"
                        fullWidth
                        value={robotLengthInput}
                        onChange={handleRobotLengthChange}
                        inputProps={{ min: 0.25, max: 2.0, step: 0.01 }}
                    />
                    <TextField
                        margin="dense"
                        label="Width (Meters)"
                        type="number"
                        fullWidth
                        value={robotWidthInput}
                        onChange={handleRobotWidthChange}
                        inputProps={{ min: 0.25, max: 2.00, step: 0.01 }}
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleCloseDialog} color="primary">
                        Cancel
                    </Button>
                    <Button onClick={handleSave} color="primary">
                        Save
                    </Button>
                </DialogActions>
            </Dialog>
        </>
    );
};

export default FieldOrientationComponent;
