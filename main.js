/*
 * @Description: 主进程
 * @Author: changhong.wang
 * @Date: 2021-10-12 15:04:29
 * @LastEditors: changhong.wang
 * @LastEditTime: 2021-10-13 19:06:26
 */
import { TIMER_TYPE } from './types';

const { app, BrowserWindow, Notification, ipcMain } = require('electron');
const path = require('path');

app.on('ready', () => {
    const win = new BrowserWindow({
        width: 900,
        height: 300,
        webPreferences: {
            nodeIntegration: true,
            contextIsolation: false
        }
    });
    win.loadFile('./index.html');
    handleIPC();
})

function handleIPC() {
    ipcMain.handle('work-notification', async (type) => {
        let res = await new Promise((resolve, reject) => {
            let notification = new Notification({
                title: '任务结束',
                body: '是否开始休息？',
                actions: [{
                    text: '开始休息',
                    type: 'button'
                }],
                closeButtonText: '继续工作'
            })
            notification.show();
            notification.on('action', () => {
                resolve('rest');
            })
            notification.on('close', () => {
                resolve('work'); 
            })
        })
        return res;
    });
}