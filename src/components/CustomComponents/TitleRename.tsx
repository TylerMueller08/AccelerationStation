import React, { useState, useEffect } from 'react';
import { Dialog, DialogTitle, DialogContent, DialogActions, Button, TextField } from '@mui/material';

interface TitleRenameProps {
    componentId: string | number;
}

const TitleRenameComponent: React.FC<TitleRenameProps> = ({ componentId }) => {
    const getDefaultTitle = (id: string | number) => {
        switch (id) {
            case 1:
                return "Robot Information";
            case 2:
                return "Camera";
            case 4:
                return "Auto Selector";
            default:
                return `Example Title ${id}`;
        }
    };

    const [showDialog, setShowDialog] = useState(false);
    const [title, setTitle] = useState(getDefaultTitle(componentId));
    const [storedTitle, setStoredTitle] = useState("");

    useEffect(() => {
        const storedTitle = localStorage.getItem(`gridTitle_${componentId}`);
        if (storedTitle) {
            setTitle(storedTitle);
            setStoredTitle(storedTitle);
        }
    }, [componentId]);

    const handleOpenDialog = () => {
        setShowDialog(true);
    };

    const handleCloseDialog = () => {
        setShowDialog(false);
    };

    const handleSaveTitle = () => {
        localStorage.setItem(`gridTitle_${componentId}`, title);
        setStoredTitle(title);
        setShowDialog(false);
    };

    const handleTitleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setTitle(event.target.value);
    };

    const titleClass = componentId === 1 || componentId === 2 ? 'titleClass' : '';

    return (
        <div>
            <h1 className={titleClass} onContextMenu={handleOpenDialog}>{title}</h1>
            <Dialog open={showDialog} onClose={handleCloseDialog}>
                <DialogTitle>Rename Title</DialogTitle>
                <DialogContent>
                    <TextField
                        autoFocus
                        margin="dense"
                        id="newTitle"
                        label="New Title"
                        type="text"
                        fullWidth
                        value={title}
                        onChange={handleTitleChange}
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleCloseDialog} color="primary">
                        Cancel
                    </Button>
                    <Button onClick={handleSaveTitle} color="primary">
                        Save
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    );
};

export default TitleRenameComponent;