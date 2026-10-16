// ============================================
// ХИМИЧЕСКИЙ ПРОФАЙЛЕР — логика
// ============================================

const QUESTIONS_PER_QUIZ = 15;

let activeQuestions = [];
let currentQuestion = 0;
let scores = { theory: 0, practice: 0, analysis: 0, synthesis: 0, macro: 0, micro: 0, careful: 0, risk: 0 };
let startTime = null;
let timerInterval = null;

// Дуэль
let duelMode = false;
let duelPlayer = 1;
let duelResults = [null, null];
let duelNames = ['Игрок 1', 'Игрок 2'];

// DOM
const startBtn = document.getElementById('startBtn');
const duelBtn = document.getElementById('duelBtn');
const restartBtn = document.getElementById('restartBtn');
const historyBtn = document.getElementById('historyBtn');
const backFromHistory = document.getElementById('backFromHistory');
const shareBtn = document.getElementById('shareBtn');

const duelStartBtn = document.getElementById('duelStartBtn');
const backFromDuel = document.getElementById('backFromDuel');
const duelRestart = document.getElementById('duelRestart');

const startScreen = document.getElementById('screen-start');
const historyScreen = document.getElementById('screen-history');
const duelIntroScreen = document.getElementById('screen-duel-intro');
const quizScreen = document.getElementById('screen-quiz');
const resultScreen = document.getElementById('screen-result');
const duelResultScreen = document.getElementById('screen-duel-result');

const questionWrap = document.getElementById('questionWrap');
const questionText = document.getElementById('questionText');
const answersBox = document.getElementById('answers');
const progressBar = document.getElementById('progressBar');
const qCurrent = document.getElementById('qCurrent');
const qTotal = document.getElementById('qTotal');
const scoreDisplay = document.getElementById('scoreDisplay');
const timerDisplay = document.getElementById('timerDisplay');
const playerBadge = document.getElementById('playerBadge');

qTotal.textContent = QUESTIONS_PER_QUIZ;

// ============================================
// ТЕМА
// ============================================
const themeBtn = document.getElementById('themeBtn');
if (localStorage.getItem('chem-theme') === 'light') {
  document.body.classList.add('light');
  themeBtn.textContent = '☀️';
}
themeBtn.addEventListener('click', () => {
  document.body.classList.toggle('light');
  const isLight = document.body.classList.contains('light');
  themeBtn.textContent = isLight ? '☀️' : '🌙';
  localStorage.setItem('chem-theme', isLight ? 'light' : 'dark');
});

// ============================================
// КОЛЛЕКЦИЯ ТИПОВ
// ============================================
function renderCollection() {
  const unlocked = JSON.parse(localStorage.getItem('chem-collection') || '[]');
  document.getElementById('collectedCount').textContent = unlocked.length;

  const box = document.getElementById('collectionIcons');
  box.innerHTML = '';
  ALL_PROFILE_KEYS.forEach(key => {
    const div = document.createElement('div');
    div.className = 'collection-icon' + (unlocked.includes(key) ? ' unlocked' : '');
    div.textContent = PROFILES[key].icon;
    div.title = unlocked.includes(key) ? PROFILES[key].name : '???';
    box.appendChild(div);
  });
}
renderCollection();

// ============================================
// ВЫБОР ВОПРОСОВ
// ============================================
function pickQuestions() {
  const bank = [...QUESTIONS];
  for (let i = bank.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [bank[i], bank[j]] = [bank[j], bank[i]];
  }
  const selected = bank.slice(0, QUESTIONS_PER_QUIZ);
  for (let i = selected.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [selected[i], selected[j]] = [selected[j], selected[i]];
  }
  return selected;
}

// ============================================
// СТАРТ / РЕСТАРТ
// ============================================
startBtn.addEventListener('click', () => {
  duelMode = false;
  duelPlayer = 1;
  playerBadge.style.display = 'none';
  launchQuiz();
});

restartBtn.addEventListener('click', () => {
  duelMode = false;
  launchQuiz();
});

function launchQuiz() {
  activeQuestions = pickQuestions();
  currentQuestion = 0;
  scores = { theory: 0, practice: 0, analysis: 0, synthesis: 0, macro: 0, micro: 0, careful: 0, risk: 0 };
  startTime = Date.now();

  if (timerInterval) clearInterval(timerInterval);
  timerInterval = setInterval(() => {
    const sec = Math.floor((Date.now() - startTime) / 1000);
    const m = String(Math.floor(sec / 60)).padStart(2, '0');
    const s = String(sec % 60).padStart(2, '0');
    timerDisplay.textContent = `${m}:${s}`;
  }, 1000);

  showScreen(quizScreen);
  renderQuestion();
}

// ============================================
// ДУЭЛЬ
// ============================================
duelBtn.addEventListener('click', () => {
  showScreen(duelIntroScreen);
});

