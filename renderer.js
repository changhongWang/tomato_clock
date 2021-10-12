/*
 * @Description: 
 * @Author: changhong.wang
 * @Date: 2021-10-12 13:50:37
 * @LastEditors: changhong.wang
 * @LastEditTime: 2021-10-12 17:31:00
 */
const { ipcRenderer } = require('eletron');
const Timer = require('timer.js');

function startWork() {
    alert(555)
    let workTimer = new Timer({
        ontick: () => {
            updateTime()
        },
        onend: () => {
            notification()
        }
    });
    workTimer.start(10);
}

function updateTime(ms) {
    let timerContainer = document.getElementById('timer-container');
    timerContainer.innerText = ms;
}

async function notification() {
    let res = await ipcRenderer.invoke('work-notification');
    if (res === 'rest') {
        // 选择休息
        setTimeout(() => {
            alert('休息')
        }, 5000);
    } else if (res === 'work') {
        // 选择继续工作
        startWork()
    }
}

startWork()