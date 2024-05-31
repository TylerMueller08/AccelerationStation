import React from "react";

let isLeftMenuActive = false;

const ToggleMenuComponent: React.FC = () => {
    const handleToggleMenu = () => {
        const main = document.getElementsByClassName('main')[0] as HTMLElement;
        const sidebar = document.getElementsByClassName('sidebar')[0] as HTMLElement;
        const sidebarText = document.getElementById('sidebarText');
        const sidebarFooterText = document.getElementById('sidebarFooter');
        const sidebarSubText = document.getElementById('sidebarSubText');
        const connectionButtonTeam = document.getElementsByClassName('team')[0] as HTMLElement;
        const connectionButtonDev = document.getElementsByClassName('dev')[0] as HTMLElement;
        const connectionLabel = document.getElementById('connectionLabel');
        if (!isLeftMenuActive) {
            sidebar.setAttribute("style", "width: 430px; visibility: visible;");
            main.setAttribute("style", "filter: blur(2px);");
            sidebarText.setAttribute("style", "transform: translateX(350px); transition: 1s");
            sidebarFooterText.setAttribute("style", "transform: translateX(350px); transition: 1s");
            sidebarSubText.setAttribute("style", "transform: translateX(420px); transition: 0.9s");
            connectionButtonTeam.setAttribute("style", "transform: translateX(400px); transition: 1s");
            connectionButtonDev.setAttribute("style", "transform: translateX(575px); transition: 1s");
            connectionLabel.setAttribute("style", "transform: translateX(400px); transition: 1s");
            isLeftMenuActive = true;
        } else {
            sidebar.setAttribute("style", "width: 0; visibility: hidden;");
            main.setAttribute("style", "filter: blur(0);");
            sidebarText.setAttribute("style", "transform: translateX(-350px); transition: 1.5s");
            sidebarFooterText.setAttribute("style", "transform: translateX(-350px); transition: 1.5s");
            sidebarSubText.setAttribute("style", "transform: translateX(-420px); transition: 1.25s");
            connectionButtonTeam.setAttribute("style", "transform: translateX(-400px); transition: 1.1s");
            connectionButtonDev.setAttribute("style", "transform: translateX(-575px); transition: 1.5s");
            connectionLabel.setAttribute("style", "transform: translateX(-400px); transition: 1.25s");
            isLeftMenuActive = false;
        }
    };

    return (
        <button id="showHidenMenu" className="toggleButton" onClick={handleToggleMenu}></button>
    );
};

export default ToggleMenuComponent;