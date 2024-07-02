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

        const interval = setInterval(() => {
            if (!ntcore.isRobotConnected()) {
                setCameraUrl(null);
            } else {
                cameraIPStreamTopic.resubscribeAll(ntcore.client)
            }
        })
    }, []);

    return (
        <div id="camera"
            style={{
                backgroundImage: cameraUrl == null ? 'url(https://i.imgur.com/cVotd4I.png)' : `url(${cameraUrl})`,
                backgroundSize: cameraUrl == null ? '100px 100px' : '100% 100%',
                backgroundRepeat: 'no-repeat',
            }}
        ></div>
    );
};

export default CameraDisplayComponent;
