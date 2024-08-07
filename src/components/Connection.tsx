import React, { useState, useEffect, ChangeEvent } from "react";
import { ntcore, setConnectionByTeamNumber, setConnectionByURI } from "../ntcoreInstance";

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
    const [connectedURI, setConnectedURI] = useState<string>(ntcore.getURI());
    const [connectedPort, setConnectedPort] = useState<number>(ntcore.getPort());

    useEffect(() => {
        saveToLocalStorage('connectionType', connectionType);
        saveToLocalStorage('teamNumber', teamNumber);
        saveToLocalStorage('ipAddress', ipAddress);

    }, [connectionType, teamNumber, ipAddress]);

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

    useEffect(() => {
        const interval = setInterval(() => {
                setConnectedURI(ntcore.getURI());
                setConnectedPort(ntcore.getPort());
        }, 1000);

        return() => {
            clearInterval(interval);
        }
    }, []);

    return (
        <div>
            <h1 id="sidebarTitleText">Dashboard</h1>
            <h1 id="sidebarSubtext">Connection Settings</h1>
            <div className="button-group">
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
            <div className="centered-button">
                <button id="connectButton" onClick={handleConnect}>Connect</button>
            </div>
            <h1 id="sidebarInformationSubtitle">Information</h1>
            <p id="sidebarText"><span>Connected to Robot:</span><br/>{connectedURI}:{connectedPort}</p>
            <p id="sidebarText"><span>Camera Address:</span><br/>{localStorage.getItem('cameraIp')}</p>
            <p id="sidebarFooter">Created by<br/>4593 Rapid Acceleration</p>
        </div>
    )
};

export default ConnectionSettingsComponent;
