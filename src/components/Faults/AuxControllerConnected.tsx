import React, { useState, useEffect } from "react";
import { NetworkTablesTypeInfos } from "ntcore-ts-client";
import { ntcore } from "../../ntcoreInstance";

const AuxControllerConnectedComponent: React.FC = () => {
    const [auxControllerConnected, setAuxControllerConnected] = useState(null);

    useEffect(() => {
        const auxControllerConnectedTopic = ntcore.createTopic<boolean>("/SmartDashboard/AuxControllerConnected", NetworkTablesTypeInfos.kBoolean);

        auxControllerConnectedTopic.subscribe((value) => {
            setAuxControllerConnected(value);
        }, true);
    }, []);

    return (
        <div className={`fault-status ${auxControllerConnected === null ? 'unknown' : auxControllerConnected ? 'true' : 'false'}`}></div>
    );
}

export default AuxControllerConnectedComponent;