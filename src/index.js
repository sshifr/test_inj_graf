const { app, BrowserWindow } = require('electron');
const path = require('path');

const createWindow = () => {
    const win = new BrowserWindow({
        width: 800, // Минимальные размеры окна при загрузке
        height: 600,
        icon: path.join(__dirname, 'icon.png'),
        fullscreen: false, // Отключает полноэкранный режим
        frame: true, // Включает рамку окна
    });
    win.loadFile('src/index.html');
    win.setMenuBarVisibility(false);
    win.setTitle('Тестирование. Начертательная геометрия');
    win.maximize(); // Разворачивает окно на весь экран
};

app.whenReady().then(() => createWindow());
app.on('window-all-closed', () => app.quit());
