// 1. Global State
let hours = 12, minutes = 0, seconds = 0, isQuiz = false, isRevealed = true, currentLang = 'EN', showPh = true, showSec = false;
let isLive = true;

// 2. Data Sets
const hNom = ["północ", "pierwsza", "druga", "trzecia", "czwarta", "piąta", "szósta", "siódma", "ósma", "dziewiąta", "dziesiąta", "jedenasta", "południe", "trzynasta", "czternasta", "piętnasta", "szesnasta", "siedemnasta", "osiemnasta", "dziewiętnasta", "dwudziesta", "dwudziesta pierwsza", "dwudziesta druga", "dwudziesta trzecia"];
const hNomPh = ["poow-nots", "pyerv-shah", "droo-gah", "tshe-tsyah", "chvar-tah", "pyon-tah", "shoos-tah", "shood-mah", "oos-mah", "je-vyon-tah", "je-shon-tah", "ye-de-nas-tah", "po-wood-nye", "tshi-nas-tah", "chter-nas-tah", "pyent-nas-tah", "shes-nas-tah", "she-dem-nas-tah", "o-shem-nas-tah", "je-vyet-nas-tah", "dvoo-jest-ah", "dvoo-jest-ah pyerv-shah", "dvoo-jest-ah droo-gah", "dvoo-jest-ah tshe-tsyah"];
const hGen = ["północy", "pierwszej", "drugiej", "trzeciej", "czwartej", "piątej", "szóstej", "siódmej", "ósmej", "dziewiątej", "dziesiątej", "jedenastej", "południa", "trzynastej", "czternastej", "piętnastej", "szesnastej", "siedemnastej", "osiemnastej", "dziewiętnastej", "dwudziestej", "dwudziestej pierwszej", "dwudziestej drugiej", "dwudziestej trzeciej"];
const hGenPh = ["poow-no-tsi", "pyerv-shey", "droo-gyey", "tshe-tsiey", "chvar-tey", "pyon-tey", "shoos-tey", "shood-mey", "oos-mey", "je-vyon-tey", "je-shon-tey", "ye-de-nas-tey", "po-wood-nyah", "tshi-nas-tey", "chter-nas-tey", "pyent-nas-tey", "shes-nas-tey", "she-dem-nas-tey", "o-shem-nas-tey", "je-vyet-nas-tey", "dvoo-jes-tey", "dvoo-jes-tey pyerv-shey", "dvoo-jes-tey droo-gyey", "dvoo-jes-tey tshe-tsiey"];
const mAll = ["zero", "jedna", "dwie", "trzy", "cztery", "pięć", "sześć", "siedem", "osiem", "dziewięć", "dziesięć", "jedenaście", "dwanaście", "trzynaście", "czternaście", "piętnaście", "szesnaście", "siedemnaście", "osiemnaście", "dziewiętnaście", "dwadzieścia", "dwadzieścia jeden", "dwadzieścia dwie", "dwadzieścia trzy", "dwadzieścia cztery", "dwadzieścia pięć", "dwadzieścia sześć", "dwadzieścia siedem", "dwadzieścia osiem", "dwadzieścia dziewięć", "trzydzieści", "trzydzieści jeden", "trzydzieści dwie", "trzydzieści trzy", "trzydzieści cztery", "trzydzieści pięć", "trzydzieści sześć", "trzydzieści siedem", "trzydzieści osiem", "trzydzieści dziewięć", "czterdzieści", "czterdzieści jeden", "czterdzieści dwie", "czterdzieści trzy", "czterdzieści cztery", "czterdzieści pięć", "czterdzieści sześć", "czterdzieści siedem", "czterdzieści osiem", "czterdzieści dziewięć", "pięćdziesiąt", "pięćdziesiąt jeden", "pięćdziesiąt dwie", "pięćdziesiąt trzy", "pięćdziesiąt cztery", "pięćdziesiąt pięć", "pięćdziesiąt sześć", "pięćdziesiąt siedem", "pięćdziesiąt osiem", "pięćdziesiąt dziewięć"];
const mAllPh = ["ze-ro", "yed-nah", "dvye", "tshi", "chter-ih", "pyench", "shesh-ch", "she-dem", "o-shem", "je-vyench", "je-shench", "ye-de-nas-che", "dva-nash-che", "tshi-nash-che", "chter-nash-che", "pyent-nash-che", "shes-nas-che", "she-dem-nash-che", "o-shem-nash-che", "je-vyet-nas-che", "dva-jes-tsyah", "dva-jes-tsyah yed-nah", "dva-jes-tsyah dvye", "dva-jes-tsyah tshi", "dva-jes-tsyah chter-ih", "dva-jes-tsyah pyench", "dva-jes-tsyah shesh-ch", "dva-jes-tsyah she-dem", "dva-jes-tsyah o-shem", "dva-jes-tsyah je-vyench", "tshi-jes-tsyi", "tshi-jes-tsyi yed-nah", "tshi-jes-tsyi dvye", "tshi-jes-tsyi tshi", "tshi-jes-tsyi chter-ih", "tshi-jes-tsyi pyench", "tshi-jes-tsyi shesh-ch", "tshi-jes-tsyi she-dem", "tshi-jes-tsyi o-shem", "tshi-jes-tsyi je-vyench", "chter-jes-tsyi", "chter-jes-tsyi yed-nah", "chter-jes-tsyi dvye", "chter-jes-tsyi tshi", "chter-jes-tsyi chter-ih", "chter-jes-tsyi pyench", "chter-jes-tsyi shesh-ch", "chter-jes-tsyi she-dem", "chter-jes-tsyi o-shem", "chter-jes-tsyi je-vyench", "pyench-je-shont", "pyench-je-shont yed-nah", "pyench-je-shont dvye", "pyench-je-shont tshi", "pyench-je-shont chter-ih", "pyench-je-shont pyench", "pyench-je-shont shesh-ch", "pyench-je-shont she-dem", "pyench-je-shont o-shem", "pyench-je-shont je-vyench"];

