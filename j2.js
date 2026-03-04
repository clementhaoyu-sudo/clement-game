(function() {
  var ETAPE1_TARGET = 5;
  var ETAPE1_TOLERANCE = 0.05;
  var ETAPE1_MIN = ETAPE1_TARGET - ETAPE1_TOLERANCE;
  var ETAPE1_MAX = ETAPE1_TARGET + ETAPE1_TOLERANCE;
  var ETAPE2_MIN = 15;
  var ETAPE2_MAX = 17;

  var SKIP_PASSWORD = '1428';
  var STARCOIN_KEY = 'clement-starcoin';
  var RETRY_PRICE = 5000;
  var PASS_PRICE = 10000;

  var etape = 1;

  var display = document.getElementById('j2TimerDisplay');
  var timerWrap = document.getElementById('j2TimerWrap');
  var btnStop = document.getElementById('j2BtnStop');
  var resultOverlay = document.getElementById('j2ResultOverlay');
  var resultBox = document.getElementById('j2ResultBox');
  var resultTime = document.getElementById('j2ResultTime');
  var resultTitle = document.getElementById('j2ResultTitle');
  var btnBack = document.getElementById('j2BtnBack');
  var loseOptions = document.getElementById('j2LoseOptions');
  var btnRestart = document.getElementById('j2BtnRestart');
  var btnRetry = document.getElementById('j2BtnRetry');
  var btnPass = document.getElementById('j2BtnPass');
  var loseNotenough = document.getElementById('j2LoseNotenough');
  var confirmPayModal = document.getElementById('j2ConfirmPayModal');
  var confirmPayTitle = document.getElementById('j2ConfirmPayTitle');
  var confirmPayText = document.getElementById('j2ConfirmPayText');
  var confirmPayCancel = document.getElementById('j2ConfirmPayCancel');
  var confirmPayConfirm = document.getElementById('j2ConfirmPayConfirm');
  var instruction = document.getElementById('j2Instruction');
  var pendingPayment = null;
  var backHome = document.getElementById('backHome');
  var rulesModal = document.getElementById('j2RulesModal');
  var rulesBtn = document.getElementById('j2RulesBtn');
  var ep1SuccessModal = document.getElementById('j2Ep1SuccessModal');
  var ep1SuccessTime = document.getElementById('j2Ep1SuccessTime');
  var ep1SuccessBtn = document.getElementById('j2Ep1SuccessBtn');
  var ep2RulesModal = document.getElementById('j2Ep2RulesModal');
  var ep2RulesBtn = document.getElementById('j2Ep2RulesBtn');
  var ep2Area = document.getElementById('j2Ep2Area');
  var ep2Hint = document.getElementById('j2Ep2Hint');
  var btnStartEp2 = document.getElementById('j2BtnStart');
  var btnStopEp2 = document.getElementById('j2BtnStopEp2');
  var skipLink = document.getElementById('j2SkipLink');
  var skipModal = document.getElementById('j2SkipModal');
  var skipInput = document.getElementById('j2SkipInput');
  var skipError = document.getElementById('j2SkipError');
  var skipSubmit = document.getElementById('j2SkipSubmit');

  function t(key) {
    return (typeof window.getText === 'function' ? window.getText(key) : key);
  }

  var startTime = null;
  var rafId = null;
  var stopped = false;

  function updateDisplay() {
    if (stopped || !startTime || etape !== 1) return;
    var elapsed = (performance.now() - startTime) / 1000;
    var sec = Math.floor(elapsed);
    var hundredths = Math.floor((elapsed % 1) * 100);
    var str = sec + '.' + (hundredths < 10 ? '0' : '') + hundredths;
    if (display) display.textContent = str;
    rafId = requestAnimationFrame(updateDisplay);
  }

  function formatTime(sec) {
    var s = Math.floor(sec);
    var h = Math.floor((sec % 1) * 100);
    return s + '.' + (h < 10 ? '0' : '') + h;
  }

  function getStarcoin() {
    return parseInt(localStorage.getItem(STARCOIN_KEY), 10) || 0;
  }

  function setStarcoin(n) {
    localStorage.setItem(STARCOIN_KEY, String(n));
  }

  function showResult(timeStr, win, loseMsgKey) {
    if (resultTime) resultTime.textContent = t('j2_result_time') + ' ' + timeStr + ' s';
    if (resultOverlay) resultOverlay.classList.add('visible');
    if (resultTitle) resultTitle.textContent = win ? t('j2_success') : t(loseMsgKey);
    if (resultBox) {
      resultBox.classList.toggle('win', win);
      resultBox.classList.toggle('lose', !win);
    }
    if (btnBack) btnBack.style.display = win ? 'inline-block' : 'none';
    if (btnBack) { btnBack.textContent = t('j2_btn_back'); btnBack.href = 'index.html'; }
    if (loseOptions) loseOptions.style.display = win ? 'none' : 'flex';
    if (btnRestart) { btnRestart.textContent = t('btn_quit'); btnRestart.href = 'pintro.html'; }
    if (btnRetry) {
      btnRetry.textContent = t('j2_retry_btn');
      btnRetry.disabled = getStarcoin() < RETRY_PRICE;
    }
    if (btnPass) {
      btnPass.textContent = t('j2_pass_btn');
      btnPass.disabled = getStarcoin() < PASS_PRICE;
    }
    if (loseNotenough) loseNotenough.textContent = '';
    if (win) {
      try { localStorage.setItem('clement-game-completed', '2'); } catch (e) {}
      try { setStarcoin(getStarcoin() + 20000); } catch (e) {}
      try { sessionStorage.setItem('clement-show-bonus-reminder', '1'); } catch (e) {}
    } else {
      try { localStorage.setItem('clement-game-completed', '0'); } catch (e) {}
    }
  }

  function openConfirmPayModal(type) {
    pendingPayment = type;
    if (confirmPayModal && confirmPayTitle && confirmPayText) {
      if (type === 'retry') {
        confirmPayTitle.textContent = t('j2_confirm_retry_title');
        confirmPayText.textContent = t('j2_confirm_retry_text');
      } else {
        confirmPayTitle.textContent = t('j2_confirm_pass_title');
        confirmPayText.textContent = t('j2_confirm_pass_text');
      }
      if (confirmPayCancel) confirmPayCancel.textContent = t('j2_cancel_btn');
      if (confirmPayConfirm) confirmPayConfirm.textContent = t('j2_confirm_pay_btn');
      confirmPayModal.classList.remove('hidden');
    }
  }

  function closeConfirmPayModal() {
    pendingPayment = null;
    if (confirmPayModal) confirmPayModal.classList.add('hidden');
  }

  function payRetry() {
    var sc = getStarcoin();
    if (sc < RETRY_PRICE) {
      if (loseNotenough) loseNotenough.textContent = t('j2_not_enough_starcoins');
      return;
    }
    openConfirmPayModal('retry');
  }

  function doPayRetry() {
    var sc = getStarcoin();
    if (sc < RETRY_PRICE) return;
    setStarcoin(sc - RETRY_PRICE);
    closeConfirmPayModal();
    if (resultOverlay) resultOverlay.classList.remove('visible');
    if (etape === 1) {
      if (timerWrap) timerWrap.classList.remove('hidden');
      if (btnStop) btnStop.classList.remove('hidden');
      if (instruction) instruction.classList.remove('hidden');
      if (ep2Area) ep2Area.classList.add('hidden');
      startGame();
    } else {
      if (timerWrap) timerWrap.classList.add('hidden');
      if (btnStop) btnStop.classList.add('hidden');
      if (instruction) instruction.classList.add('hidden');
      if (ep2Area) ep2Area.classList.remove('hidden');
      if (ep2Hint) ep2Hint.classList.remove('hidden');
      if (btnStartEp2) btnStartEp2.classList.remove('hidden');
      if (btnStopEp2) btnStopEp2.classList.add('hidden');
    }
  }

  function payPass() {
    var sc = getStarcoin();
    if (sc < PASS_PRICE) {
      if (loseNotenough) loseNotenough.textContent = t('j2_not_enough_starcoins');
      return;
    }
    openConfirmPayModal('pass');
  }

  function doPayPass() {
    var sc = getStarcoin();
    if (sc < PASS_PRICE) return;
    setStarcoin(sc - PASS_PRICE);
    closeConfirmPayModal();
    if (resultOverlay) resultOverlay.classList.remove('visible');
    if (etape === 1) {
      etape = 2;
      if (timerWrap) timerWrap.classList.add('hidden');
      if (btnStop) btnStop.classList.add('hidden');
      if (instruction) instruction.classList.add('hidden');
      if (ep2Area) ep2Area.classList.add('hidden');
      goToEtape2();
    } else {
      try { localStorage.setItem('clement-game-completed', '2'); } catch (e) {}
      try { setStarcoin(getStarcoin() + 20000); } catch (e) {}
      try { sessionStorage.setItem('clement-show-bonus-reminder', '1'); } catch (e) {}
      if (resultTitle) resultTitle.textContent = t('j2_success');
      if (resultBox) { resultBox.classList.remove('lose'); resultBox.classList.add('win'); }
      if (btnBack) btnBack.style.display = 'inline-block';
      if (loseOptions) loseOptions.style.display = 'none';
      if (loseNotenough) loseNotenough.textContent = '';
      if (resultOverlay) resultOverlay.classList.add('visible');
    }
  }

  function stopTimerEtape1() {
    if (stopped || etape !== 1) return;
    stopped = true;
    if (rafId !== null) {
      cancelAnimationFrame(rafId);
      rafId = null;
    }
    var elapsed = (performance.now() - startTime) / 1000;
    var timeStr = formatTime(elapsed);
    var win = elapsed >= ETAPE1_MIN && elapsed <= ETAPE1_MAX;
    if (win) {
      etape = 2;
      if (ep1SuccessTime) ep1SuccessTime.textContent = t('j2_result_time') + ' ' + timeStr + ' s';
      if (ep1SuccessTime) ep1SuccessTime.classList.remove('hidden');
      if (ep1SuccessModal) ep1SuccessModal.classList.remove('hidden');
    } else {
      showResult(timeStr, false, 'j2_lose_msg');
    }
  }

  function goToEtape2() {
    if (ep1SuccessModal) ep1SuccessModal.classList.add('hidden');
    if (ep2RulesModal) ep2RulesModal.classList.remove('hidden');
  }

  function startEtape2Game() {
    if (ep2RulesModal) ep2RulesModal.classList.add('hidden');
    if (timerWrap) timerWrap.classList.add('hidden');
    if (btnStop) btnStop.classList.add('hidden');
    if (instruction) instruction.classList.add('hidden');
    if (ep2Area) ep2Area.classList.remove('hidden');
    if (ep2Hint) { ep2Hint.classList.remove('hidden'); if (window.getText) ep2Hint.textContent = window.getText('j2_ep2_instruction'); }
    if (btnStartEp2 && window.getText) btnStartEp2.textContent = window.getText('j2_btn_start');
    if (btnStopEp2 && window.getText) btnStopEp2.textContent = window.getText('j2_btn_stop');
  }

  function startChronoEp2() {
    startTime = performance.now();
    stopped = false;
    if (btnStartEp2) btnStartEp2.classList.add('hidden');
    if (btnStopEp2) btnStopEp2.classList.remove('hidden');
    if (ep2Hint) ep2Hint.classList.add('hidden');
  }

  function stopTimerEtape2() {
    if (stopped || !startTime) return;
    stopped = true;
    var elapsed = (performance.now() - startTime) / 1000;
    var timeStr = formatTime(elapsed);
    var win = elapsed >= ETAPE2_MIN && elapsed <= ETAPE2_MAX;
    showResult(timeStr, win, 'j2_ep2_lose_msg');
    if (btnStartEp2) btnStartEp2.classList.remove('hidden');
    if (btnStopEp2) btnStopEp2.classList.add('hidden');
  }

  function skipEpreuve() {
    var val = skipInput ? skipInput.value.trim() : '';
    if (val !== SKIP_PASSWORD) {
      if (skipError) skipError.textContent = t('j2_skip_wrong');
      return;
    }
    if (skipModal) skipModal.classList.add('hidden');
    if (skipError) skipError.textContent = '';
    if (skipInput) skipInput.value = '';

    if (etape === 1) {
      stopped = true;
      if (rafId !== null) {
        cancelAnimationFrame(rafId);
        rafId = null;
      }
      etape = 2;
      if (ep1SuccessTime) { ep1SuccessTime.textContent = ''; ep1SuccessTime.classList.add('hidden'); }
      if (ep1SuccessModal) ep1SuccessModal.classList.remove('hidden');
    } else {
      showResult('—', true, 'j2_ep2_lose_msg');
      if (resultTitle) resultTitle.textContent = t('j2_success');
    }
  }

  function openSkipModal() {
    if (skipError) skipError.textContent = '';
    if (skipInput) { skipInput.value = ''; skipInput.focus(); }
    if (skipModal) skipModal.classList.remove('hidden');
  }

  function initLang() {
    var code = localStorage.getItem('clement-game-lang') || 'fr';
    if (window.setLang) window.setLang(code);
    if (instruction && window.getText) instruction.textContent = window.getText('j2_instruction');
    if (btnStop && window.getText) btnStop.textContent = window.getText('j2_btn_stop');
    if (btnBack && window.getText) btnBack.textContent = window.getText('j2_btn_back');
    if (btnRestart && window.getText) btnRestart.textContent = window.getText('btn_quit');
    if (backHome && window.getText) backHome.setAttribute('aria-label', window.getText('j1_back_aria'));
    if (ep1SuccessModal && window.getText) {
      var t1 = document.getElementById('j2Ep1SuccessTitle');
      var t2 = document.getElementById('j2Ep1SuccessText');
      if (t1) t1.textContent = window.getText('j2_ep1_success_title');
      if (t2) t2.textContent = window.getText('j2_ep1_success_text');
      if (ep1SuccessBtn) ep1SuccessBtn.textContent = window.getText('j2_ep1_success_btn');
    }
    if (ep2RulesModal && window.getText) {
      var r2t = document.getElementById('j2Ep2RulesTitle');
      var r2p = document.getElementById('j2Ep2RulesText');
      var r2extra = document.getElementById('j2Ep2RulesExtra');
      if (r2t) r2t.textContent = window.getText('j2_ep2_rules_title');
      if (r2p) r2p.textContent = window.getText('j2_ep2_rules_text');
      if (r2extra) r2extra.textContent = window.getText('j2_ep2_rules_extra');
      if (ep2RulesBtn) ep2RulesBtn.textContent = window.getText('j1_btn_start');
    }
    if (btnRetry && window.getText) btnRetry.textContent = window.getText('j2_retry_btn');
    if (btnPass && window.getText) btnPass.textContent = window.getText('j2_pass_btn');
    if (skipLink && window.getText) skipLink.textContent = window.getText('j2_skip_link');
    if (skipModal && window.getText) {
      var st = document.getElementById('j2SkipModalTitle');
      if (st) st.textContent = window.getText('j2_skip_modal_title');
      if (skipInput) skipInput.placeholder = window.getText('j2_skip_placeholder');
      if (skipSubmit) skipSubmit.textContent = window.getText('code_modal_submit');
    }
  }

  function startGame() {
    startTime = performance.now();
    stopped = false;
    updateDisplay();
  }

  btnStop.addEventListener('click', stopTimerEtape1);
  if (btnRetry) btnRetry.addEventListener('click', payRetry);
  if (btnPass) btnPass.addEventListener('click', payPass);
  if (confirmPayCancel) confirmPayCancel.addEventListener('click', closeConfirmPayModal);
  if (confirmPayConfirm) confirmPayConfirm.addEventListener('click', function() {
    if (pendingPayment === 'retry') doPayRetry();
    else if (pendingPayment === 'pass') doPayPass();
  });
  if (ep1SuccessBtn) ep1SuccessBtn.addEventListener('click', goToEtape2);
  if (ep2RulesBtn) ep2RulesBtn.addEventListener('click', function() {
    startEtape2Game();
  });
  if (btnStartEp2) btnStartEp2.addEventListener('click', startChronoEp2);
  if (btnStopEp2) btnStopEp2.addEventListener('click', stopTimerEtape2);
  if (skipLink) skipLink.addEventListener('click', openSkipModal);
  if (skipSubmit) skipSubmit.addEventListener('click', skipEpreuve);
  if (skipInput) skipInput.addEventListener('keydown', function(e) {
    if (e.key === 'Enter') skipEpreuve();
  });

  initLang();

  if (rulesModal && rulesBtn) {
    if (window.getText) {
      var rt = document.getElementById('j2RulesTitle');
      var rp = document.getElementById('j2RulesText');
      if (rt) rt.textContent = window.getText('j2_rules_title');
      if (rp) rp.textContent = window.getText('j2_rules_text');
      rulesBtn.textContent = window.getText('j1_btn_start');
    }
    rulesBtn.addEventListener('click', function() {
      rulesModal.classList.add('hidden');
      startGame();
    });
  } else {
    startGame();
  }
})();
