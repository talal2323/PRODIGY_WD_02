let timer;
let startTime;
let pauseTime;
let running = false;

const display = document.querySelector('.display');
const startBtn = document.querySelector('.start');
const pauseBtn = document.querySelector('.pause');
const resetBtn = document.querySelector('.reset');
const lapBtn = document.querySelector('.lap');
const lapsList = document.querySelector('.laps');

function formatTime(ms) {
    let hours = Math.floor(ms / 3600000);
    let minutes = Math.floor((ms % 3600000) / 60000);
    let seconds = Math.floor((ms % 60000) / 1000);
    return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
}

function updateDisplay() {
    const elapsed = running ? Date.now() - startTime : 0;
    display.textContent = formatTime(elapsed);
}

function startTimer() {
    if (!running) {
        if (startTime && pauseTime) {
            const elapsedTimeDuringPause = Date.now() - pauseTime;
            startTime += elapsedTimeDuringPause;
        } else {
            startTime = Date.now();
        }
        running = true;
        timer = setInterval(updateDisplay, 1000);
        toggleButtons('start');
    }
}

function pauseTimer() {
    if (running) {
        running = false;
        clearInterval(timer);
        pauseTime = Date.now();
        toggleButtons('pause');
    }
}

function resetTimer() {
    running = false;
    clearInterval(timer);
    startTime = null;
    pauseTime = null;
    updateDisplay();
    lapsList.innerHTML = '';
    toggleButtons('reset');
}

function lapTimer() {
    if (running) {
        const elapsed = Date.now() - startTime;
        const lapTime = formatTime(elapsed);
        const lapItem = document.createElement('li');
        lapItem.textContent = lapTime;
        lapItem.classList.add('list-group-item');
        lapsList.appendChild(lapItem);
    }
}

function toggleButtons(state) {
    switch (state) {
        case 'start':
            startBtn.disabled = true;
            pauseBtn.disabled = false;
            resetBtn.disabled = false;
            lapBtn.disabled = false;
            break;
        case 'pause':
            startBtn.disabled = false;
            pauseBtn.disabled = true;
            resetBtn.disabled = false;
            lapBtn.disabled = true;
            break;
        case 'reset':
            startBtn.disabled = false;
            pauseBtn.disabled = true;
            resetBtn.disabled = true;
            lapBtn.disabled = true;
            break;
    }
}

startBtn.addEventListener('click', startTimer);
pauseBtn.addEventListener('click', pauseTimer);
resetBtn.addEventListener('click', resetTimer);
lapBtn.addEventListener('click', lapTimer);
