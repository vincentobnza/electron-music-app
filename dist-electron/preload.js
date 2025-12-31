"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const electron_1 = require("electron");
console.log("Preload script loaded");
// Expose protected methods that allow the renderer process to use
// the ipcRenderer without exposing the entire object
electron_1.contextBridge.exposeInMainWorld("electronAPI", {
    // Window controls
    minimizeWindow: () => {
        console.log("minimizeWindow called");
        electron_1.ipcRenderer.send("window-minimize");
    },
    maximizeWindow: () => {
        console.log("maximizeWindow called");
        electron_1.ipcRenderer.send("window-maximize");
    },
    closeWindow: () => {
        console.log("closeWindow called");
        electron_1.ipcRenderer.send("window-close");
    },
    isMaximized: () => electron_1.ipcRenderer.invoke("window-is-maximized"),
    // Listen for maximize/unmaximize events
    onWindowMaximize: (callback) => {
        electron_1.ipcRenderer.on("window-maximized", () => callback(true));
        electron_1.ipcRenderer.on("window-unmaximized", () => callback(false));
    },
});
console.log("electronAPI exposed to window");
