import React, { useState, useEffect, ChangeEvent } from "react";
import { NetworkTables } from "ntcore-ts-client";

// Function to save to localStorage
const saveToLocalStorage = (key: string, value: any) => {
    localStorage.setItem(key, JSON.stringify(value));
};

// Function to get from localStorage
const getFromLocalStorage = (key: string, defaultValue: any) => {
    const saved = localStorage.getItem(key);
    if (saved !== null) {
        return JSON.parse(saved);
    }
    return defaultValue;
};

// Component
const ConnectionSettingsComponent: React.FC = () => {
    const [connectionType, setConnectionType] = useState<string>(getFromLocalStorage('connectionType', 'teamNumber'));
    const [teamNumber, setTeamNumber] = useState<string>(getFromLocalStorage('teamNumber', '4593'));
    const [ipAddress, setIpAddress] = useState<string>(getFromLocalStorage('ipAddress', '127.0.0.1'));
    const [ntcore, setNtcore] = useState<any>(null);

    useEffect(() => {
        // Save settings to localStorage
        saveToLocalStorage('connectionType', connectionType);
        saveToLocalStorage('teamNumber', teamNumber);
        saveToLocalStorage('ipAddress', ipAddress);

        // Update ntcore instance based on the connection type
        if (connectionType === 'teamNumber') {
            // setNtcore(NetworkTables.getInstanceByTeam(Number(teamNumber)));
        } else if (connectionType === 'development') {
            // setNtcore(NetworkTables.getInstanceByURI(ipAddress));
        }
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

    return (
        <div>
            <h1 id="sidebarSubText">Connection Settings</h1>
            <div>
                <button id="connectionButton" className="team" onClick={() => handleConnectionTypeChange('teamNumber')}>Team Number</button>
                <button id="connectionButton" className="dev" onClick={() => handleConnectionTypeChange('development')}>Development</button>
            </div>
            <div>
                {connectionType === 'teamNumber' && (
                    <div>
                        <label id="connectionLabel">
                            Team Number:
                            <input
                                id = "connectionInput"
                                type="text"
                                value={teamNumber}
                                onChange={handleTeamNumberChange}
                            />
                        </label>
                    </div>
                )}
                {connectionType === 'development' && (
                    <div>
                        <label id="connectionLabel">
                            IP Address:
                            <input
                                id = "connectionInput"
                                type="text"
                                value={ipAddress}
                                onChange={handleIpAddressChange}
                            />
                        </label>
                    </div>
                )}
            </div>
        </div>
    );
};

export default ConnectionSettingsComponent;