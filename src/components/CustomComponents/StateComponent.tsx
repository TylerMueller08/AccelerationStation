import React, { useState, useEffect, useRef } from "react";
import { Dialog, DialogTitle, DialogContent, DialogActions, Button, TextField, FormControl, InputLabel, Select, MenuItem } from "@mui/material";
import { NetworkTablesTypeInfos } from "ntcore-ts-client";
import { ntcore } from "../../ntcoreInstance";

interface SmartDashboardItemProps {
    componentId: string | number;
}

const SmartDashboardItem: React.FC<SmartDashboardItemProps> = ({ componentId }) => {
    const [showDialog, setShowDialog] = useState(false);
    const [label, setLabel] = useState(`Example Label ${componentId}`);
    const [type, setType] = useState<string>("string");
    const [topic, setTopic] = useState<string>("");
    const [value, setValue] = useState<any>(null);
    const currentTopicRef = useRef<any>(null);

    useEffect(() => {
        const storedLabel = localStorage.getItem(`label_${componentId}`);
        const storedType = localStorage.getItem(`type_${componentId}`);
        const storedTopic = localStorage.getItem(`topic_${componentId}`);

        if (storedLabel) setLabel(storedLabel);
        if (storedType) setType(storedType);
        if (storedTopic) setTopic(storedTopic);
    }, [componentId]);

    useEffect(() => {
        if (topic) {
            let topicType;
            switch (type) {
                case "string":
                    topicType = NetworkTablesTypeInfos.kString;
                    break;
                case "boolean":
                    topicType = NetworkTablesTypeInfos.kBoolean;
                    break;
                case "number":
                    topicType = NetworkTablesTypeInfos.kDouble;
                    break;
                default:
                    topicType = NetworkTablesTypeInfos.kString;
                    break;
            }

            if (currentTopicRef.current) {
                currentTopicRef.current.unsubscribeAll();
            }
            
            try {
                const ntTopic = ntcore.createTopic<any>(`/SmartDashboard/${topic}`, topicType);
                currentTopicRef.current = ntTopic;

                ntTopic.subscribe((value) => {
                    setValue(value);
                }, true);

                const interval = setInterval(() => {
                    if (!ntcore.isRobotConnected()) {
                        setValue(null);
                    } else {
                        ntTopic.resubscribeAll(ntcore.client);
                    }
                }, 1000);

                return () => {
                    clearInterval(interval);
                };
            } catch (error) {
                console.error(`Error creating topic for ${topic}`, error);
                setValue(null);
            } 
        }

        return () => {
            if (currentTopicRef.current) {
                currentTopicRef.current.unsubscribeAll();
            }
        };
    }, [topic, type]);

    const handleOpenDialog = () => {
        setShowDialog(true);
    };

    const handleCloseDialog = () => {
        setShowDialog(false);
    };

    const handleSave = () => {
        localStorage.setItem(`label_${componentId}`, label);
        localStorage.setItem(`type_${componentId}`, type);
        localStorage.setItem(`topic_${componentId}`, topic);
        setShowDialog(false);
    };

    const formatNumber = (num: number | null): string => {
        if (num == null) return "N/A";
        if (typeof num !== "number") return "N/A";

        if (Number.isInteger(num)) {
            return num.toFixed(0);
        } else {
            return num.toFixed(3);
        }
    }

    return (
        <>
            <p className="state-name" onContextMenu={handleOpenDialog}>{label}:</p>
            {type === "string" ? (
                <p className="state-text">{value == null ? "N/A" : value}</p>
            ) : type === "boolean" ? (
                <div className={`fault-status ${value == null ? 'unknown' : value ? 'true' : 'false'}`}></div>
            ) : type === "number" ? (
                <p className="state-text">{formatNumber(value)}</p>
            ) : null}
            <Dialog open={showDialog} onClose={handleCloseDialog}>
                <DialogTitle>Edit Item</DialogTitle>
                <DialogContent>
                    <TextField
                        autoFocus
                        margin="dense"
                        id="label"
                        label="Label"
                        type="text"
                        fullWidth
                        value={label}
                        onChange={(e) => setLabel(e.target.value)}
                    />
                    <FormControl fullWidth margin="dense">
                        <InputLabel id="type-label">Type</InputLabel>
                        <Select
                            labelId="type-label"
                            id="type"
                            value={type}
                            onChange={(e) => setType(e.target.value)}
                        >
                            <MenuItem value="string">String</MenuItem>
                            <MenuItem value="boolean">Boolean</MenuItem>
                            <MenuItem value="number">Number</MenuItem>
                        </Select>
                    </FormControl>
                    <TextField
                        margin="dense"
                        id="topic"
                        label="SmartDashboard Topic"
                        type="text"
                        fullWidth
                        value={topic}
                        onChange={(e) => setTopic(e.target.value)}
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

export default SmartDashboardItem;
