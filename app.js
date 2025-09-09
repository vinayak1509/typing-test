// Simple typing app logic
const START_TIME = 30;
let timeLeft = START_TIME;
let timer = null;
let running = false;
let targetText = '';
let position = 0;
let errors = 0;

const startBtn = document.getElementById('startBtn');
const resetBtn = document.getElementById('resetBtn');
const inputEl = document.getElementById('input');
const quoteEl = document.getElementById('quote');
const timeEl = document.getElementById('time');
const wpmEl = document.getElementById('wpm');
const accEl = document.getElementById('accuracy');
const errEl = document.getElementById('errors');
const passagesEl = document.getElementById('passages');
const customEl = document.getElementById('custom');
const modeEl = document.getElementById('mode');

const passages = [
    "Typing is the process of writing or inputting text by pressing keys on a keyboard.",
    "Practice makes perfect. Keep your fingers relaxed and eyes on the screen.",
    "Quick brown fox jumps over the lazy dog."
];

function renderPassages() {
    passagesEl.innerHTML = '';
    passages.forEach((p, i) => {
        const d = document.createElement('div');
        d.className = 'passage';
        d.textContent = p.slice(0, 120) + (p.length > 120 ? '...' : '');
        d.tabIndex = 0;
        d.addEventListener('click', () => { selectPassage(i); });
        d.addEventListener('keypress', (e) => { if (e.key === 'Enter') selectPassage(i); });
        passagesEl.appendChild(d);
    });
}

function selectPassage(i) {
    targetText = passages[i];
    customEl.value = '';
    showTarget();
}

function showTarget() {
    quoteEl.innerHTML = '';
    targetText.split('').forEach((ch, idx) => {
        const span = document.createElement('span');
        span.className = 'char';
        span.textContent = ch;
        if (idx === 0) span.classList.add('current');
        quoteEl.appendChild(span);
    });
}

function start() {
    if (running) return;
    // if custom provided, use it
    if (customEl.value.trim()) {
        targetText = customEl.value.trim();
    }
    if (!targetText) targetText = passages[0];

    inputEl.disabled = false;
    inputEl.focus();
    running = true;
    timeLeft = START_TIME;
    position = 0;
    errors = 0;
    updateStats();
    highlightPosition();
    timer = setInterval(tick, 1000);
}

function reset() {
    clearInterval(timer);
    running = false;
    inputEl.value = '';
    inputEl.disabled = true;
    timeLeft = START_TIME;
    position = 0;
    errors = 0;
    targetText = '';
    quoteEl.textContent = 'Click Start to begin...';
    updateStats();
}

function tick() {
    timeLeft -= 1;
    updateStats();
    if (timeLeft <= 0) {
        end();
    }
}

function end() {
    clearInterval(timer);
    running = false;
    inputEl.disabled = true;
    calculateWPM();
}

function updateStats() {
    timeEl.textContent = timeLeft;
    errEl.textContent = errors;
    calculateWPM();
    const totalTyped = position;
    const correct = Math.max(0, totalTyped - errors);
    const acc = totalTyped ? Math.round((correct / totalTyped) * 100) : 100;
    accEl.textContent = acc;
}

function calculateWPM() {
    const chars = position;
    const words = chars / 5;
    const elapsed = (START_TIME - timeLeft) / 60; // minutes
    const wpm = elapsed > 0 ? Math.round(words / elapsed) : 0;
    wpmEl.textContent = wpm;
}

function highlightPosition() {
    const spans = quoteEl.querySelectorAll('.char');
    spans.forEach((s, i) => {
        s.classList.remove('correct', 'incorrect', 'current');
        if (i < position) {
            const typed = inputEl.value[i];
            if (typed === s.textContent) s.classList.add('correct');
            else s.classList.add('incorrect');
        } else if (i === position) {
            s.classList.add('current');
        }
    });
}

inputEl.addEventListener('input', (e) => {
    if (!running) return;
    const val = e.target.value;
    position = val.length;
    // if position beyond target, stop adding
    if (position > targetText.length) {
        position = targetText.length;
        inputEl.value = val.slice(0, targetText.length);
    }
    // count errors for typed portion
    errors = 0;
    for (let i = 0; i < position; i++) {
        if (inputEl.value[i] !== targetText[i]) errors++;
    }
    highlightPosition();
    updateStats();
});

startBtn.addEventListener('click', () => {
    // change START_TIME based on mode
    const mode = modeEl.value;
    if (mode === 'time') {
        // keep default 30s
    } else if (mode === 'words') {
        // switch to longer time for words mode
    }
    if (!targetText && customEl.value.trim()) targetText = customEl.value.trim();
    if (!targetText) selectPassage(0);
    showTarget();
    start();
});

resetBtn.addEventListener('click', reset);

// init
renderPassages();
quoteEl.textContent = 'Click Start to begin...';
inputEl.disabled = true;
