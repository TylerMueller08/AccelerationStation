const { ipcRenderer } = require('electron')
const ipc = ipcRenderer;
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
    const body = document.getElementsByTagName('body')[0];
    const main = document.getElementsByTagName('main')[0];
    if (!isLeftMenuActive) {
        body.classList.add('left-menu-active');
        main.style = 'filter: brightness(50%)'
        isLeftMenuActive = true;
    } else {
        body.classList.remove('left-menu-active');
        main.style = 'filter: brightness(100%)'
        isLeftMenuActive = false;
    }
})