const dict = {
    EN: { title: "Say the Time in Polish", actual: "ACTUAL TIME", random: "RANDOM TIME", listen: "🔊 LISTEN", slow: "½ SPEED", ask: "How do you say?", reveal: "REVEAL", close: "Close Help", qOn: "Quiz: ON", qOff: "Quiz: OFF" },
    PL: { title: "Powiedz Kótra Godzina po Polsku", actual: "AKTUALNY CZAS", random: "LOSOWY CZAS", listen: "🔊 SŁUCHAJ", slow: "½ PRĘDKOŚĆ", ask: "Jak to powiedzieć?", reveal: "POKAŻ", close: "Zamknij", qOn: "Quiz: WŁ", qOff: "Quiz: WYŁ" }
};

// Utility
const pad = (n) => n.toString().padStart(2, '0');

function init() {
    const c = document.getElementById('clock-container');
    c.querySelectorAll('.mark').forEach(m => m.remove());

    for (let i = 0; i < 12; i++) {
        const m = document.createElement('div');
        m.className = 'mark';
        m.style.transform = `rotate(${i * 30}deg)`;
        m.style.transformOrigin = `1px 72.5px`;
        c.appendChild(m);
    }

    setRealTime(); 
    
    setInterval(() => {
        if (isQuiz) return; // Stop everything during a quiz

        if (isLive) {
            // Standard Live Mode
            const now = new Date();
            seconds = now.getSeconds();
            hours = now.getHours();
            minutes = now.getMinutes();
        } else {
            // Manual Tick: Keep the clock moving from the user's set time
            seconds++;
            if (seconds >= 60) {
                seconds = 0;
                minutes++;
                if (minutes >= 60) {
                    minutes = 0;
                    hours = (hours + 1) % 24;
                }
            }
        }
        updateDisplay(true);
    }, 1000);
}

