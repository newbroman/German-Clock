/**
 * German Time Learner for English Speakers
 */

let currentLang = 'EN';
const dict = {
    'EN': { qOff: "How do you say?", qOn: "Show Answer" },
    'DE': { qOff: "Wie sagt man?", qOn: "Antwort zeigen" }
};

// 1. Data Sets
const hDe = ["Mitternacht", "eins", "zwei", "drei", "vier", "fünf", "sechs", "sieben", "acht", "neun", "zehn", "elf", "zwölf", "dreizehn", "vierzehn", "fünfzehn", "sechzehn", "siebzehn", "achtzehn", "neunzehn", "zwanzig", "einundzwanzig", "zweiundzwanzig", "dreiundzwanzig"];
const mDe = ["null", "eins", "zwei", "drei", "vier", "fünf", "sechs", "sieben", "acht", "neun", "zehn", "elf", "zwölf", "dreizehn", "vierzehn", "fünfzehn", "sechzehn", "siebzehn", "achtzehn", "neunzehn", "zwanzig", "einundzwanzig", "zweiundzwanzig", "dreiundzwanzig", "vierundzwanzig", "fünfundzwanzig", "sechsundzwanzig", "siebenundzwanzig", "achtundzwanzig", "neunundzwanzig", "dreißig"];

// Language Dictionary
const dict = {
    'EN': {
        title: "German Time Learner",
        actual: "Real Time",
        random: "Random",
        listen: "Listen",
        slow: "Slow",
        qOff: "How do you say?", // Formal default phrasing
        qOn: "Show Answer",
        close: "Close"
    },
    'DE': {
        title: "Zeit-Trainer",
        actual: "Echtzeit",
        random: "Zufall",
        listen: "Anhören",
        slow: "Langsam",
        qOff: "Wie sagt man?", // Formal default phrasing
        qOn: "Antwort zeigen",
        close: "Schließen"
    }
};

// 2. Global State
let hours = 12, minutes = 0, seconds = 0;
let isQuiz = false, isRevealed = true;
let isLive = true;
let currentLang = 'EN';

// 3. Update Display Logic
function updateDisplay(syncInput) {
    const hRotation = ((hours % 12) * 30) + (minutes * 0.5);
    const mRotation = minutes * 6;
    const sRotation = seconds * 6;

    document.getElementById('h-hand').style.transform = `rotate(${hRotation}deg)`;
    document.getElementById('m-hand').style.transform = `rotate(${mRotation}deg)`;
    document.getElementById('s-hand').style.transform = `rotate(${sRotation}deg)`;

    const timeStr = `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}`;
    if (syncInput) {
        const inputDisp = document.getElementById('time-input-display');
        if (inputDisp) inputDisp.value = timeStr;
    }

    // Default startup: Casual mode is usually checked in HTML
    const isFormal = document.getElementById('formal').checked;
    let g = "", e = ""; 

    if (isFormal) {
        g = `Es ist <span class="nom-case">${hDe[hours]} Uhr</span> <span class="cardinal-num">${minutes === 0 ? "" : getFullMin(minutes)}</span>`;
        e = `It is ${hours} o'clock ${minutes}`;
    } else {
        let h12 = hours % 12 || 12;
        let nextH = (hours + 1) % 12 || 12;

        if (minutes === 0) {
            g = `Es ist <span class="nom-case">${hDe[h12]}</span>`;
            e = `It's ${h12} o'clock`;
        } else if (minutes < 30) {
            g = `<span class="cardinal-num">${getFullMin(minutes)}</span> nach <span class="nom-case">${hDe[h12]}</span>`;
            e = `${minutes} past ${h12}`;
        } else if (minutes === 30) {
            g = `Es ist halb <span class="nom-case">${hDe[nextH]}</span>`;
            e = `Halfway to ${nextH} (${hours}:${minutes})`;
        } else {
            let diff = 60 - minutes;
            g = `<span class="cardinal-num">${getFullMin(diff)}</span> vor <span class="nom-case">${hDe[nextH]}</span>`;
            e = `${diff} to ${nextH}`;
        }
    }

    const gt = document.getElementById('german-text');
    const et = document.getElementById('english-text');
    const d = dict[currentLang];

    if (isQuiz && !isRevealed) {
        gt.innerText = d.qOff; // Displays "How do you say?"
        et.style.visibility = "hidden";
    } else {
        gt.innerHTML = g; 
        et.style.visibility = "visible";
        et.innerText = e;
    }
}

