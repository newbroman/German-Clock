/**
 * German Time Learner for English Speakers
 */

// 1. Data Sets
const hDe = ["Mitternacht", "eins", "zwei", "drei", "vier", "fünf", "sechs", "sieben", "acht", "neun", "zehn", "elf", "zwölf", "dreizehn", "vierzehn", "fünfzehn", "sechzehn", "siebzehn", "achtzehn", "neunzehn", "zwanzig", "einundzwanzig", "zweiundzwanzig", "dreiundzwanzig"];
// Cardinal minutes (No Quarters)
const mDe = ["null", "eins", "zwei", "drei", "vier", "fünf", "sechs", "sieben", "acht", "neun", "zehn", "elf", "zwölf", "dreizehn", "vierzehn", "fünfzehn", "sechzehn", "siebzehn", "achtzehn", "neunzehn", "zwanzig", "einundzwanzig", "zweiundzwanzig", "dreiundzwanzig", "vierundzwanzig", "fünfundzwanzig", "sechsundzwanzig", "siebenundzwanzig", "achtundzwanzig", "neunundzwanzig", "dreißig"];

// 2. Global State
let hours = 12, minutes = 0, seconds = 0;
let isQuiz = false, isRevealed = true;
let isLive = true;

// 3. Update Display Logic
function updateDisplay(syncInput) {
    // Clock hand rotations
    const hRotation = ((hours % 12) * 30) + (minutes * 0.5);
    const mRotation = minutes * 6;
    const sRotation = seconds * 6;

    document.getElementById('h-hand').style.transform = `rotate(${hRotation}deg)`;
    document.getElementById('m-hand').style.transform = `rotate(${mRotation}deg)`;
    document.getElementById('s-hand').style.transform = `rotate(${sRotation}deg)`;

    // Digital Sync (Vivid Red Display)
    const timeStr = `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}`;
    if (syncInput) document.getElementById('time-input-display').value = timeStr;

    const isFormal = document.getElementById('formal').checked;
    let g = "", e = ""; 

    if (isFormal) {
        // Formal: 14:15 = vierzehn Uhr fünfzehn
        g = `Es ist <span class="nom-case">${hDe[hours]} Uhr</span> <span class="cardinal-num">${minutes === 0 ? "" : getFullMin(minutes)}</span>`;
        e = `It is ${hours} o'clock ${minutes}`;
    } else {
        // Casual: 12h Format
        let h12 = hours % 12 || 12;
        let nextH = (hours + 1) % 12 || 12;

        if (minutes === 0) {
            g = `Es ist <span class="nom-case">${hDe[h12]}</span>`;
            e = `It's ${h12} o'clock`;
        } else if (minutes < 30) {
            // e.g., 10:15 = fünfzehn nach zehn
            g = `<span class="cardinal-num">${getFullMin(minutes)}</span> nach <span class="nom-case">${hDe[h12]}</span>`;
            e = `${minutes} past ${h12}`;
        } else if (minutes === 30) {
            // THE "HALB" JUMP (Similar to Polish wpół do)
            g = `Es ist halb <span class="nom-case">${hDe[nextH]}</span>`;
            e = `Halfway to ${nextH} (10:30)`;
        } else {
            // e.g., 10:45 = fünfzehn vor elf
            let diff = 60 - minutes;
            g = `<span class="cardinal-num">${getFullMin(diff)}</span> vor <span class="nom-case">${hDe[nextH]}</span>`;
            e = `${diff} to ${nextH}`;
        }
    }

    // UI Output
    const gt = document.getElementById('german-text');
    const et = document.getElementById('english-text');

    if (isQuiz && !isRevealed) {
        gt.innerText = "Wie sagt man?"; 
        et.style.visibility = "hidden";
    } else {
        gt.innerHTML = g; 
        et.style.visibility = "visible";
        et.innerText = e;
    }
}

// Helper to handle numbers > 19 (e.g., 21 = einundzwanzig)
function getFullMin(m) {
    if (m <= 20 || m === 30) return mDe[m] || m;
    let units = m % 10;
    let tens = Math.floor(m / 10);
    const unitsDe = ["", "ein", "zwei", "drei", "vier", "fünf", "sechs", "sieben", "acht", "neun"];
    const tensDe = ["", "", "zwanzig", "dreißig", "vierzig", "fünfzig"];
    return unitsDe[units] + "und" + tensDe[tens];
}

// 4. Initialize Ticking
function init() {
    setRealTime();
    setInterval(() => {
        if (isLive) {
            const now = new Date();
            hours = now.getHours();
            minutes = now.getMinutes();
            seconds = now.getSeconds();
            updateDisplay(true);
        } else {
            // Manual second hand movement
            seconds = (seconds + 1) % 60;
            if (seconds === 0) { /* minutes could advance here if desired */ }
            updateDisplay(false);
        }
    }, 1000);
}

// (Remaining interaction functions startDrag, setRealTime, rollTime, toggleQuiz would follow here)
