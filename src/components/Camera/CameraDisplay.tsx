import React, { useEffect, useState } from "react";
import '../../index.css';

const CameraDisplayComponent: React.FC = () => {
    const [cameraUrl, setCameraUrl] = useState<string | null>(null);

    useEffect(() => {
        // Simulate checking for a camera feed from PhotonVision
        const checkForCamera = async () => {
            // Assuming there's a function or API call to check for the camera feed
            // Replace the URL with the actual API endpoint or method to get the camera feed URL
            const cameraFeedUrl = 'http://79.120.134.229:8080/cam_1.cgi'; // Example camera URL

            // Mock condition for when the camera is detected
            if (cameraFeedUrl) {
                setCameraUrl(cameraFeedUrl);
            }
        };

        checkForCamera();
    }, []);

    return (
        <>
            <h1>Camera</h1>
            <div 
                id="camera" 
                style={{
                    backgroundImage: cameraUrl ? `url('${cameraUrl}')` : `url('images/icon-camera.png')`,
                    backgroundSize: cameraUrl ? 'cover' : '100px 100px'
                }}
            ></div>
        </>
    );
};

export default CameraDisplayComponent;
