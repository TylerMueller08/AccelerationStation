import React, { useState, useEffect } from "react";
import { Dialog, DialogTitle, DialogContent, DialogActions, Button, TextField, IconButton, List, ListItem, ListItemText, ListItemSecondaryAction } from "@mui/material";
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import { NetworkTablesTypeInfos } from "ntcore-ts-client";
import { ntcore } from "../../ntcoreInstance";

interface AutoOption {
    name: string;
    value: string;
}

const AutoSelectorComponent: React.FC = () => {
    const [autoSelected, setAutoSelected] = useState<string>(null);
    const [autoOptions, setAutoOptions] = useState<AutoOption[]>([
        { name: "Example Auto 1", value: "ExampleAuto1" },
        { name: "Example Auto 2", value: "ExampleAuto2" },
        { name: "Example Auto 3", value: "ExampleAuto3" }
    ]);
    const [showDialog, setShowDialog] = useState(false);
    const [editIndex, setEditIndex] = useState<number | null>(null);
    const [editName, setEditName] = useState<string>("");
    const [editValue, setEditValue] = useState<string>("");

    useEffect(() => {
        const autoSelectedTopic = ntcore.createTopic<string>("/SmartDashboard/AutoSelector", NetworkTablesTypeInfos.kString);

        autoSelectedTopic.publish();
        autoSelectedTopic.subscribe((value) => {
            setAutoSelected(value);
        }, true);

        const interval = setInterval(() => {
            if (!ntcore.isRobotConnected()) {
                setAutoSelected(null);
            } else {
                autoSelectedTopic.resubscribeAll(ntcore.client);
            }
        }, 1000);

        return () => {
            clearInterval(interval);
        };
    }, []);

    const handleSelectionChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        const newValue = event.target.value;
        setAutoSelected(newValue);
        const autoSelectedTopic = ntcore.createTopic<string>("/SmartDashboard/AutoSelector", NetworkTablesTypeInfos.kString);
        autoSelectedTopic.setValue(newValue);
    };

    const handleOpenDialog = () => {
        setShowDialog(true);
    };

    const handleCloseDialog = () => {
        setShowDialog(false);
        setEditIndex(null);
        setEditName("");
        setEditValue("");
    };

    const handleSave = () => {
        if (editName.trim() && editValue.trim()) {
            if (editIndex === null) {
                setAutoOptions([...autoOptions, { name: editName, value: editValue }]);
            } else {
                const updatedOptions = autoOptions.map((option, index) =>
                    index === editIndex ? { name: editName, value: editValue } : option
                );
                setAutoOptions(updatedOptions);
            }
            handleCloseDialog();
        }
    };

    const handleEdit = (index: number) => {
        setEditIndex(index);
        setEditName(autoOptions[index].name);
        setEditValue(autoOptions[index].value);
        handleOpenDialog();
    };

    const handleDelete = (index: number) => {
        setAutoOptions(autoOptions.filter((_, i) => i !== index));
    };

    const handleAddNew = () => {
        setEditIndex(null);
        setEditName("");
        setEditValue("");
        handleOpenDialog();
    };

    return (
        <div>
            <p>Select an Autonomous</p>
            <select id="auto-selector" value={autoSelected} onChange={handleSelectionChange} onContextMenu={handleOpenDialog}>
                {autoOptions.map((option, index) => (
                    <option key={index} value={option.value}>
                        {option.name}
                    </option>
                ))}
            </select>
            <p>Deployed Auto: {autoSelected == null ? "N/A" : autoSelected}</p>
            <Dialog open={showDialog} onClose={handleCloseDialog} maxWidth="sm" fullWidth>
                <DialogTitle>Manage Autos</DialogTitle>
                <DialogContent>
                    <List>
                        {autoOptions.map((option, index) => (
                            <ListItem key={index}>
                                <ListItemText primary={option.name} secondary={option.value} />
                                <ListItemSecondaryAction>
                                    <IconButton edge="end" aria-label="edit" onClick={() => handleEdit(index)}>
                                        <EditIcon />
                                    </IconButton>
                                    <IconButton edge="end" aria-label="delete" onClick={() => handleDelete(index)}>
                                        <DeleteIcon />
                                    </IconButton>
                                </ListItemSecondaryAction>
                            </ListItem>
                        ))}
                    </List>
                    <Button onClick={handleAddNew} color="primary">Add New Auto</Button>
                </DialogContent>
            </Dialog>
            <Dialog open={editName !== "" || editValue !== ""} onClose={handleCloseDialog}>
                <DialogTitle>{editIndex === null ? "Add Auto" : "Edit Auto"}</DialogTitle>
                <DialogContent>
                    <TextField
                        autoFocus
                        margin="dense"
                        id="name"
                        label="Auto Name"
                        type="text"
                        fullWidth
                        value={editName}
                        onChange={(e) => setEditName(e.target.value)}
                    />
                    <TextField
                        margin="dense"
                        id="value"
                        label="Auto Value"
                        type="text"
                        fullWidth
                        value={editValue}
                        onChange={(e) => setEditValue(e.target.value)}
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
        </div>
    );
};

export default AutoSelectorComponent;
