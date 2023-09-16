// script.js
let startTime;
let interval;
let isRunning = false;
let laps = [];

const display = document.getElementById('display');
const startStopButton = document.getElementById('startStop');
const resetButton = document.getElementById('reset');
const lapButton = document.getElementById('lap');
const lapsList = document.getElementById('laps');

function startStop() {
    if (!isRunning) {
        startTime = Date.now() - (laps.length > 0 ? laps[laps.length - 1].time : 0);
        interval = setInterval(updateDisplay, 10);
        startStopButton.textContent = 'Stop';
        lapButton.textContent = 'Lap';
    } else {
        clearInterval(interval);
        startStopButton.textContent = 'Start';
        lapButton.textContent = 'Reset';
    }
    isRunning = !isRunning;
}

function reset() {
    clearInterval(interval);
    isRunning = false;
    startStopButton.textContent = 'Start';
    lapButton.textContent = 'Lap';
    display.textContent = '00:00:00';
    laps = [];
    lapsList.innerHTML = '';
}

function updateDisplay() {
    const currentTime = Date.now() - startTime;
    const minutes = Math.floor(currentTime / 60000);
    const seconds = Math.floor((currentTime % 60000) / 1000);
    const milliseconds = Math.floor((currentTime % 1000) / 10);
    display.textContent = `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}:${milliseconds.toString().padStart(2, '0')}`;
}

function lap() {
    if (isRunning) {
        const currentTime = Date.now() - startTime;
        laps.push({ time: currentTime });
        const lapTime = laps[laps.length - 1].time - (laps.length > 1 ? laps[laps.length - 2].time : 0);
        const li = document.createElement('li');
        li.textContent = `Lap ${laps.length}: ${formatTime(lapTime)}`;
        lapsList.appendChild(li);
    } else {
        reset();
    }
}

function formatTime(time) {
    const minutes = Math.floor(time / 60000);
    const seconds = Math.floor((time % 60000) / 1000);
    const milliseconds = Math.floor((time % 1000) / 10);
    return `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}:${milliseconds.toString().padStart(2, '0')}`;
}

startStopButton.addEventListener('click', startStop);
resetButton.addEventListener('click', reset);
lapButton.addEventListener('click', lap);
