// Type definitions for Electron API exposed via preload
export interface IElectronAPI {
  ping: () => string;
  minimizeWindow: () => void;
  maximizeWindow: () => void;
  closeWindow: () => void;
  isMaximized: () => Promise<boolean>;
  onWindowMaximize: (callback: (isMaximized: boolean) => void) => void;
}

declare global {
  interface Window {
    electronAPI: IElectronAPI;
  }
}
