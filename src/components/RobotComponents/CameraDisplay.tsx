import React, { useEffect, useState } from "react";
import { ntcore } from "../../ntcoreInstance";
import { Button, Dialog, DialogActions, DialogContent, DialogTitle, TextField } from "@mui/material";

const CameraDisplayComponent: React.FC = () => {
    const [cameraUrl, setCameraUrl] = useState<string>(null);
    const [showDialog, setShowDialog] = useState(false);
    const [storedCamera, setStoredCamera] = useState("");

    useEffect(() => {
        const storedCamera = localStorage.getItem('cameraIp');
        if (storedCamera) {
            setCameraUrl(storedCamera);
            setStoredCamera(storedCamera);
        }

        const interval = setInterval(() => {
            if (!ntcore.isRobotConnected()) {
                setCameraUrl(null);
            } else {
                if (ntcore.getURI() == "127.0.0.1") {
                    setCameraUrl('https://i.imgur.com/hEAVye5.png');
                }
            }
        }, 1000);

        return() => {
            clearInterval(interval);
        }
    }, []);

    const handleOpenDialog = () => {
        setShowDialog(true);
    };

    const handleCloseDialog = () => {
        setShowDialog(false);
    };

    const handleSaveCamera = () => {
        localStorage.setItem('cameraIp', cameraUrl);
        setStoredCamera(cameraUrl);
        setShowDialog(false);
    };

    const handleCameraChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setCameraUrl(event.target.value);
    };
    
    return (
        <>
            <div onContextMenu={handleOpenDialog} id="camera"
                style={{
                    backgroundImage: cameraUrl == null ? 'url(https://i.imgur.com/cVotd4I.png)' : `url(${cameraUrl})`,
                    backgroundSize: cameraUrl == null ? '100px 100px' : '100% 100%',
                    backgroundRepeat: 'no-repeat',
                }}
            ></div>
            <Dialog open={showDialog} onClose={handleCloseDialog}>
                <DialogTitle>Edit Stream Channel</DialogTitle>
                <DialogContent>
                    <TextField
                        autoFocus
                        margin="dense"
                        label="Camera IP"
                        type="text"
                        fullWidth
                        value={cameraUrl}
                        onChange={handleCameraChange}
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleCloseDialog} color="primary">
                        Cancel
                    </Button>
                    <Button onClick={handleSaveCamera} color="primary">
                        Save
                    </Button>
                </DialogActions>
            </Dialog>
        </>
    );
};

export default CameraDisplayComponent;
