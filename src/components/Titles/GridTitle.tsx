import React, { useState, useEffect } from 'react';
import { Dialog, DialogTitle, DialogContent, DialogActions, Button, TextField } from '@mui/material';

interface GridTitleProps {
    componentId: string | number;
}

const GridTitleComponent: React.FC<GridTitleProps> = ({ componentId }) => {
    const [showDialog, setShowDialog] = useState(false);
    const [title, setTitle] = useState(`Example Title ${componentId}`);
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

    return (
        <div>
            <h1 onContextMenu={handleOpenDialog}>{title}</h1>
            <Dialog open={showDialog} onClose={handleCloseDialog}>
                <DialogTitle>Rename</DialogTitle>
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

export default GridTitleComponent;
