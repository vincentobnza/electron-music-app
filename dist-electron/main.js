import { app, BrowserWindow, Menu, ipcMain } from "electron";
import path from "path";
import { fileURLToPath } from "url";
import { dirname } from "path";
// Get __dirname in a way that works with both ESM and CommonJS
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
let mainWindow = null;
let ipcHandlersSetup = false;
// Register IPC handlers once, before creating the window
function setupIpcHandlers() {
    // Prevent duplicate registration
    if (ipcHandlersSetup) {
        return;
    }
    ipcHandlersSetup = true;
    // Handle window controls
    ipcMain.on("window-minimize", () => {
        console.log("Received window-minimize IPC");
        if (mainWindow) {
            mainWindow.minimize();
        }
    });
    ipcMain.on("window-maximize", () => {
        console.log("Received window-maximize IPC");
        if (mainWindow) {
            if (mainWindow.isMaximized()) {
                mainWindow.unmaximize();
            }
            else {
                mainWindow.maximize();
            }
        }
    });
    ipcMain.on("window-close", () => {
        console.log("Received window-close IPC");
        if (mainWindow) {
            mainWindow.close();
        }
    });
    ipcMain.handle("window-is-maximized", () => {
        return mainWindow ? mainWindow.isMaximized() : false;
    });
    console.log("IPC handlers registered");
}
function createWindow() {
    // Remove the application menu
    Menu.setApplicationMenu(null);
    const preloadPath = path.join(__dirname, "preload.js");
    console.log("Preload script path:", preloadPath);
    mainWindow = new BrowserWindow({
        width: 1400,
        height: 900,
        minWidth: 1000,
        minHeight: 600,
        frame: false, // Remove default frame for fully custom title bar
        backgroundColor: "#F7F7F7",
        webPreferences: {
            preload: preloadPath,
            nodeIntegration: false,
            contextIsolation: true,
        },
    });
    // Log when preload is loaded
    mainWindow.webContents.on("did-finish-load", () => {
        console.log("Window finished loading");
    });
    // In development mode
    if (!app.isPackaged && process.env.VITE_DEV_SERVER_URL) {
        mainWindow.loadURL(process.env.VITE_DEV_SERVER_URL);
        mainWindow.webContents.openDevTools();
    }
    // In development without env variable
    else if (!app.isPackaged) {
        mainWindow.loadURL("http://localhost:5173");
        mainWindow.webContents.openDevTools();
    }
    // In production
    else {
        mainWindow.loadFile(path.join(__dirname, "../dist/index.html"));
    }
    mainWindow.on("closed", () => {
        mainWindow = null;
    });
    // Emit maximize/unmaximize events
    mainWindow.on("maximize", () => {
        mainWindow?.webContents.send("window-maximized");
    });
    mainWindow.on("unmaximize", () => {
        mainWindow?.webContents.send("window-unmaximized");
    });
}
// Setup IPC handlers before app is ready
setupIpcHandlers();
app.whenReady().then(createWindow);
app.on("window-all-closed", () => {
    if (process.platform !== "darwin") {
        app.quit();
    }
});
app.on("activate", () => {
    if (BrowserWindow.getAllWindows().length === 0) {
        createWindow();
    }
});