function updateDisplay(syncInput) {
    // 1. Hands & Digital Sync
    const hRotation = ((hours % 12) * 30) + (minutes * 0.5);
    const mRotation = minutes * 6;
    const sRotation = seconds * 6;

    document.getElementById('h-hand').style.transform = `rotate(${hRotation}deg)`;
    document.getElementById('m-hand').style.transform = `rotate(${mRotation}deg)`;
    const sHand = document.getElementById('s-hand');
    if (sHand) sHand.style.transform = `rotate(${sRotation}deg)`;

    const timeStr = `${pad(hours)}:${pad(minutes)}${showSec ? ':' + pad(seconds) : ''}`;
    if (syncInput) document.getElementById('time-input-display').value = timeStr;

    // 2. Text Logic
    const isFormal = document.getElementById('formal').checked;
    let p = "", ph = "", e = "";
    // Note: Minutes (cardinal-num) are always blue
    let sStr = (showSec && seconds > 0) ? ` i <span class="cardinal-num">${mAll[seconds]}</span> sekund` : "";

    if (isFormal) {
        let mStr = (minutes > 0 && minutes < 10) ? "zero " + mAll[minutes] : (minutes === 0 ? "" : mAll[minutes]);
        let mCard = minutes > 0 ? `<span class="cardinal-num">${mStr}</span>` : "";
        p = `<span class="nom-case">Godzina ${hNom[hours]}</span> ${mCard}${sStr}`;
        ph = `go-jee-nah ${hNomPh[hours]} ${mAllPh[minutes]}`;
        e = `${pad(hours)}:${pad(minutes)}${showSec ? ':' + pad(seconds) : ''}`;
    } else {
        let h12 = hours % 12, n12 = (hours + 1) % 12;
        let displayH = h12 || 12;
        let nextH = n12 || 12;

        if (minutes === 0) {
            let spec = hours === 0 ? "północ" : hours === 12 ? "południe" : hNom[h12];
            p = `<span class="nom-case">${spec}</span>${sStr}`;
            ph = `${hNomPh[h12]}`;
            e = hours === 0 ? "Midnight" : hours === 12 ? "Noon" : `${displayH} o'clock`;
        } else if (minutes < 30) {
            p = `<span class="cardinal-num">${mAll[minutes]}</span> <span class="gen-case">po ${hGen[h12]}</span>${sStr}`;
            ph = `${mAllPh[minutes]} po ${hGenPh[h12]}`;
            e = `${minutes} past ${displayH}`;
        } else if (minutes === 30) {
            p = `<span class="gen-case">w pół do ${hGen[n12]}</span>${sStr}`;
            ph = `fpoow do ${hGenPh[n12]}`;
            e = `Half past ${displayH}`;
        } else {
            let d = 60 - minutes;
            p = `<span class="nom-case">za</span> <span class="cardinal-num">${mAll[d]}</span> <span class="nom-case">${hNom[n12]}</span>${sStr}`;
            ph = `zah ${mAllPh[d]} ${hNomPh[n12]}`;
            e = `${d} to ${nextH}`;
        }
    }

  // 3. UI Update (Strict Quiz Hiding with Visibility control)
    const d = dict[currentLang];
    const pt = document.getElementById('polish-text');
    const pht = document.getElementById('phonetic-text');
    const et = document.getElementById('english-text');

    if (isQuiz && !isRevealed) {
        pt.innerText = d.ask; 
        pht.style.visibility = "hidden"; // Hide completely
        et.style.visibility = "hidden"; // Hide completely
        pht.innerHTML = "&nbsp;"; 
        et.innerHTML = "&nbsp;"; 
    } else {
        pt.innerHTML = p; 
        pht.style.visibility = "visible"; // Show again
        et.style.visibility = "visible"; // Show again
        pht.innerText = showPh ? ph : ""; 
        et.innerText = e;
    }
}

function startDrag(e) {
   isLive = false;
    e.preventDefault();
    const clock = document.getElementById('clock-container');
    const move = (ev) => {
        const rect = clock.getBoundingClientRect();
        const cx = ev.touches ? ev.touches[0].clientX : ev.clientX;
        const cy = ev.touches ? ev.touches[0].clientY : ev.clientY;
        const x = cx - rect.left - rect.width / 2;
        const y = cy - rect.top - rect.height / 2;
        const angle = Math.atan2(y, x) * (180 / Math.PI) + 90;
        const norm = (angle < 0) ? angle + 360 : angle;
        const dist = Math.sqrt(x*x + y*y);

        if (dist < 35) {
            let newH = Math.round(norm / 30) % 12;
            if (hours >= 12) newH += 12;
            hours = newH;
        } else {
            minutes = Math.round(norm / 6) % 60;
        }
        updateDisplay(true);
    };
    const stop = () => {
        window.removeEventListener('mousemove', move);
        window.removeEventListener('touchmove', move);
        if (isQuiz) generateQuizOptions();
    };
    window.addEventListener('mousemove', move);
    window.addEventListener('touchmove', move);
    window.addEventListener('mouseup', stop, {once:true});
    window.addEventListener('touchend', stop, {once:true});
}

function setRealTime() {
    isLive = true; // Resume live updates
    const n = new Date();
    hours = n.getHours(); minutes = n.getMinutes(); seconds = n.getSeconds();
    isRevealed = !isQuiz;
    updateDisplay(true);
}

function rollTime() {
    isLive = false; // Stop live updates so the random time stays
    hours = Math.floor(Math.random() * 24);
    minutes = Math.floor(Math.random() * 60);
    seconds = 0;
    isRevealed = !isQuiz;
    updateDisplay(true);
    if (isQuiz) generateQuizOptions();
}

function speak(r) {
    window.speechSynthesis.cancel();
    let t = document.getElementById('polish-text').innerText;
    if (t.includes("?")) return;
    const m = new SpeechSynthesisUtterance(t);
    m.lang = 'pl-PL'; m.rate = r;
    window.speechSynthesis.speak(m);
}

