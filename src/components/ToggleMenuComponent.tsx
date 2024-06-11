import React from "react";

let isLeftMenuActive = false;

const ToggleMenuComponent: React.FC = () => {
    const handleToggleMenu = () => {
        const main = document.getElementsByClassName('main')[0] as HTMLElement;
        const sidebar = document.getElementsByClassName('sidebar')[0] as HTMLElement;
        if (!isLeftMenuActive) {
            sidebar.classList.add('visible');
            sidebar.setAttribute("style", "width: 430px; visibility: visible;");
            main.setAttribute("style", "filter: blur(2px);");
            isLeftMenuActive = true;
        } else {
            sidebar.classList.remove('visible');
            sidebar.setAttribute("style", "width: 0; visibility: hidden;");
            main.setAttribute("style", "filter: blur(0);");
            isLeftMenuActive = false;
        }
    };

    return (
        <button id="showHidenMenu" className="toggleButton" onClick={handleToggleMenu}></button>
    );
};

export default ToggleMenuComponent;
