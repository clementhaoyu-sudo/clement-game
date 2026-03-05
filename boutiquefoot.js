(function() {
  var confirmModal = document.getElementById('confirmModal');
  var confirmModalText = document.getElementById('confirmModalText');
  var confirmCancel = document.getElementById('confirmCancel');
  var confirmPay = document.getElementById('confirmPay');
  var openOverlay = document.getElementById('openOverlay');
  var openProgressBar = document.getElementById('openProgressBar');
  var openText = document.getElementById('openText');
  var resultModal = document.getElementById('resultModal');
  var resultPlayer = document.getElementById('resultPlayer');
  var resultCardWrap = document.getElementById('resultCardWrap');
  var resultCardImg = document.getElementById('resultCardImg');
  var resultOk = document.getElementById('resultOk');

  var selectedPrice = 0;
  var selectedFond = '';
  var selectedPackLabel = '';
  var selectedMin = 79;
  var selectedMax = 99;

  var FOND_TYPES = ['noir-or', 'bleu-cosmos', 'magenta-tots', 'blanc-cristal', 'or-texture', 'violet'];
  var FOND_KEYS = FOND_TYPES.concat('autre');
  var STORAGE_KEY = 'clement-rangement';

  function loadSavedMapping() {
    try {
      var raw = localStorage.getItem(STORAGE_KEY);
      if (raw) return JSON.parse(raw);
    } catch (e) {}
    return null;
  }

  function isValidFond(f) {
    return FOND_KEYS.indexOf(f) >= 0;
  }

  function buildMapping() {
    var list = window.JOUEURS_COLLECTION || [];
    var override = typeof window.FONDS_PAR_IMAGE === 'object' ? window.FONDS_PAR_IMAGE : {};
    var saved = loadSavedMapping();
    var map = {};
    var index = 0;
    list.forEach(function(p) {
      var fond = override[p.image] || (saved && saved[p.image]);
      if (!isValidFond(fond)) {
        var ovr = p.ovr != null ? p.ovr : 0;
        if (ovr < 85) fond = 'or-texture';
        else fond = FOND_TYPES[index % FOND_TYPES.length];
        index++;
      }
      map[p.image] = fond;
    });
    return map;
  }

  function getPlayersByFond(fond) {
    var list = window.JOUEURS_COLLECTION || [];
    var mapping = buildMapping();
    return list.filter(function(p) {
      var f = mapping[p.image];
      return (f === fond);
    });
  }

  document.querySelectorAll('.boutique-pack').forEach(function(pack) {
    pack.addEventListener('click', function() {
      selectedPrice = parseInt(this.getAttribute('data-price'), 10);
      selectedFond = this.getAttribute('data-fond') || '';
      selectedPackLabel = this.getAttribute('data-pack-label') || '';
      selectedMin = parseInt(this.getAttribute('data-min'), 10) || 79;
      selectedMax = parseInt(this.getAttribute('data-max'), 10) || 99;
      var priceStr = selectedPrice.toLocaleString('fr-FR');
      var confirmMsg = selectedPackLabel
        ? 'Payer ' + priceStr + ' 💎 pour un pack ' + selectedPackLabel + ' ?'
        : 'Payer ' + priceStr + ' 💎 pour ce pack ?';
      confirmModalText.textContent = confirmMsg;
      confirmModal.classList.add('visible');
      confirmModal.setAttribute('aria-hidden', 'false');
    });
  });

  function hideConfirm() {
    confirmModal.classList.remove('visible');
    confirmModal.setAttribute('aria-hidden', 'true');
  }

  if (confirmCancel) confirmCancel.addEventListener('click', hideConfirm);
  if (confirmModal) confirmModal.addEventListener('click', function(e) {
    if (e.target === confirmModal) hideConfirm();
  });

  if (confirmPay) confirmPay.addEventListener('click', function() {
    var starcoin = parseInt(localStorage.getItem('clement-starcoin'), 10) || 0;
    if (starcoin < selectedPrice) {
      confirmModalText.textContent = 'Pas assez de 💎 (tu as ' + starcoin.toLocaleString('fr-FR') + ' 💎).';
      return;
    }
    hideConfirm();
    localStorage.setItem('clement-starcoin', String(starcoin - selectedPrice));

    openOverlay.classList.add('visible');
    openOverlay.setAttribute('aria-hidden', 'false');
    openProgressBar.style.transition = 'none';
    openProgressBar.style.width = '0%';
    openText.textContent = 'Ouverture du pack…';
    requestAnimationFrame(function() {
      openProgressBar.style.transition = 'width 5s linear';
      openProgressBar.style.width = '100%';
    });

    setTimeout(function() {
      openOverlay.classList.remove('visible');
      openOverlay.setAttribute('aria-hidden', 'true');
      var pool;
      if (selectedFond) {
        pool = getPlayersByFond(selectedFond);
      } else {
        pool = typeof getJoueursByOvr === 'function' ? getJoueursByOvr(selectedMin, selectedMax) : [];
        if (!pool || pool.length === 0) pool = window.JOUEURS_COLLECTION || [];
      }
      if (pool && pool.length > 0) {
        var won;
        if (selectedFond) {
          won = pool[Math.floor(Math.random() * pool.length)];
        } else {
          var weights = pool.map(function(p) {
            var ovr = typeof p.ovr === 'number' ? p.ovr : selectedMax;
            return (selectedMax - ovr + 1);
          });
          var total = weights.reduce(function(a, b) { return a + b; }, 0);
          var r = Math.random() * total;
          var acc = 0;
          for (var wi = 0; wi < pool.length; wi++) {
            acc += weights[wi];
            if (r < acc) { won = pool[wi]; break; }
          }
          if (!won) won = pool[pool.length - 1];
        }
        resultCardImg.src = won.image;
        resultCardImg.alt = '';
        resultCardWrap.style.display = 'block';
        resultPlayer.style.display = 'none';
        var macompoKey = 'clement-macompo';
        var macompo = [];
        try {
          var stored = localStorage.getItem(macompoKey);
          if (stored) macompo = JSON.parse(stored);
        } catch (e) {}
        macompo.push({ name: won.name, ovr: won.ovr, image: won.image });
        try {
          localStorage.setItem(macompoKey, JSON.stringify(macompo));
        } catch (e) {}
      } else {
        resultCardWrap.style.display = 'none';
        resultPlayer.style.display = 'block';
        resultPlayer.textContent = selectedFond ? 'Aucun joueur dans ce type.' : 'Aucun joueur dans cette fourchette.';
      }
      resultModal.classList.add('visible');
      resultModal.setAttribute('aria-hidden', 'false');
    }, 5000);
  });

  if (resultOk) resultOk.addEventListener('click', function() {
    resultModal.classList.remove('visible');
    resultModal.setAttribute('aria-hidden', 'true');
    var badge = document.getElementById('boutiqueStarcoinBadge');
    if (badge) {
      var sc = parseInt(localStorage.getItem('clement-starcoin'), 10) || 0;
      badge.textContent = '💎 ' + sc.toLocaleString('fr-FR');
    }
  });
  if (resultModal) resultModal.addEventListener('click', function(e) {
    if (e.target === resultModal) {
      resultModal.classList.remove('visible');
      resultModal.setAttribute('aria-hidden', 'true');
    }
  });

  function updateStarcoinBadge() {
    var el = document.getElementById('boutiqueStarcoinBadge');
    if (!el) return;
    var sc = parseInt(localStorage.getItem('clement-starcoin'), 10) || 0;
    el.textContent = '💎 ' + sc.toLocaleString('fr-FR');
  }
  updateStarcoinBadge();
})();