function toggleSec() {
    showSec = !showSec;
    // Force isRevealed to false if we are in a quiz so it stays hidden
    if (isQuiz) isRevealed = false; 
    document.getElementById('sec-toggle').innerText = showSec ? "Sec: ON" : "Sec: OFF";
    updateDisplay(true);
}

function togglePh() {
    showPh = !showPh;
    updateDisplay(true);
}

function toggleQuiz() {
    isQuiz = !isQuiz;
    const container = document.getElementById('quiz-options');
    
    if (isQuiz) {
        isRevealed = false; // Ensure the answer is hidden immediately [cite: 2026-01-13]
        generateQuizOptions();
        document.getElementById('quiz-toggle').innerText = dict[currentLang].qOn;
    } else {
        isRevealed = true; // Show text again when quiz is off
        container.style.display = "none";
        document.getElementById('quiz-toggle').innerText = dict[currentLang].qOff;
    }
    updateDisplay(true);
}
function generateQuizOptions() {
    const container = document.getElementById('quiz-options');
    const isFormal = document.getElementById('formal').checked;
    const correctAnswer = getCorrectStr(hours, minutes, isFormal);
    let options = [correctAnswer];
    while (options.length < 4) {
        let rH = Math.floor(Math.random() * 24);
        let rM = Math.floor(Math.random() * 60);
        let wrong = getCorrectStr(rH, rM, isFormal);
        if (!options.includes(wrong)) options.push(wrong);
    }
    options.sort(() => Math.random() - 0.5);
    container.innerHTML = "";
    container.style.display = "grid";
    options.forEach(opt => {
        const btn = document.createElement('button');
        btn.innerHTML = opt;
        btn.style.cssText = "padding:10px; border-radius:8px; border:1px solid #ccc; background:white; cursor:pointer;";
        btn.onclick = () => {
            if (opt === correctAnswer) {
                btn.style.background = "#28a745"; btn.style.color = "white";
                setTimeout(() => { isRevealed = true; updateDisplay(true); container.style.display="none"; }, 500);
            } else {
                btn.style.background = "#dc3545"; btn.style.color = "white"; btn.disabled = true;
            }
        };
        container.appendChild(btn);
    });
}

function getCorrectStr(h, m, formal) {
    if (formal) {
        let mStr = (m > 0 && m < 10) ? "zero " + mAll[m] : (m === 0 ? "" : mAll[m]);
        // Wrap the minute string in the blue class
        let mCard = mStr ? `<span class="cardinal-num">${mStr}</span>` : "";
        return `Godzina <span class="nom-case">${hNom[h]}</span> ${mCard}`.trim();
    } else {
        let h12 = h % 12, n12 = (h + 1) % 12;
        if (m === 0) return `<span class="nom-case">${hNom[h12]}</span>`;
        // Wrap minutes in blue cardinal-num class
        if (m < 30) return `<span class="cardinal-num">${mAll[m]}</span> po <span class="gen-case">${hGen[h12]}</span>`;
        if (m === 30) return `w pół do <span class="gen-case">${hGen[n12]}</span>`;
        return `za <span class="cardinal-num">${mAll[60-m]}</span> <span class="nom-case">${hNom[n12]}</span>`;
    }
}
function manualTime(val) {
    isLive = false;
    if(!val.includes(':')) return;
    const parts = val.split(':');
    let ph = parseInt(parts[0]), pm = parseInt(parts[1]);
    if(!isNaN(ph) && !isNaN(pm)) {
        hours = Math.min(23, Math.max(0, ph));
        minutes = Math.min(59, Math.max(0, pm));
        updateDisplay(false);
    }
}

async function toggleHelp() {
    const modal = document.getElementById('help-modal');
    if (modal.style.display === 'block') { modal.style.display = 'none'; return; }
    const helpFile = currentLang === 'PL' ? 'help_pl.html' : 'help_en.html';
    try {
        const r = await fetch(helpFile);
        document.getElementById('help-content').innerHTML = await r.text();
        modal.style.display = 'block';
    } catch (e) { modal.style.display = 'block'; }
}

function toggleLang() {
    currentLang = (currentLang === 'EN' ? 'PL' : 'EN');
    if (isQuiz) isRevealed = false; // Keep quiz hidden after language swap
    const d = dict[currentLang];
    document.getElementById('app-title').innerText = d.title;
    document.getElementById('btn-real').innerText = d.actual;
    document.getElementById('btn-random').innerText = d.random;
    document.getElementById('btn-listen').innerText = d.listen;
    document.getElementById('btn-slow').innerText = d.slow;
    document.getElementById('quiz-toggle').innerText = isQuiz ? d.qOn : d.qOff;
    document.getElementById('help-close').innerText = d.close;
    updateDisplay(true);
}
