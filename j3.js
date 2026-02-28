(function() {
  var TOTAL_ROWS = 7;
  var DUMMY_PRICE = 10000;
  var SKIP_CODE = '1428';
  var STARCOIN_KEY = 'clement-starcoin';

  var safeColumns = [];
  var currentRow = 0;
  var dummies = 0;
  var safeRevealed = false;

  var rulesModal = document.getElementById('j3RulesModal');
  var rulesBtn = document.getElementById('j3RulesBtn');
  var rulesTitle = document.getElementById('j3RulesTitle');
  var rulesText = document.getElementById('j3RulesText');
  var skipModal = document.getElementById('j3SkipModal');
  var skipLink = document.getElementById('j3SkipLink');
  var skipInput = document.getElementById('j3SkipInput');
  var skipError = document.getElementById('j3SkipError');
  var skipSubmit = document.getElementById('j3SkipSubmit');
  var skipModalTitle = document.getElementById('j3SkipModalTitle');
  var confirmBuyModal = document.getElementById('j3ConfirmBuyModal');
  var confirmBuyTitle = document.getElementById('j3ConfirmBuyTitle');
  var confirmBuyText = document.getElementById('j3ConfirmBuyText');
  var confirmBuyConfirm = document.getElementById('j3ConfirmBuyConfirm');
  var confirmBuyCancel = document.getElementById('j3ConfirmBuyCancel');
  var dummyTrapModal = document.getElementById('j3DummyTrapModal');
  var dummyTrapTitle = document.getElementById('j3DummyTrapTitle');
  var dummyTrapText = document.getElementById('j3DummyTrapText');
  var dummyTrapBtn = document.getElementById('j3DummyTrapBtn');
  var starcoinBadge = document.getElementById('j3StarcoinBadge');
  var subtitle = document.getElementById('j3Subtitle');
  var rowLabel = document.getElementById('j3RowLabel');
  var tileLeft = document.getElementById('j3TileLeft');
  var tileRight = document.getElementById('j3TileRight');
  var btnBuyDummy = document.getElementById('j3BtnBuyDummy');
  var btnUseDummy = document.getElementById('j3BtnUseDummy');
  var dummyCountEl = document.getElementById('j3DummyCount');
  var resultOverlay = document.getElementById('j3ResultOverlay');
  var resultBox = document.getElementById('j3ResultBox');
  var resultTitle = document.getElementById('j3ResultTitle');
  var resultExplain = document.getElementById('j3ResultExplain');
  var btnBack = document.getElementById('j3BtnBack');
  var btnRestart = document.getElementById('j3BtnRestart');

  function t(key) {
    return (typeof window.getText === 'function' ? window.getText(key) : key);
  }

  function getStarcoin() {
    return parseInt(localStorage.getItem(STARCOIN_KEY), 10) || 0;
  }

  function setStarcoin(n) {
    localStorage.setItem(STARCOIN_KEY, String(n));
    if (starcoinBadge) starcoinBadge.textContent = '⭐ ' + n.toLocaleString('fr-FR');
  }

  function updateDummyUI() {
    var sc = getStarcoin();
    if (btnBuyDummy) btnBuyDummy.disabled = sc < DUMMY_PRICE;
    if (btnUseDummy) {
      if (dummies > 0 && !safeRevealed) btnUseDummy.classList.remove('hidden');
      else btnUseDummy.classList.add('hidden');
    }
    if (dummyCountEl) dummyCountEl.textContent = dummies > 0 ? t('j3_dummy_count') + ' ' + dummies : '';
  }

  function generateBridge() {
    safeColumns = [];
    for (var i = 0; i < TOTAL_ROWS; i++) {
      safeColumns.push(Math.random() < 0.5 ? 0 : 1);
    }
  }

  function resetTiles() {
    if (tileLeft) {
      tileLeft.disabled = false;
      tileLeft.classList.remove('safe-revealed', 'trap-revealed');
      tileLeft.textContent = t('j3_left');
    }
    if (tileRight) {
      tileRight.disabled = false;
      tileRight.classList.remove('safe-revealed', 'trap-revealed');
      tileRight.textContent = t('j3_right');
    }
    if (rowLabel) rowLabel.textContent = t('j3_row_of').replace('{n}', currentRow + 1).replace('{total}', TOTAL_ROWS);
    if (!safeRevealed) updateDummyUI();
  }

  function resetTilesFull() {
    safeRevealed = false;
    resetTiles();
  }

  function choose(col) {
    var safe = safeColumns[currentRow];
    if (safeRevealed) {
      if (col !== safe) return;
      currentRow++;
      if (currentRow >= TOTAL_ROWS) {
        win();
        return;
      }
      resetTilesFull();
      return;
    }
    if (col === safe) {
      currentRow++;
      if (currentRow >= TOTAL_ROWS) {
        win();
        return;
      }
      resetTilesFull();
    } else {
      lose();
    }
  }

  function win() {
    try { localStorage.setItem('clement-game-completed', '3'); } catch (e) {}
    try {
      var sc = parseInt(localStorage.getItem(STARCOIN_KEY), 10) || 0;
      localStorage.setItem(STARCOIN_KEY, String(sc + 20000));
    } catch (e) {}
    if (resultTitle) resultTitle.textContent = t('j3_win_msg');
    if (resultExplain) resultExplain.textContent = '';
    if (resultExplain) resultExplain.style.display = 'none';
    if (resultBox) { resultBox.classList.remove('lose'); resultBox.classList.add('win'); }
    if (btnBack) { btnBack.style.display = 'inline-block'; btnBack.textContent = t('j2_btn_back'); }
    if (btnRestart) btnRestart.style.display = 'none';
    if (resultOverlay) resultOverlay.classList.add('visible');
  }

  function lose() {
    try { localStorage.setItem('clement-game-completed', '0'); } catch (e) {}
    if (resultTitle) resultTitle.textContent = t('j3_lose_msg');
    if (resultExplain) {
      resultExplain.textContent = t('j3_lose_explain');
      resultExplain.style.display = 'block';
    }
    if (resultBox) { resultBox.classList.remove('win'); resultBox.classList.add('lose'); }
    if (btnBack) btnBack.style.display = 'none';
    if (btnRestart) {
      btnRestart.style.display = 'inline-block';
      btnRestart.textContent = t('j2_btn_restart');
      btnRestart.href = 'pintro.html';
    }
    if (resultOverlay) resultOverlay.classList.add('visible');
  }

  function useDummy() {
    if (dummies <= 0 || safeRevealed) return;
    safeRevealed = true;
    var safe = safeColumns[currentRow];
    var dummyTriesCol = Math.random() < 0.5 ? 0 : 1;
    var dummyFellOnTrap = (dummyTriesCol !== safe);
    if (dummyFellOnTrap) {
      dummies--;
      if (dummyTrapModal) {
        if (dummyTrapTitle && window.getText) dummyTrapTitle.textContent = window.getText('j3_dummy_trap_title');
        if (dummyTrapText && window.getText) dummyTrapText.textContent = window.getText('j3_dummy_trap_text');
        if (dummyTrapBtn && window.getText) dummyTrapBtn.textContent = window.getText('j3_dummy_trap_btn');
        dummyTrapModal.classList.remove('hidden');
      }
    }
    if (tileLeft) {
      tileLeft.classList.remove('safe-revealed', 'trap-revealed');
      if (dummyTriesCol === 0) tileLeft.classList.add(dummyFellOnTrap ? 'trap-revealed' : 'safe-revealed');
      tileLeft.disabled = (safe !== 0);
    }
    if (tileRight) {
      tileRight.classList.remove('safe-revealed', 'trap-revealed');
      if (dummyTriesCol === 1) tileRight.classList.add(dummyFellOnTrap ? 'trap-revealed' : 'safe-revealed');
      tileRight.disabled = (safe !== 1);
    }
    updateDummyUI();
  }

  function closeDummyTrapModal() {
    if (dummyTrapModal) dummyTrapModal.classList.add('hidden');
  }

  function buyDummy() {
    var sc = getStarcoin();
    if (sc < DUMMY_PRICE) return;
    setStarcoin(sc - DUMMY_PRICE);
    dummies++;
    updateDummyUI();
    if (confirmBuyModal) confirmBuyModal.classList.add('hidden');
  }

  function openConfirmBuyModal() {
    var sc = getStarcoin();
    if (sc < DUMMY_PRICE) return;
    if (confirmBuyModal) confirmBuyModal.classList.remove('hidden');
  }

  function closeConfirmBuyModal() {
    if (confirmBuyModal) confirmBuyModal.classList.add('hidden');
  }

  function startGame() {
    if (rulesModal) rulesModal.classList.add('hidden');
    generateBridge();
    currentRow = 0;
    dummies = 0;
    safeRevealed = false;
    setStarcoin(getStarcoin());
    resetTilesFull();
  }

  function skipWithCode() {
    var val = skipInput ? skipInput.value.trim() : '';
    if (val !== SKIP_CODE) {
      if (skipError) skipError.textContent = t('code_modal_wrong');
      return;
    }
    if (skipModal) skipModal.classList.add('hidden');
    if (skipError) skipError.textContent = '';
    if (skipInput) skipInput.value = '';
    try { localStorage.setItem('clement-game-completed', '3'); } catch (e) {}
    try {
      var sc = parseInt(localStorage.getItem(STARCOIN_KEY), 10) || 0;
      localStorage.setItem(STARCOIN_KEY, String(sc + 20000));
    } catch (e) {}
    window.location.href = 'index.html';
  }

  function openSkipModal() {
    if (skipError) skipError.textContent = '';
    if (skipInput) { skipInput.value = ''; skipInput.focus(); }
    if (skipModal) skipModal.classList.remove('hidden');
  }

  function initLang() {
    var code = localStorage.getItem('clement-game-lang') || 'fr';
    if (window.setLang) window.setLang(code);
    if (subtitle && window.getText) subtitle.textContent = window.getText('game3_unlocked');
    if (rulesTitle && window.getText) rulesTitle.textContent = window.getText('j3_rules_title');
    if (rulesText && window.getText) rulesText.textContent = window.getText('j3_rules_text');
    if (rulesBtn && window.getText) rulesBtn.textContent = window.getText('j1_btn_start');
    if (skipLink && window.getText) skipLink.textContent = window.getText('j2_skip_link');
    if (skipModalTitle && window.getText) skipModalTitle.textContent = window.getText('j2_skip_modal_title');
    if (skipInput && window.getText) skipInput.placeholder = window.getText('code_modal_placeholder');
    if (skipSubmit && window.getText) skipSubmit.textContent = window.getText('code_modal_submit');
    if (btnBuyDummy && window.getText) btnBuyDummy.textContent = t('j3_buy_dummy');
    if (btnUseDummy && window.getText) btnUseDummy.textContent = t('j3_use_dummy');
    if (btnBack && window.getText) btnBack.textContent = window.getText('j2_btn_back');
    if (btnRestart && window.getText) btnRestart.textContent = window.getText('j2_btn_restart');
    if (confirmBuyTitle && window.getText) confirmBuyTitle.textContent = window.getText('j3_buy_confirm_title');
    if (confirmBuyText && window.getText) confirmBuyText.textContent = window.getText('j3_buy_confirm_text');
    if (confirmBuyConfirm && window.getText) confirmBuyConfirm.textContent = window.getText('j3_buy_confirm_btn');
    if (confirmBuyCancel && window.getText) confirmBuyCancel.textContent = window.getText('j3_buy_cancel_btn');
    if (dummyTrapTitle && window.getText) dummyTrapTitle.textContent = window.getText('j3_dummy_trap_title');
    if (dummyTrapText && window.getText) dummyTrapText.textContent = window.getText('j3_dummy_trap_text');
    if (dummyTrapBtn && window.getText) dummyTrapBtn.textContent = window.getText('j3_dummy_trap_btn');
  }

  if (dummyTrapBtn) dummyTrapBtn.addEventListener('click', closeDummyTrapModal);
  if (tileLeft) tileLeft.addEventListener('click', function() { choose(0); });
  if (tileRight) tileRight.addEventListener('click', function() { choose(1); });
  if (btnBuyDummy) btnBuyDummy.addEventListener('click', openConfirmBuyModal);
  if (confirmBuyConfirm) confirmBuyConfirm.addEventListener('click', buyDummy);
  if (confirmBuyCancel) confirmBuyCancel.addEventListener('click', closeConfirmBuyModal);
  if (btnUseDummy) btnUseDummy.addEventListener('click', useDummy);
  if (rulesBtn) rulesBtn.addEventListener('click', startGame);
  if (skipLink) skipLink.addEventListener('click', openSkipModal);
  if (skipSubmit) skipSubmit.addEventListener('click', skipWithCode);
  if (skipInput) skipInput.addEventListener('keydown', function(e) { if (e.key === 'Enter') skipWithCode(); });

  initLang();
  setStarcoin(getStarcoin());
})();
