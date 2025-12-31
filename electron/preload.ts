import { contextBridge, ipcRenderer } from "electron";

console.log("Preload script loaded");

// Expose protected methods that allow the renderer process to use
// the ipcRenderer without exposing the entire object
contextBridge.exposeInMainWorld("electronAPI", {
  // Window controls
  minimizeWindow: () => {
    console.log("minimizeWindow called");
    ipcRenderer.send("window-minimize");
  },
  maximizeWindow: () => {
    console.log("maximizeWindow called");
    ipcRenderer.send("window-maximize");
  },
  closeWindow: () => {
    console.log("closeWindow called");
    ipcRenderer.send("window-close");
  },
  isMaximized: () => ipcRenderer.invoke("window-is-maximized"),

  // Listen for maximize/unmaximize events
  onWindowMaximize: (callback: (isMaximized: boolean) => void) => {
    ipcRenderer.on("window-maximized", () => callback(true));
    ipcRenderer.on("window-unmaximized", () => callback(false));
  },
});

console.log("electronAPI exposed to window");
