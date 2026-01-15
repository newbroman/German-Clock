/**
 * German Time Learner for English Speakers
 */

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
