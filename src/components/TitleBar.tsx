import { useEffect, useState } from "react";
import { FaMinus, FaRegSquare } from "react-icons/fa";
import { VscChromeRestore } from "react-icons/vsc";
import { IoCloseOutline } from "react-icons/io5";

export const TitleBar = () => {
  const [isMaximized, setIsMaximized] = useState(false);

  useEffect(() => {
    // Check if electronAPI is available
    if (typeof window !== "undefined" && window.electronAPI) {
      // Check initial maximized state
      window.electronAPI.isMaximized().then(setIsMaximized);

      // Listen for maximize/unmaximize events
      window.electronAPI.onWindowMaximize(setIsMaximized);
    } else {
      console.warn(
        "electronAPI is not available. Make sure you're running in Electron."
      );
    }
  }, []);

  const handleMinimize = () => {
    try {
      if (window.electronAPI && window.electronAPI.minimizeWindow) {
        window.electronAPI.minimizeWindow();
      } else {
        console.error("electronAPI.minimizeWindow is not available");
      }
    } catch (error) {
      console.error("Error minimizing window:", error);
    }
  };

  const handleMaximize = () => {
    try {
      if (window.electronAPI && window.electronAPI.maximizeWindow) {
        window.electronAPI.maximizeWindow();
      } else {
        console.error("electronAPI.maximizeWindow is not available");
      }
    } catch (error) {
      console.error("Error maximizing window:", error);
    }
  };

  const handleClose = () => {
    try {
      if (window.electronAPI && window.electronAPI.closeWindow) {
        window.electronAPI.closeWindow();
      } else {
        console.error("electronAPI.closeWindow is not available");
      }
    } catch (error) {
      console.error("Error closing window:", error);
    }
  };

  return (
    <div className="h-8 bg-white border-b border-zinc-100 flex flex-row-reverse items-center justify-between select-none drag-region">
      {/* Window Controls */}
      <div className="flex items-center gap-1 no-drag">
        <button
          onClick={handleMinimize}
          className="w-10 h-8 flex items-center justify-center hover:bg-white/30 transition-colors text-zinc-900 hover:text-zinc-900 "
          title="Minimize"
        >
          <FaMinus className="w-3 h-3" />
        </button>
        <button
          onClick={handleMaximize}
          className="w-10 h-8 flex items-center justify-center hover:bg-white/30 transition-colors text-zinc-900 hover:text-zinc-900 "
          title={isMaximized ? "Restore" : "Maximize"}
        >
          {isMaximized ? (
            <VscChromeRestore className="size-4" />
          ) : (
            <FaRegSquare className="size-3" />
          )}
        </button>
        <button
          onClick={handleClose}
          className="w-10 h-8 flex items-center justify-center hover:bg-rose-400 transition-colors text-zinc-900 hover:text-white "
          title="Close"
        >
          <IoCloseOutline className="size-5" />
        </button>
      </div>
    </div>
  );
};
