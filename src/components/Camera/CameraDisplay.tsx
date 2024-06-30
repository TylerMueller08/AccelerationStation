import React, { useEffect, useState } from "react";
import { NetworkTablesTypeInfos } from "ntcore-ts-client";
import { ntcore } from "../../ntcoreInstance";

const CameraDisplayComponent: React.FC = () => {
    const [cameraUrl, setCameraUrl] = useState<string>(null);

    useEffect(() => {
        const cameraIPStreamTopic = ntcore.createTopic<string>("/SmartDashboard/CameraIPStream", NetworkTablesTypeInfos.kString);
        
        cameraIPStreamTopic.subscribe((value) => {
            setCameraUrl(value)
        }, true);
    }, []);

    return (
        <div id="camera"
            style={{
                backgroundImage: `url(${cameraUrl})`,
                backgroundSize: cameraUrl == "https://i.imgur.com/cVotd4I.png" ? '100px 100px' : '100% 100%',
                backgroundRepeat: 'no-repeat',
            }}
        ></div>
    );
};

export default CameraDisplayComponent;
