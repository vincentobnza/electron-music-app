/**
 * Custom React hooks
 *
 * Example:
 * export const useElectron = () => {
 *   return window.electronAPI;
 * };
 */

export const useElectron = () => {
  if (typeof window !== "undefined" && window.electronAPI) {
    return window.electronAPI;
  }
  return null;
};
