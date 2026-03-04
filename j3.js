(function() {
  var TOTAL_ROWS = 7;
  var DUMMY_PRICE = 10000;
  var SKIP_CODE = '1428';
  var STARCOIN_KEY = 'clement-starcoin';

  var safeColumns = [];
  var currentRow = 0;
  var dummies = 0;
  var dummyMode = false;
  var dummyRow = 0;
  var revealedUpToRow = -1;

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
  var dummySuccessModal = document.getElementById('j3DummySuccessModal');
  var dummySuccessTitle = document.getElementById('j3DummySuccessTitle');
  var dummySuccessText = document.getElementById('j3DummySuccessText');
  var dummySuccessBtn = document.getElementById('j3DummySuccessBtn');
  var eliteModal = document.getElementById('j3EliteModal');
  var eliteTitle = document.getElementById('j3EliteTitle');
  var eliteText = document.getElementById('j3EliteText');
  var eliteBtn = document.getElementById('j3EliteBtn');
  var starcoinBadge = document.getElementById('j3StarcoinBadge');
  var subtitle = document.getElementById('j3Subtitle');
  var rowLabel = document.getElementById('j3RowLabel');
  var bridgeEl = document.getElementById('j3Bridge');
  var rowTiles = [];
  if (bridgeEl) {
    var rows = bridgeEl.querySelectorAll('.j3-row');
    for (var i = 0; i < rows.length; i++) {
      var tiles = rows[i].querySelectorAll('.j3-tile');
      rowTiles.push({ left: tiles[0], right: tiles[1] });
    }
  }
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
    if (starcoinBadge) starcoinBadge.textContent = '💎 ' + n.toLocaleString('fr-FR');
  }

  function updateDummyUI() {
    var sc = getStarcoin();
    if (btnBuyDummy) btnBuyDummy.disabled = sc < DUMMY_PRICE;
    if (btnUseDummy) {
      if (dummies > 0 && !dummyMode) btnUseDummy.classList.remove('hidden');
      else btnUseDummy.classList.add('hidden');
    }
    if (dummyCountEl) dummyCountEl.textContent = dummies > 0 ? t('j3_dummy_count') + ' ' + dummies : '';
  }

  function getDisplayRow() {
    return dummyMode ? dummyRow : currentRow;
  }

  function updateRowLabel() {
    var r = getDisplayRow();
    var base = t('j3_row_of').replace('{n}', r + 1).replace('{total}', TOTAL_ROWS);
    if (rowLabel) rowLabel.textContent = dummyMode ? base + ' (' + t('j3_dummy_label') + ')' : base;
  }

  function generateBridge() {
    safeColumns = [];
    for (var i = 0; i < TOTAL_ROWS; i++) {
      safeColumns.push(Math.random() < 0.5 ? 0 : 1);
    }
  }

  function setTileEnabled(tile, enabled) {
    if (!tile) return;
    if (enabled) {
      tile.removeAttribute('disabled');
      tile.disabled = false;
    } else {
      tile.setAttribute('disabled', 'disabled');
      tile.disabled = true;
    }
  }

  function resetTiles() {
    var activeRow = getDisplayRow();
    for (var i = 0; i < rowTiles.length; i++) {
      var row = rowTiles[i];
      if (!row || !row.left || !row.right) continue;
      row.left.classList.remove('safe-revealed', 'trap-revealed');
      row.right.classList.remove('safe-revealed', 'trap-revealed');
      row.left.textContent = t('j3_left');
      row.right.textContent = t('j3_right');
      if (i === activeRow) {
        setTileEnabled(row.left, true);
        setTileEnabled(row.right, true);
        if (i < revealedUpToRow) {
          var safe = safeColumns[i];
          if (safe === 0) { row.left.classList.add('safe-revealed'); row.right.classList.add('trap-revealed'); }
          else { row.right.classList.add('safe-revealed'); row.left.classList.add('trap-revealed'); }
        }
      } else if (i < revealedUpToRow) {
        var safe = safeColumns[i];
        if (safe === 0) { row.left.classList.add('safe-revealed'); row.right.classList.add('trap-revealed'); }
        else { row.right.classList.add('safe-revealed'); row.left.classList.add('trap-revealed'); }
        setTileEnabled(row.left, false);
        setTileEnabled(row.right, false);
      } else {
        setTileEnabled(row.left, false);
        setTileEnabled(row.right, false);
      }
    }
    updateRowLabel();
    updateDummyUI();
  }

  function choose(col) {
    if (dummyMode) {
      dummyStep(col);
      return;
    }
    realPlayerStep(col);
  }

  function dummyStep(col) {
    var safe = safeColumns[dummyRow];
    if (col !== safe) {
      currentRow = 0;
      revealedUpToRow = dummyRow;
      dummyMode = false;
      if (dummyTrapModal) {
        if (dummyTrapTitle && window.getText) dummyTrapTitle.textContent = window.getText('j3_dummy_trap_title');
        if (dummyTrapText && window.getText) dummyTrapText.textContent = window.getText('j3_dummy_trap_text');
        if (dummyTrapBtn && window.getText) dummyTrapBtn.textContent = window.getText('j3_dummy_trap_btn');
        dummyTrapModal.classList.remove('hidden');
      }
      updateDummyUI();
      updateRowLabel();
      resetTiles();
      return;
    }
    dummyRow++;
    if (dummyRow >= TOTAL_ROWS) {
      dummyMode = false;
      if (dummySuccessModal) {
        if (dummySuccessTitle && window.getText) dummySuccessTitle.textContent = window.getText('j3_dummy_success_title');
        if (dummySuccessText && window.getText) dummySuccessText.textContent = window.getText('j3_dummy_success_text');
        if (dummySuccessBtn && window.getText) dummySuccessBtn.textContent = window.getText('j3_dummy_trap_btn');
        dummySuccessModal.classList.remove('hidden');
      }
      updateDummyUI();
      updateRowLabel();
      resetTiles();
      return;
    }
    updateRowLabel();
    resetTiles();
  }

  function realPlayerStep(col) {
    var safe = safeColumns[currentRow];
    if (col === safe) {
      currentRow++;
      if (currentRow >= TOTAL_ROWS) {
        win();
        return;
      }
      resetTiles();
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
    if (eliteTitle) eliteTitle.textContent = t('j3_elite_title');
    if (eliteText) eliteText.textContent = t('j3_elite_text');
    if (eliteBtn) eliteBtn.textContent = t('j2_btn_back');
    if (eliteModal) eliteModal.classList.remove('hidden');
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
      btnRestart.textContent = t('btn_quit');
      btnRestart.href = 'pintro.html';
    }
    if (resultOverlay) resultOverlay.classList.add('visible');
  }

  function useDummy() {
    if (dummies <= 0 || dummyMode) return;
    dummies--;
    dummyMode = true;
    dummyRow = currentRow;
    updateRowLabel();
    resetTiles();
  }

  function closeDummyTrapModal() {
    if (dummyTrapModal) dummyTrapModal.classList.add('hidden');
  }

  function closeDummySuccessModal() {
    if (dummySuccessModal) dummySuccessModal.classList.add('hidden');
  }

  function buyDummy(e) {
    if (e) { e.preventDefault(); e.stopPropagation(); }
    var sc = getStarcoin();
    if (sc < DUMMY_PRICE) return;
    setStarcoin(sc - DUMMY_PRICE);
    dummies++;
    updateDummyUI();
    if (confirmBuyModal) confirmBuyModal.classList.add('hidden');
    updateRowLabel();
    resetTiles();
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
    revealedUpToRow = -1;
    dummies = 0;
    dummyMode = false;
    dummyRow = 0;
    setStarcoin(getStarcoin());
    resetTiles();
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
    if (btnRestart && window.getText) btnRestart.textContent = window.getText('btn_quit');
    if (confirmBuyTitle && window.getText) confirmBuyTitle.textContent = window.getText('j3_buy_confirm_title');
    if (confirmBuyText && window.getText) confirmBuyText.textContent = window.getText('j3_buy_confirm_text');
    if (confirmBuyConfirm && window.getText) confirmBuyConfirm.textContent = window.getText('j3_buy_confirm_btn');
    if (confirmBuyCancel && window.getText) confirmBuyCancel.textContent = window.getText('j3_buy_cancel_btn');
    if (dummyTrapTitle && window.getText) dummyTrapTitle.textContent = window.getText('j3_dummy_trap_title');
    if (dummyTrapText && window.getText) dummyTrapText.textContent = window.getText('j3_dummy_trap_text');
    if (dummyTrapBtn && window.getText) dummyTrapBtn.textContent = window.getText('j3_dummy_trap_btn');
    if (dummySuccessTitle && window.getText) dummySuccessTitle.textContent = window.getText('j3_dummy_success_title');
    if (dummySuccessText && window.getText) dummySuccessText.textContent = window.getText('j3_dummy_success_text');
    if (dummySuccessBtn && window.getText) dummySuccessBtn.textContent = window.getText('j3_dummy_trap_btn');
    if (eliteTitle && window.getText) eliteTitle.textContent = window.getText('j3_elite_title');
    if (eliteText && window.getText) eliteText.textContent = window.getText('j3_elite_text');
    if (eliteBtn && window.getText) eliteBtn.textContent = window.getText('j2_btn_back');
  }

  if (dummyTrapBtn) dummyTrapBtn.addEventListener('click', closeDummyTrapModal);
  if (dummySuccessBtn) dummySuccessBtn.addEventListener('click', closeDummySuccessModal);
  if (bridgeEl) {
    bridgeEl.addEventListener('click', function(e) {
      var tile = e.target && e.target.classList && e.target.classList.contains('j3-tile') ? e.target : null;
      if (!tile) return;
      if (tile.getAttribute('disabled') !== null || tile.disabled) return;
      var rowEl = tile.closest('.j3-row');
      if (!rowEl) return;
      var rowIndex = parseInt(rowEl.getAttribute('data-row'), 10);
      if (isNaN(rowIndex)) return;
      var activeRow = getDisplayRow();
      if (rowIndex !== activeRow) return;
      var col = parseInt(tile.getAttribute('data-col'), 10);
      if (col === 0 || col === 1) choose(col);
    });
  }
  if (btnBuyDummy) btnBuyDummy.addEventListener('click', openConfirmBuyModal);
  if (confirmBuyConfirm) confirmBuyConfirm.addEventListener('click', function(e) { e.preventDefault(); e.stopPropagation(); buyDummy(e); });
  if (confirmBuyCancel) confirmBuyCancel.addEventListener('click', function(e) { e.preventDefault(); e.stopPropagation(); closeConfirmBuyModal(); });
  if (btnUseDummy) btnUseDummy.addEventListener('click', useDummy);
  if (rulesBtn) rulesBtn.addEventListener('click', startGame);
  if (skipLink) skipLink.addEventListener('click', openSkipModal);
  if (skipSubmit) skipSubmit.addEventListener('click', skipWithCode);
  if (skipInput) skipInput.addEventListener('keydown', function(e) { if (e.key === 'Enter') skipWithCode(); });

  initLang();
  setStarcoin(getStarcoin());
})();
