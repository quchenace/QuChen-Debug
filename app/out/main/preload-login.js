'use strict';
/** 登录窗的受限桥：只暴露门禁状态与登录动作，不暴露 Node。 */
const { contextBridge, ipcRenderer } = require('electron');

contextBridge.exposeInMainWorld('qc', {
  state: () => ipcRenderer.invoke('qc:gate-state'),
  login: (email, password) => ipcRenderer.invoke('qc:gate-login', { email, password }),
  sendCode: (email, purpose) => ipcRenderer.invoke('qc:gate-send-code', { email, purpose }),
  register: (email, code, password) => ipcRenderer.invoke('qc:gate-register', { email, code, password }),
  minimize: () => ipcRenderer.invoke('qc:gate-minimize'),
  close: () => ipcRenderer.invoke('qc:gate-close'),
});
