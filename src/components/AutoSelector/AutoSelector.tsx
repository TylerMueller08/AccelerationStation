import React, { useState, useEffect } from "react";
import { NetworkTablesTypeInfos } from "ntcore-ts-client";
import { ntcore } from "../../ntcoreInstance";

const AutoSelectorComponent: React.FC = () => {
    const [ autoSelected, setAutoSelected ] = useState<string>(null);

    useEffect(() => {
        const autoSelectedTopic = ntcore.createTopic<string>("/SmartDashboard/AutoSelector", NetworkTablesTypeInfos.kString);
        autoSelectedTopic.publish();

        const checkConnectionStatus = () => {
            if (!ntcore.isRobotConnected()) {
                setAutoSelected(null);
            }
        }

        autoSelectedTopic.subscribe((value) => {
            setAutoSelected(value);
        }, true);

        const interval = setInterval(checkConnectionStatus, 1000);

        return() => {
            clearInterval(interval);
        }
    }, []);

    const handleSelectionChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        const newValue = event.target.value;
        setAutoSelected(newValue);
        const autoSelectedTopic = ntcore.createTopic<string>("/SmartDashboard/AutoSelector", NetworkTablesTypeInfos.kString);
        autoSelectedTopic.setValue(newValue);
    }

    return (
        <div>
            <select id="auto-selector" value={autoSelected} onChange={handleSelectionChange}>
                <option value="Center4Note">Center 4-Note</option>
                <option value="Center3NoteTop">Center 3-Note Top</option>
                <option value="Center3NoteBottom">Center 3-Note Bottom</option>
                <option value="Center2NoteMiddle">Center 2-Note Middle</option>
                <option value="Amp2NoteTop">Amp 2-Note Top</option>
                <option value="SourceFarBottom">Scource Far Bottom</option>
                <option value="SourceOut">Source Out</option>
                <option value="ScoreGriefer">Score, Griefer</option>
                <option value="Griefer">Griefer</option>
                <option value="ScoreNoMove">Score, No Move</option>
                <option value="DoNothing">Do Nothing</option>
            </select>
            <p>Deployed Auto: {autoSelected === null ? "N/A" : autoSelected}</p>
        </div>
    );
};

export default AutoSelectorComponent;