backFromDuel.addEventListener('click', () => {
  showScreen(startScreen);
});

duelStartBtn.addEventListener('click', () => {
  duelNames[0] = document.getElementById('player1Name').value.trim() || 'Игрок 1';
  duelNames[1] = document.getElementById('player2Name').value.trim() || 'Игрок 2';
  duelMode = true;
  duelPlayer = 1;
  duelResults = [null, null];
  startDuelPlayer(1);
});

function startDuelPlayer(n) {
  duelPlayer = n;
  playerBadge.style.display = 'block';
  playerBadge.textContent = `🎯 Ход: ${duelNames[n - 1]}`;
  launchQuiz();
}

// ============================================
// ПОКАЗ ЭКРАНОВ
// ============================================
function showScreen(screen) {
  document.querySelectorAll('.screen').forEach(s => s.classList.remove('active'));
  screen.classList.add('active');
  window.scrollTo({ top: 0, behavior: 'smooth' });
}

// ============================================
// ВОПРОСЫ + АНИМАЦИЯ ПЕРЕХОДА
// ============================================
function renderQuestion() {
  const q = activeQuestions[currentQuestion];
  questionText.textContent = q.text;
  qCurrent.textContent = currentQuestion + 1;
  progressBar.style.width = `${(currentQuestion / QUESTIONS_PER_QUIZ) * 100}%`;

  const totalScore = Object.values(scores).reduce((a, b) => a + b, 0);
  scoreDisplay.textContent = totalScore;

  answersBox.innerHTML = '';
  q.answers.forEach((ans) => {
    const btn = document.createElement('button');
    btn.className = 'answer';
    btn.textContent = ans.text;
    btn.addEventListener('click', () => selectAnswer(ans, btn));
    answersBox.appendChild(btn);
  });

  // Анимация: новый вопрос въезжает справа
  questionWrap.classList.remove('leaving');
  questionWrap.classList.add('entering');
  requestAnimationFrame(() => {
    requestAnimationFrame(() => {
      questionWrap.classList.remove('entering');
    });
  });
}

function selectAnswer(ans, btn) {
  document.querySelectorAll('.answer').forEach(b => b.classList.remove('selected'));
  btn.classList.add('selected');

  for (const key in ans.scores) {
    scores[key] += ans.scores[key];
  }

  const totalScore = Object.values(scores).reduce((a, b) => a + b, 0);
  scoreDisplay.textContent = totalScore;

  // Анимация: старый вопрос уезжает влево
  questionWrap.classList.add('leaving');

  setTimeout(() => {
    currentQuestion++;
    if (currentQuestion < QUESTIONS_PER_QUIZ) {
      renderQuestion();
    } else {
      if (timerInterval) clearInterval(timerInterval);
      if (duelMode) {
        handleDuelFinish();
      } else {
        showResult();
      }
    }
  }, 320);
}

// ============================================
// РЕЗУЛЬТАТ
// ============================================
function showResult() {
  progressBar.style.width = '100%';
  const totalTime = Math.floor((Date.now() - startTime) / 1000);

  const key = getProfileKey(scores);
  const profile = PROFILES[key];

  document.getElementById('resultIcon').textContent = profile.icon;
  document.getElementById('resultType').textContent = profile.name;
  document.getElementById('resultDesc').textContent = profile.desc;
  document.getElementById('rarityText').textContent = `Твой тип встречается у ${profile.rarity}% людей`;

  const totalScore = Object.values(scores).reduce((a, b) => a + b, 0);
  const maxScore = QUESTIONS_PER_QUIZ * 4;
  const accuracy = Math.round((totalScore / maxScore) * 100);

  document.getElementById('finalScore').textContent = totalScore;
  document.getElementById('finalAccuracy').textContent = accuracy + '%';
  const m = String(Math.floor(totalTime / 60)).padStart(1, '0');
  const s = String(totalTime % 60).padStart(2, '0');
  document.getElementById('finalTime').textContent = `${m}:${s}`;

  drawRadar();
  drawScales();
  drawAchievements(totalTime);
  drawRecommendations(profile);

  const careersList = document.getElementById('careersList');
  careersList.innerHTML = '';
  profile.careers.forEach(c => {
    const li = document.createElement('li');
    li.textContent = c;
    careersList.appendChild(li);
  });

  document.getElementById('famousText').textContent = profile.famous;

  // Сохраняем в коллекцию
  const unlocked = JSON.parse(localStorage.getItem('chem-collection') || '[]');
  if (!unlocked.includes(key)) {
    unlocked.push(key);
    localStorage.setItem('chem-collection', JSON.stringify(unlocked));
  }
  renderCollection();

  saveToHistory({
    type: profile.name, icon: profile.icon,
    date: new Date().toLocaleString('ru-RU'),
    score: totalScore, accuracy: accuracy, time: totalTime
  });

  launchConfetti('confetti');
  showScreen(resultScreen);
}

