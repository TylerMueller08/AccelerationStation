import React, { useState, useEffect, ChangeEvent } from "react";
import { ntcore, setConnectionByTeamNumber, setConnectionByURI } from "../ntcoreInstance";
import { NetworkTablesTypeInfos } from "ntcore-ts-client";

const saveToLocalStorage = (key: string, value: any) => {
    localStorage.setItem(key, JSON.stringify(value));
};

const getFromLocalStorage = (key: string, defaultValue: any) => {
    const saved = localStorage.getItem(key);
    if (saved !== null) {
        return JSON.parse(saved);
    }
    return defaultValue;
};

const ConnectionSettingsComponent: React.FC = () => {
    const [connectionType, setConnectionType] = useState<string>(getFromLocalStorage('connectionType', 'teamNumber'));
    const [teamNumber, setTeamNumber] = useState<string>(getFromLocalStorage('teamNumber', '4593'));
    const [ipAddress, setIpAddress] = useState<string>(getFromLocalStorage('ipAddress', '127.0.0.1'));
    const [cameraIp, setCameraIp] = useState<string>(getFromLocalStorage('cameraIp', 'https://i.imgur.com/cVotd4I.png'));

    useEffect(() => {
        saveToLocalStorage('connectionType', connectionType);
        saveToLocalStorage('teamNumber', teamNumber);
        saveToLocalStorage('ipAddress', ipAddress);
        saveToLocalStorage('cameraIp', cameraIp)

    }, [connectionType, teamNumber, ipAddress, cameraIp]);

    const handleConnectionTypeChange = (type: string) => {
        setConnectionType(type);
    };

    const handleTeamNumberChange = (event: ChangeEvent<HTMLInputElement>) => {
        setTeamNumber(event.target.value);
    };

    const handleIpAddressChange = (event: ChangeEvent<HTMLInputElement>) => {
        setIpAddress(event.target.value);
    };

    const handleConnect = () => {
        if (connectionType === 'teamNumber') {
            setConnectionByTeamNumber(Number(teamNumber));
        } else if (connectionType === 'development') {
            setConnectionByURI(ipAddress);
        }
    };

    const cameraIPStreamTopic = ntcore.createTopic<string>("/SmartDashboard/CameraIPStream", NetworkTablesTypeInfos.kString);
    cameraIPStreamTopic.publish();

    const handleCameraIpChange = (event: ChangeEvent<HTMLInputElement>) => {
        if (connectionType == 'teamNumber') {
            cameraIPStreamTopic.setValue(event.target.value);
        }
    };

    useEffect(() => {
        const interval = setInterval(() => {
            if (ntcore.isRobotConnected()) {
                if (connectionType == 'development') {
                    cameraIPStreamTopic.setValue('https://i.imgur.com/hEAVye5.png');
                }
            }
        }, 1000);

        return() => {
            clearInterval(interval);
        }
    }, []);

    return (
        <div>
            <h1 id="sidebarTitleText">Dashboard</h1>
            <h1 id="sidebarSubtext">Connection Settings</h1>
            <div>
                <button id="connectionButton" className="team" onClick={() => handleConnectionTypeChange('teamNumber')}>Team Number</button>
                <button id="connectionButton" className="dev" onClick={() => handleConnectionTypeChange('development')}>Development</button>
            </div>
            <div>
                {connectionType === 'teamNumber' && (
                    <div id="connectionLabel">
                        <label>
                            Team Number:
                            <input
                                id="connectionInput"
                                type="text"
                                value={teamNumber}
                                onChange={handleTeamNumberChange}
                            />
                        </label>
                    </div>
                )}
                {connectionType === 'development' && (
                    <div id="connectionLabel">
                        <label>
                            IP Address:
                            <input
                                id="connectionInput"
                                type="text"
                                value={ipAddress}
                                onChange={handleIpAddressChange}
                            />
                        </label>
                    </div>
                )}
            </div>
            <button id="connectButton" onClick={handleConnect}>Connect</button>

            {connectionType === 'teamNumber' && (
                <div id="connectionLabel" className="cameraIP">
                    <label>
                        Camera IP:<br/>
                        <input
                            id="cameraIpInput"
                            type="text"
                            onChange={handleCameraIpChange}
                        />
                    </label>
                </div>
            )}
        </div>
    );
};

export default ConnectionSettingsComponent;
