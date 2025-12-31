const { contextBridge, ipcRenderer } = require("electron");

contextBridge.exposeInMainWorld("mu", {
 showProcessWindow: (id) => ipcRenderer.invoke("process-window-show", { id }),
 hideProcessWindow: (id) => ipcRenderer.invoke("process-window-hide", { id }),
 showAllProcessWindows: () => ipcRenderer.invoke("process-window-show-all"),

  // events
  onProcessExited: (cb) => {
    const listener = (_evt, payload) => cb(payload);
    ipcRenderer.on("process-exited", listener);
    return () => ipcRenderer.removeListener("process-exited", listener);
  },

  // Métricas - evento de atualização automática
  onMetricsUpdate: (cb) => {
    const listener = (_evt, payload) => cb(payload);
    ipcRenderer.on("metrics-update", listener);
    return () => ipcRenderer.removeListener("metrics-update", listener);
  },

 pickExecutables: () => ipcRenderer.invoke("pick-executables"),
 loadProcesses: () => ipcRenderer.invoke("load-processes"),
 saveProcesses: (list) => ipcRenderer.invoke("save-processes", list),
 startProcess: (payload) => ipcRenderer.invoke("process-start", payload),
 restartProcess: (payload) => ipcRenderer.invoke("process-restart", payload),
 stopProcess: (id) => ipcRenderer.invoke("process-stop", { id }),
 
 // Auto Click OK (MUDevs dialogs)
 autoClickOK: (payload) => ipcRenderer.invoke("auto-click-ok", payload),
 
 // SQL Backup
 selectBackupFolder: () => ipcRenderer.invoke("select-backup-folder"),
 sqlSaveConfig: (config) => ipcRenderer.invoke("sql-save-config", config),
 sqlLoadConfig: () => ipcRenderer.invoke("sql-load-config"),
 sqlConnect: (credentials) => ipcRenderer.invoke("sql-connect", credentials),
 sqlListDatabases: (params) => ipcRenderer.invoke("sql-list-databases", params),
 sqlBackup: (params) => ipcRenderer.invoke("sql-backup", params),

 // Métricas
 getMetrics: () => ipcRenderer.invoke("get-metrics"),

 // Logs
 writeLog: (type, message) => ipcRenderer.invoke("write-log", { type, message }),
});

// Controles de janela
contextBridge.exposeInMainWorld("electronAPI", {
  minimizeWindow: () => ipcRenderer.send("window-minimize"),
  maximizeWindow: () => ipcRenderer.send("window-maximize"),
  toggleMaximizeWindow: () => ipcRenderer.send("window-toggle-maximize"),
  closeWindow: () => ipcRenderer.send("window-close"),
});
