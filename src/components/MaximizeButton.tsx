import React from "react";

const ipcRenderer = window.require('electron').ipcRenderer;

const MaximizeButtonComponent: React.FC = () => {
    const handleMaximizeApp = () => {
        ipcRenderer.send('maximizeApp')
    };

    return (
        <button id="maximizeButton" className="navigationButton maximizeButton" onClick={handleMaximizeApp}></button>
    );
};

export default MaximizeButtonComponent;