// 4. Interaction Functions
function toggleLang() {
    currentLang = (currentLang === 'EN' ? 'DE' : 'EN');
    const d = dict[currentLang];
    
    // Update UI labels
    document.getElementById('app-title').innerText = d.title;
    document.getElementById('btn-real').innerText = d.actual;
    document.getElementById('btn-random').innerText = d.random;
    document.getElementById('btn-listen').innerText = d.listen;
    document.getElementById('btn-slow').innerText = d.slow;
    document.getElementById('quiz-toggle').innerText = isQuiz ? d.qOn : d.qOff;
    
    updateDisplay(true);
}

function getFullMin(m) {
    if (m <= 20 || m === 30) return mDe[m] || m;
    let units = m % 10;
    let tens = Math.floor(m / 10);
    const unitsDe = ["", "ein", "zwei", "drei", "vier", "fünf", "sechs", "sieben", "acht", "neun"];
    const tensDe = ["", "", "zwanzig", "dreißig", "vierzig", "fünfzig"];
    // Simplified Cardinal numbers (No quarters)
    return unitsDe[units] + "und" + tensDe[tens];
}

function init() {
    // Ensure startup is in Casual Mode
    document.getElementById('casual').checked = true;
    
    // Set formal phrasing for toggle
    const d = dict[currentLang];
    document.getElementById('quiz-toggle').innerText = d.qOff;

    setRealTime();
    setInterval(() => {
        if (isLive) {
            const now = new Date();
            hours = now.getHours();
            minutes = now.getMinutes();
            seconds = now.getSeconds();
            updateDisplay(true);
        } else {
            seconds = (seconds + 1) % 60;
            updateDisplay(false);
        }
    }, 1000);
}

function setRealTime() {
    isLive = true;
    const now = new Date();
    hours = now.getHours();
    minutes = now.getMinutes();
    seconds = now.getSeconds();
    updateDisplay(true);
}

function rollTime() {
    isLive = false;
    hours = Math.floor(Math.random() * 24);
    minutes = Math.floor(Math.random() * 60);
    seconds = 0;
    if (isQuiz) isRevealed = false; // Hide answer for new random time
    updateDisplay(true);
}

function toggleQuiz() {
    isQuiz = !isQuiz;
    isRevealed = !isQuiz; // If entering quiz, hide answer; if leaving, show it
    
    const d = dict[currentLang];
    const btn = document.getElementById('quiz-toggle');
    
    // Toggle button text based on state [cite: 2026-01-08]
    if (isQuiz) {
        btn.innerText = d.qOn; // "Show Answer"
    } else {
        btn.innerText = d.qOff; // "How do you say?" (Formal default)
    }
    
    updateDisplay(true);
}

// Manual Drag Support
function startDrag(e) {
    isLive = false;
    document.onmousemove = handleDrag;
    document.ontouchmove = handleDrag;
    document.onmouseup = stopDrag;
    document.ontouchend = stopDrag;
}

function handleDrag(e) {
    const clock = document.getElementById('clock-container');
    const rect = clock.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    
    const clientX = e.touches ? e.touches[0].clientX : e.clientX;
    const clientY = e.touches ? e.touches[0].clientY : e.clientY;

    const angle = Math.atan2(clientY - centerY, clientX - centerX) * (180 / Math.PI) + 90;
    const normalizedAngle = (angle + 360) % 360;

    // Logic to move minute hand
    minutes = Math.round(normalizedAngle / 6) % 60;
    updateDisplay(true);
}

function stopDrag() {
    document.onmousemove = null;
    document.ontouchmove = null;
}

function speakTime(rate) {
    // 1. Get the German text from the display
    const gt = document.getElementById('german-text');
    
    // 2. If it's a quiz and hidden, don't speak! 
    // Or speak to help them learn? Let's assume they only hear it when revealed.
    if (isQuiz && !isRevealed) {
        return; 
    }

    // 3. Clean the text (removes <span> tags)
    const textToSpeak = gt.innerText;

    // 4. Create the utterance
    const utterance = new SpeechSynthesisUtterance(textToSpeak);
    utterance.lang = 'de-DE'; // Force German accent
    utterance.rate = rate;     // Apply the speed (1.0 or 0.6)
    utterance.pitch = 1.0;

    // 5. Optional: Find a specific German voice if available
    const voices = window.speechSynthesis.getVoices();
    const germanVoice = voices.find(v => v.lang.startsWith('de'));
    if (germanVoice) utterance.voice = germanVoice;

    // 6. Speak
    window.speechSynthesis.cancel(); // Stop any current speech
    window.speechSynthesis.speak(utterance);
}
