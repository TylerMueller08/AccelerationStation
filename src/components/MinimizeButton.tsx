import React from "react";

const ipcRenderer = window.require('electron').ipcRenderer;

const MinimizeButtonComponent: React.FC = () => {
    const handleMinimizeApp = () => {
        ipcRenderer.send('minimizeApp')
    };

    return (
        <button id="minimizeButton" className="navigationButton minimizeButton" onClick={handleMinimizeApp}></button>
    );
};

export default MinimizeButtonComponent;