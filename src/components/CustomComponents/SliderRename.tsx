import React, { useState, useEffect } from 'react';
import { Dialog, DialogTitle, DialogContent, DialogActions, Button, TextField } from '@mui/material';

interface SliderRenameProps {
    componentId: string | number;
}

const SliderRenameComponent: React.FC<SliderRenameProps> = ({ componentId }) => {
    const [showDialog, setShowDialog] = useState(false);
    const [title, setTitle] = useState(`Example Slider ${componentId}`);
    const [storedTitle, setStoredTitle] = useState("");

    useEffect(() => {
        const storedName = localStorage.getItem(`sliderName_${componentId}`);
        if (storedName) {
            setTitle(storedName);
            setStoredTitle(storedName);
        }
    }, [componentId]);

    const handleOpenDialog = (event: React.MouseEvent<HTMLParagraphElement>) => {
        // event.preventDefault(); // Prevent default right-click context menu
        setShowDialog(true);
    };

    const handleCloseDialog = () => {
        setShowDialog(false);
    };

    const handleSaveName = () => {
        localStorage.setItem(`sliderName_${componentId}`, title);
        setStoredTitle(title);
        setShowDialog(false);
    };

    const handleNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setTitle(event.target.value);
    };

    return (
        <>
            <p className="switch-name" onContextMenu={handleOpenDialog}>{title}</p>
            <Dialog open={showDialog} onClose={handleCloseDialog}>
                <DialogTitle>Rename Slider</DialogTitle>
                <DialogContent>
                    <TextField
                        autoFocus
                        margin="dense"
                        id="newSliderName"
                        label="New Name"
                        type="text"
                        fullWidth
                        value={title}
                        onChange={handleNameChange}
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleCloseDialog} color="primary">
                        Cancel
                    </Button>
                    <Button onClick={handleSaveName} color="primary">
                        Save
                    </Button>
                </DialogActions>
            </Dialog>
        </>
    );
};

export default SliderRenameComponent;
