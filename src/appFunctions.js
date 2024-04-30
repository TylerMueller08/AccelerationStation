const { ipcRenderer } = require('electron')
const sidebar = document.getElementById('sidebar');
const ipc = ipcRenderer
var isLeftMenuActive = false;

// Close Application
closeButton.addEventListener('click', () => {
    ipc.send('closeApp')
})

// Minimize Application
minimizeButton.addEventListener('click', () => {
    ipc.send('minimizeApp')
})

// Maximize Application
maximizeButton.addEventListener('click', () => {
    ipc.send('maximizeApp')
})

// Toggle Menu
showHidenMenu.addEventListener('click', () =>  {
    if (!isLeftMenuActive) {
        sidebar.style.width = '280px';
        sidebar.style.visibility = "visible";
        isLeftMenuActive = true;
    } else {
        sidebar.style.width = '0px';
        sidebar.style.visibility = "hidden";
        isLeftMenuActive = false;
    }
})

ipcRenderer.on('start-animation', () => {
    sidebar.style.width = '0px';
    sidebar.style.visibility = "hidden";

    const loader = document.getElementsByClassName('loader-wrapper')[0];
    loader.style.transition = 'opacity 1.25s ease-in';
    loader.style.opacity = '0';

    loader.addEventListener('transitionend', () => {
        loader.remove();
    })
});