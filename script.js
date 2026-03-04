const COLORS = ['red', 'yellow', 'green', 'blue'];
const BLOCK_INTERVAL_MS = 1000;
const BLOCK_INTERVAL_EP2_MS = 1500;
const HIDE_DELAY_MS = 1000;
const HIDE_DELAY_EP2_MS = 5000;
const EPREUVE_CONFIG = {
  1: { blocks: 5, timerSec: 30 },
  2: { blocks: 9, timerSec: 50 },
};

const timerEl = document.getElementById('timer');
const sequenceArea = document.getElementById('sequenceArea');
const blocks = Array.from(sequenceArea.querySelectorAll('.block'));
const playerSelectionArea = document.getElementById('playerSelectionArea');
const playerSelectionBlocks = Array.from(playerSelectionArea.querySelectorAll('.block'));
const btnStart = document.getElementById('btnStart');
const playerHint = document.getElementById('playerHint');
const colorButtons = document.querySelectorAll('.btn-color');
const resultOverlay = document.getElementById('resultOverlay');
const resultBox = document.getElementById('resultBox');
const resultTitle = document.getElementById('resultTitle');
const resultMessage = document.getElementById('resultMessage');
const btnReplay = document.getElementById('btnReplay');
const bgMusic = document.getElementById('bgMusic');
const musicToggle = document.getElementById('musicToggle');
const epreuveBadge = document.getElementById('epreuveBadge');

let sequence = [];
let playerChoices = [];
let timerId = null;
let gamePhase = 'idle';
let currentEpreuve = 1;
let totalBlocks = 5;
let turnDurationSec = 30;

function getConfig() {
  const cfg = EPREUVE_CONFIG[currentEpreuve] || EPREUVE_CONFIG[1];
  totalBlocks = cfg.blocks;
  turnDurationSec = cfg.timerSec;
}

function t(key) {
  return (typeof window.getJ1Text === 'function' ? window.getJ1Text(key) : key);
}

function setBlocksMode() {
  getConfig();
  sequenceArea.className = 'sequence-area blocks-' + totalBlocks;
  playerSelectionArea.className = 'player-selection-area blocks-' + totalBlocks;
  epreuveBadge.textContent = t('j1_epreuve' + currentEpreuve);
}

/** Retourne true si la séquence est trop facile (ex. rouge-bleu-rouge-bleu ou A-B-C-A-B-C). */
function isEasyPattern(seq) {
  if (seq.length < 2) return false;
  var len = seq.length;
  var i;

  /* Alternance stricte type A-B-A-B ou A-B-A-B-A */
  var a = seq[0];
  var b = seq[1];
  var alternating = true;
  for (i = 0; i < len; i++) {
    if (i % 2 === 0 && seq[i] !== a) { alternating = false; break; }
    if (i % 2 === 1 && seq[i] !== b) { alternating = false; break; }
  }
  if (alternating) return true;

  /* Motif répété par 3 type A-B-C-A-B-C */
  if (len >= 3) {
    var p3 = true;
    for (i = 0; i < len; i++) {
      if (seq[i] !== seq[i % 3]) { p3 = false; break; }
    }
    if (p3) return true;
  }

  return false;
}

function randomSequence(len) {
  let seq;
  do {
    seq = [];
    let prev = null;
    for (let i = 0; i < len; i++) {
      let c;
      do {
        c = COLORS[Math.floor(Math.random() * COLORS.length)];
      } while (c === prev);
      prev = c;
      seq.push(c);
    }
  } while (isEasyPattern(seq));
  return seq;
}

function hideAllBlocks() {
  blocks.forEach((block, i) => {
    if (i < totalBlocks) {
      block.className = 'block hidden';
      block.removeAttribute('data-color');
    }
  });
}

function showBlock(index, color) {
  if (index >= blocks.length) return;
  const block = blocks[index];
  block.className = `block ${color}`;
  block.setAttribute('data-color', color);
}

function hideAllPlayerSelection() {
  playerChoices = [];
  playerSelectionBlocks.forEach((block, i) => {
    if (i < totalBlocks) {
      block.className = 'block hidden';
      block.removeAttribute('data-color');
    }
  });
}

function showPlayerSelection(index, color) {
  if (index >= playerSelectionBlocks.length) return;
  const block = playerSelectionBlocks[index];
  block.className = `block ${color}`;
  block.setAttribute('data-color', color);
}

function setTimerVisible(show) {
  timerEl.setAttribute('aria-hidden', show ? 'false' : 'true');
  if (!show) {
    timerEl.classList.remove('warning', 'danger');
    timerEl.textContent = turnDurationSec;
  }
}

function startCountdown() {
  let left = turnDurationSec;
  timerEl.textContent = left;
  timerEl.classList.remove('warning', 'danger');

  timerId = setInterval(() => {
    left--;
    timerEl.textContent = left;
    if (left <= 10) timerEl.classList.add('danger');
    else if (left <= 15) timerEl.classList.add('warning');

    if (left <= 0) {
      clearInterval(timerId);
      timerId = null;
      evaluateAndShowResult(false, t('j1_result_time'));
    }
  }, 1000);
}

function stopCountdown() {
  if (timerId) {
    clearInterval(timerId);
    timerId = null;
  }
  setTimerVisible(false);
}

function setButtonsEnabled(enabled) {
  colorButtons.forEach((btn) => (btn.disabled = !enabled));
}

function showResultOverlay(won, title, message) {
  resultBox.classList.remove('win', 'lose');
  resultBox.classList.add(won ? 'win' : 'lose');
  resultTitle.textContent = title;
  resultMessage.textContent = message;
  resultOverlay.classList.add('visible');
}

