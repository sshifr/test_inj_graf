const {app, BrowserWindow} = require('electron');
const path = require('path');

const createWindow = () => {
    const win = new BrowserWindow({
        width: 800,
        height: 800,
        icon: path.join(__dirname, 'icon.png')
    })
    win.loadFile('src/index.html');
    win.setMenuBarVisibility(false);
    win.setTitle('Тестирование. Начертательная геометрия');
}

app.whenReady().then(() => createWindow());
app.on('window-all-closed', () => app.quit());