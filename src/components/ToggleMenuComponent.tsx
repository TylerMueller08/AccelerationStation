import React from "react";

let isLeftMenuActive = false;

const ToggleMenuComponent: React.FC = () => {
    const handleToggleMenu = () => {
        const main = document.getElementsByClassName('main')[0] as HTMLElement;
        const sidebar = document.getElementsByClassName('sidebar')[0] as HTMLElement;
        const sidebarText = document.getElementById('sidebarText');
        if (!isLeftMenuActive) {
            sidebar.setAttribute("style", "width: 430px; visibility: visible;");
            main.setAttribute("style", "filter: blur(2px);");
            sidebarText.setAttribute("style", "transform: translateX(350px); transition: 1s");
            isLeftMenuActive = true;
        } else {
            sidebar.setAttribute("style", "width: 0; visibility: hidden;");
            main.setAttribute("style", "filter: blur(0);");
            sidebarText.setAttribute("style", "transform: translateX(-350px); transition: 1s");
            isLeftMenuActive = false;
        }
    };

    return (
        <button id="showHidenMenu" className="toggleButton" onClick={handleToggleMenu}></button>
    );
};

export default ToggleMenuComponent;