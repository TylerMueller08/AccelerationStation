import React from "react";

const ipcRenderer = window.require('electron').ipcRenderer;

const CloseButtonComponent: React.FC = () => {
    const handleCloseApp = () => {
        ipcRenderer.send('closeApp')
    };

    return (
        <button id="closeButton" className="navigationButton closeButton" onClick={handleCloseApp}></button>
    );
};

export default CloseButtonComponent;