function hideResultOverlay() {
  resultOverlay.classList.remove('visible');
}

function arraysEqual(a, b) {
  if (a.length !== b.length) return false;
  for (let i = 0; i < a.length; i++) if (a[i] !== b[i]) return false;
  return true;
}

/** Évalue la sélection uniquement quand le joueur a tout rempli, puis affiche le résultat. */
function evaluateAndShowResult(won, message) {
  gamePhase = 'idle';
  stopCountdown();
  setButtonsEnabled(false);
  btnStart.textContent = t('j1_btn_replay');
  btnStart.style.display = 'block';

  if (won) {
    if (currentEpreuve === 1) {
      btnReplay.style.display = 'none';
      showResultOverlay(true, t('j1_result_win'), message || t('j1_result_ep1_pass'));
      setTimeout(() => {
        hideResultOverlay();
        btnReplay.style.display = 'block';
        btnReplay.textContent = t('j1_btn_replay');
        btnReplay.onclick = onReplayClick;
        startEpreuve2();
      }, 2000);
      return;
    }
    if (currentEpreuve === 2) {
      try { localStorage.setItem('clement-game-completed', '1'); } catch (e) {}
      try {
        var sc = parseInt(localStorage.getItem('clement-starcoin'), 10) || 0;
        localStorage.setItem('clement-starcoin', String(sc + 20000));
      } catch (e) {}
      btnReplay.style.display = 'block';
      btnReplay.textContent = t('j1_btn_back_home');
      btnReplay.onclick = function() { window.location.href = 'index.html'; };
      showResultOverlay(true, t('j1_result_win'), message || t('j1_result_ep2_pass'));
    }
    return;
  }

  btnReplay.style.display = 'block';
  btnReplay.textContent = t('btn_quit');
  btnReplay.onclick = function() { window.location.href = 'pintro.html'; };
  showResultOverlay(false, t('j1_result_lose'), message || '');
}

function onReplayClick() {
  hideResultOverlay();
  currentEpreuve = 1;
  setBlocksMode();
  startGame();
}

function startEpreuve2() {
  currentEpreuve = 2;
  setBlocksMode();
  btnStart.style.display = 'none';
  playerHint.textContent = t('j1_hint_watch_ep2');
  setTimerVisible(false);
  hideAllPlayerSelection();
  sequence = randomSequence(totalBlocks);
  showSequence();
}

async function showSequence() {
  gamePhase = 'showing';
  setButtonsEnabled(false);
  hideAllBlocks();
  hideAllPlayerSelection();

  const intervalMs = currentEpreuve === 2 ? BLOCK_INTERVAL_EP2_MS : BLOCK_INTERVAL_MS;
  for (let i = 0; i < sequence.length; i++) {
    showBlock(i, sequence[i]);
    await new Promise((r) => setTimeout(r, intervalMs));
  }

  const hideDelayMs = currentEpreuve === 2 ? HIDE_DELAY_EP2_MS : HIDE_DELAY_MS;
  await new Promise((r) => setTimeout(r, hideDelayMs));
  hideAllBlocks();

  gamePhase = 'playing';
  playerChoices = [];
  playerHint.textContent = t('j1_hint_reproduce');
  setTimerVisible(true);
  startCountdown();
  setButtonsEnabled(true);
}

function onColorClick(color) {
  if (gamePhase !== 'playing') return;
  if (playerChoices.length >= totalBlocks) return;

  playerChoices.push(color);
  showPlayerSelection(playerChoices.length - 1, color);

  if (playerChoices.length < totalBlocks) return;

  const won = arraysEqual(playerChoices, sequence);
  if (won) {
    if (currentEpreuve === 1) {
      evaluateAndShowResult(true, t('j1_result_ep1_pass'));
    } else {
      evaluateAndShowResult(true, t('j1_result_ep2_pass'));
    }
    return;
  }

  evaluateAndShowResult(false, t('j1_result_wrong'));
}

function startGame() {
  getConfig();
  sequence = randomSequence(totalBlocks);
  playerHint.textContent = currentEpreuve === 1 ? t('j1_hint_watch') : t('j1_hint_watch_ep2');
  btnStart.style.display = 'none';
  setTimerVisible(false);
  hideAllPlayerSelection();
  showSequence();
}

function toggleMusic() {
  if (bgMusic.paused) {
    bgMusic.play().catch(() => {});
    musicToggle.textContent = '🔊';
    musicToggle.classList.remove('muted');
  } else {
    bgMusic.pause();
    musicToggle.textContent = '🔇';
    musicToggle.classList.add('muted');
  }
}

bgMusic.addEventListener('error', () => {
  const s = bgMusic.querySelector('source');
  if (s && s.getAttribute('src') && s.getAttribute('src').indexOf('beast-game') !== -1) {
    const fallback = 'https://cdn.pixabay.com/audio/2022/05/27/audio_81b2d940f0.mp3';
    s.src = fallback;
    bgMusic.load();
  }
});

btnStart.addEventListener('click', startGame);
btnReplay.onclick = onReplayClick;
musicToggle.addEventListener('click', toggleMusic);
colorButtons.forEach((btn) => {
  btn.addEventListener('click', () => onColorClick(btn.dataset.color));
});

setBlocksMode();
hideAllBlocks();
hideAllPlayerSelection();
setButtonsEnabled(false);

// Activer la musique dès le début du jeu
function startMusic() {
  if (bgMusic && bgMusic.paused) bgMusic.play().catch(function() {});
}
document.addEventListener('DOMContentLoaded', startMusic);
document.body.addEventListener('click', startMusic, { once: true });
document.body.addEventListener('touchstart', startMusic, { once: true });
