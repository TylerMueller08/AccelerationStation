import React, { useEffect, useState } from "react";
import { ntcore, photonvisionStream } from "../../ntcoreInstance";

const CameraDisplayComponent: React.FC = () => {
    const [cameraUrl, setCameraUrl] = useState<string>(null);

    useEffect(() => {
        const checkConnectionStatus = () => {
            if (!ntcore.isRobotConnected()) {
                setCameraUrl(null);
            } else {
                setCameraUrl(photonvisionStream);
            }
        };

        const interval = setInterval(checkConnectionStatus, 1000);

        return() => {
            clearInterval(interval);
        }
    }, []);

    return (
        <div id="camera"
            style={{
                backgroundImage: cameraUrl === null ? `url('https://i.imgur.com/cVotd4I.png')` : `url('${cameraUrl}')`,
                backgroundSize: cameraUrl === null ? '100px 100px' : '100% 100%',
                backgroundRepeat: 'no-repeat',
            }}
        ></div>
    );
};

export default CameraDisplayComponent;
