// Handle creating/removing shortcuts on Windows when installing/uninstalling.
export const handleSquirrelStartup = () => {
  return !!require('electron-squirrel-startup');
};
