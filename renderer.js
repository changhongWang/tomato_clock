/*
 * @Description: 
 * @Author: changhong.wang
 * @Date: 2021-10-12 13:50:37
 * @LastEditors: changhong.wang
 * @LastEditTime: 2021-10-13 19:06:20
 */
import { TIMER_TYPE } from './types';
const { ipcRenderer } = require('electron');
const Timer = require('timer.js');

function startWork() {
    let workTimer = new Timer({
        ontick: (ms) => {
            updateTime(ms, TIMER_TYPE.WORK)
        },
        onend: () => {
            notification()
        }
    });
    workTimer.start(10);
}

function startRest() {
    let restTimer = new Timer({
        ontick: (ms) => {
            updateTime(ms, TIMER_TYPE.REST)
        },
        onend: () => {
            // 提示开始工作
            notification()
        }
    });
    workTimer.start(5);
}

function updateTime(ms, type) {
    const second = Math.ceil(ms / 1000);
    let timerContainer = document.getElementById('timer-container');
    timerContainer.innerText = type === TIMER_TYPE.REST ? `${second}秒后开始工作` : `${second}秒后开始休息`;
}

async function notification() {
    let res = await ipcRenderer.invoke('work-notification');
    if (res === 'rest') {
        // 选择休息
        startRest();
    } else if (res === 'work') {
        // 选择继续工作
        startWork();
    }
}

/**
 * 提示休息结束
 */
async function notifiEndRest() {
    let res = await ipcRenderer.invoke('rest-notification');
    
}

startWork()