// ============================================
// ДУЭЛЬ — финиш игрока и итог
// ============================================
function handleDuelFinish() {
  const totalTime = Math.floor((Date.now() - startTime) / 1000);
  const key = getProfileKey(scores);
  const profile = PROFILES[key];
  const totalScore = Object.values(scores).reduce((a, b) => a + b, 0);

  duelResults[duelPlayer - 1] = {
    key: key, profile: profile,
    score: totalScore, time: totalTime,
    scores: { ...scores }
  };

  // Сохраняем в коллекцию
  const unlocked = JSON.parse(localStorage.getItem('chem-collection') || '[]');
  if (!unlocked.includes(key)) {
    unlocked.push(key);
    localStorage.setItem('chem-collection', JSON.stringify(unlocked));
  }
  renderCollection();

  if (duelPlayer === 1) {
    setTimeout(() => startDuelPlayer(2), 400);
  } else {
    showDuelResult();
  }
}

function showDuelResult() {
  const r1 = duelResults[0];
  const r2 = duelResults[1];

  document.getElementById('duelIcon1').textContent = r1.profile.icon;
  document.getElementById('duelIcon2').textContent = r2.profile.icon;
  document.getElementById('duelName1').textContent = duelNames[0];
  document.getElementById('duelName2').textContent = duelNames[1];
  document.getElementById('duelType1').textContent = r1.profile.name;
  document.getElementById('duelType2').textContent = r2.profile.name;
  document.getElementById('duelScore1').textContent = `Очков: ${r1.score} · Время: ${r1.time}с`;
  document.getElementById('duelScore2').textContent = `Очков: ${r2.score} · Время: ${r2.time}с`;

  let verdict = '';
  if (r1.score > r2.score) verdict = `🏆 Победил ${duelNames[0]}!`;
  else if (r2.score > r1.score) verdict = `🏆 Победил ${duelNames[1]}!`;
  else verdict = '🤝 Ничья!';
  document.getElementById('duelVerdict').textContent = verdict;

  // Сравнение
  const compare = document.getElementById('duelComparison');
  compare.innerHTML = '<h4>🔍 Сравнение профилей</h4>';

  const axes = ['theory', 'analysis', 'micro', 'careful'];
  const axisNames = { theory: 'Теория', analysis: 'Анализ', micro: 'Микро', careful: 'Осторожность' };

  axes.forEach(axis => {
    const v1 = r1.scores[axis];
    const v2 = r2.scores[axis];
    let line = '';
    if (v1 > v2) line = `${duelNames[0]} более выражен по оси <b>${axisNames[axis]}</b>`;
    else if (v2 > v1) line = `${duelNames[1]} более выражен по оси <b>${axisNames[axis]}</b>`;
    else line = `По оси <b>${axisNames[axis]}</b> — равенство`;
    const p = document.createElement('p');
    p.innerHTML = line;
    compare.appendChild(p);
  });

  launchConfetti('confettiDuel');
  showScreen(duelResultScreen);
}

duelRestart.addEventListener('click', () => {
  showScreen(duelIntroScreen);
});

// ============================================
// РАДАР
// ============================================
function drawRadar() {
  const total1 = scores.theory + scores.practice || 1;
  const total2 = scores.analysis + scores.synthesis || 1;
  const total3 = scores.micro + scores.macro || 1;
  const total4 = scores.careful + scores.risk || 1;

  const theory = scores.theory / total1;
  const analysis = scores.analysis / total2;
  const micro = scores.micro / total3;
  const careful = scores.careful / total4;

  const R = 120;
  const points = `0,${-R * theory} ${R * analysis},0 0,${R * micro} ${-R * careful},0`;
  document.getElementById('radarPolygon').setAttribute('points', points);
}

// ============================================
// ШКАЛЫ
// ============================================
function drawScales() {
  const total1 = scores.theory + scores.practice || 1;
  const total2 = scores.analysis + scores.synthesis || 1;
  const total3 = scores.micro + scores.macro || 1;
  const total4 = scores.careful + scores.risk || 1;

  const scales = [
    { name: 'Теория / Практика', a: scores.theory, b: scores.practice, total: total1 },
    { name: 'Анализ / Синтез', a: scores.analysis, b: scores.synthesis, total: total2 },
    { name: 'Микро / Макро', a: scores.micro, b: scores.macro, total: total3 },
    { name: 'Осторожность / Риск', a: scores.careful, b: scores.risk, total: total4 }
  ];

  const scalesBox = document.getElementById('scales');
  scalesBox.innerHTML = '';

  scales.forEach(s => {
    const percent = Math.round((s.a / s.total) * 100);
    const div = document.createElement('div');
    div.className = 'scale';
    div.innerHTML = `
      <div class="scale-name">${s.name}</div>
      <div class="scale-bar"><div class="scale-fill" style="width:${percent}%"></div></div>
      <div class="scale-value">${percent}% / ${100 - percent}%</div>
    `;
    scalesBox.appendChild(div);
  });
}

// ============================================
// ДОСТИЖЕНИЯ
// ============================================
function drawAchievements(time) {
  const box = document.getElementById('achievementsGrid');
  box.innerHTML = '';

  const all = [
    { icon: '⚡', text: 'Скорость света', got: time < 90 },
    { icon: '🐢', text: 'Вдумчивый', got: time > 300 },
    { icon: '🌟', text: 'Эрудит', got: Object.values(scores).every(v => v > 2) },
    { icon: '🔥', text: 'Максималист', got: Math.max(...Object.values(scores)) > 15 },
    { icon: '🎯', text: 'Полный спектр', got: Object.values(scores).filter(v => v > 0).length === 8 },
    { icon: '🎓', text: 'Первый шаг', got: true }
  ];

  all.forEach(a => {
    const div = document.createElement('div');
    div.className = 'achievement' + (a.got ? '' : ' locked');
    div.textContent = `${a.icon} ${a.text}`;
    box.appendChild(div);
  });
}

// ============================================
// РЕКОМЕНДАЦИИ
// ============================================
function drawRecommendations(profile) {
  const box = document.getElementById('recGrid');
  box.innerHTML = '';
  if (!profile.rec) return;

  const blocks = [
    { key: 'books', label: '📖 Книги' },
    { key: 'movies', label: '🎬 Фильмы' },
    { key: 'channels', label: '📺 Каналы' },
    { key: 'courses', label: '🎓 Курсы' }
  ];

  blocks.forEach(b => {
    if (!profile.rec[b.key]) return;
    const div = document.createElement('div');
    div.className = 'rec-block';
    const ul = profile.rec[b.key].map(x => `<li>${x}</li>`).join('');
    div.innerHTML = `<div class="rec-label">${b.label}</div><ul>${ul}</ul>`;
    box.appendChild(div);
  });
}

// ============================================
// КОНФЕТТИ
// ============================================
function launchConfetti(id) {
  const box = document.getElementById(id);
  if (!box) return;
  box.innerHTML = '';
  const colors = ['#7dd3fc', '#38bdf8', '#fbbf24', '#f472b6', '#a78bfa'];

  for (let i = 0; i < 60; i++) {
    const piece = document.createElement('div');
    piece.className = 'confetti-piece';
    piece.style.left = Math.random() * 100 + '%';
    piece.style.background = colors[Math.floor(Math.random() * colors.length)];
    piece.style.animationDelay = Math.random() * 2 + 's';
    piece.style.animationDuration = (2 + Math.random() * 2) + 's';
    box.appendChild(piece);
  }
  setTimeout(() => box.innerHTML = '', 5000);
}

// ============================================
// ИСТОРИЯ
// ============================================
function saveToHistory(entry) {
  const history = JSON.parse(localStorage.getItem('chem-profiler-history') || '[]');
  history.unshift(entry);
  if (history.length > 20) history.pop();
  localStorage.setItem('chem-profiler-history', JSON.stringify(history));
}

function renderHistory() {
  const box = document.getElementById('historyList');
  const history = JSON.parse(localStorage.getItem('chem-profiler-history') || '[]');
  box.innerHTML = '';
  if (history.length === 0) {
    box.innerHTML = '<p style="opacity:0.5">Пока нет прохождений.</p>';
    return;
  }
  history.forEach(h => {
    const div = document.createElement('div');
    div.className = 'history-item';
    div.innerHTML = `
      <div class="type">${h.icon} ${h.type}</div>
      <div class="date">${h.date} · очков: ${h.score} · точность: ${h.accuracy}%</div>
    `;
    box.appendChild(div);
  });
}

historyBtn.addEventListener('click', () => {
  renderHistory();
  showScreen(historyScreen);
});

backFromHistory.addEventListener('click', () => {
  showScreen(startScreen);
});

// ============================================
// ШАРИНГ
// ============================================
shareBtn.addEventListener('click', async () => {
  const type = document.getElementById('resultType').textContent;
  const text = `Я прошёл химический профайлер! Мой тип: ${type} ⚗️`;
  if (navigator.share) {
    try { await navigator.share({ title: 'ХИМИЧЕСКИЙ ПРОФАЙЛЕР', text }); } catch (e) {}
  } else {
    await navigator.clipboard.writeText(text);
    shareBtn.textContent = '✓ Скопировано';
    setTimeout(() => shareBtn.textContent = '📤 Поделиться', 2000);
  }
});