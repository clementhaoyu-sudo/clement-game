/**
 * TEXTES DES MODALES
 * ==================
 * Pour modifier les textes des modales du jeu, édite uniquement ce fichier.
 * Chaque section indique : la PAGE, le TYPE de modale (règles, paiement, etc.) et le RÔLE du texte (titre, paragraphe, bouton).
 * Tu peux changer le contenu entre les guillemets, en gardant les clés (à gauche) telles quelles.
 */

var TEXTES_MODALES = {

  /* ========== PAGE D'INTRO (pintro) ========== */
  /* Modale d'avertissement (avant de commencer le jeu) */
  modal_warning_title: 'Attention',                    /* Titre de la modale */
  modal_warning_text: 'Si vous perdez une épreuve, vous devrez recommencer le jeu depuis le début.',  /* Texte d'avertissement */
  modal_btn_start: 'Commencer',                        /* Bouton pour lancer le jeu */
  /* Barre du bas (options) - Quête, Marché, Échange, Boutique */
  pintro_quete: 'Quête',                               /* Lien option Quête */
  pintro_marche: 'Marché',                             /* Lien option Marché */
  pintro_echange: 'Échange',                           /* Lien option Échange */
  pintro_boutique: 'Boutique',                         /* Lien option Boutique */

  /* ========== JEU 1 (j1) - Mémoire des couleurs ========== */
  /* Modale des RÈGLES (affichée au démarrage de j1) */
  j1_rules_title: 'Règles du jeu',                     /* Titre */
  j1_rules_text: 'L\'ordinateur affiche une séquence de blocs colorés (rouge, jaune, vert, bleu). Mémorise-la puis reproduis-la en cliquant sur les couleurs dans le bon ordre. Tu as un temps limité. Si tu te trompes ou que le temps est écoulé, tu perds.',  /* Explication des règles */

  /* ========== JEU 2 (j2) - Timer ========== */
  /* Modale des RÈGLES - Étape 1 (au démarrage de j2) */
  j2_rules_title: 'Règles du jeu',                     /* Titre */
  j2_rules_text: 'Un timer affiche les secondes et centièmes. Clique sur « Arrêter » quand tu penses avoir atteint 5 secondes. Il y a une tolérance de 0,05 s entre 4,95 s et 5,05 s. Si tu es en dehors, tu perds.',  /* Explication étape 1 */

  /* Modale SUCCÈS Étape 1 (quand le joueur réussit l'étape 1) */
  j2_ep1_success_title: 'Étape 1 réussie !',            /* Titre */
  j2_ep1_success_text: 'Passage à l\'étape 2...',      /* Texte court */
  j2_ep1_success_btn: 'Continuer',                      /* Bouton pour passer à l'étape 2 */

  /* Modale des RÈGLES - Étape 2 (chrono invisible 15–17 s) */
  j2_ep2_rules_title: 'Étape 2',                       /* Titre */
  j2_ep2_rules_text: 'Le chronomètre est invisible. Lance-le avec « Démarrer », puis arrête-le entre la 15e et la 17e seconde avec « Arrêter ». Si tu es en dehors de cette fenêtre, tu perds.',  /* Explication étape 2 */
  j2_ep2_rules_extra: 'Si tu perds, tu pourras retenter pour 5000 💎 ou passer l\'épreuve pour 10000 💎 (après avoir échoué). Pour passer sans échouer, utilise le code.',  /* Paragraphe supplémentaire (retenter / passer en payant) */

  /* Modale MOT DE PASSE pour passer l'épreuve (lien "Passer l'épreuve") */
  j2_skip_modal_title: 'Passer l\'épreuve',             /* Titre de la modale code */

  /* Modale CONFIRMATION PAIEMENT - Retenter (après avoir perdu) */
  j2_confirm_retry_title: 'Confirmer le paiement',     /* Titre */
  j2_confirm_retry_text: 'Payer 5000 💎 pour retenter ta chance ?',  /* Texte de confirmation */

  /* Modale CONFIRMATION PAIEMENT - Passer l'épreuve (après avoir perdu) */
  j2_confirm_pass_title: 'Confirmer le paiement',     /* Titre */
  j2_confirm_pass_text: 'Payer 10 000 💎 pour passer l\'épreuve ?',  /* Texte de confirmation */

  /* Modale RÉSULTAT - Succès (quand le joueur a réussi j2) */
  j2_success: 'Bravo !',                               /* Titre affiché */

  /* Modale RÉSULTAT - Défaite (messages affichés quand le joueur perd) */
  j2_lose_msg: 'Perdu. Il fallait entre 4,95 s et 5,05 s.',   /* Défaite étape 1 */
  j2_ep2_lose_msg: 'Perdu. Il fallait arrêter entre 15 s et 17 s.',  /* Défaite étape 2 */

  /* ========== PAGE INDEX (accueil) ========== */
  /* Modale CODE pour débloquer un jeu (code secret) */
  code_modal_title: 'Code requis',                     /* Titre de la modale code */

  /* Modale RAPPEL BONUS (après retour de j2, pour rappeler le jeu bonus) */
  bonus_reminder_title: 'Rappel',                      /* Titre */
  bonus_reminder_text: 'Le jeu bonus est disponible. Fais-le pour faciliter les prochaines épreuves.',  /* Texte du rappel */
  bonus_reminder_btn: 'OK',                             /* Bouton pour fermer */

  /* ========== JEU 3 (j3) - Pont / chance et stratégie ========== */
  /* Modale des RÈGLES (au démarrage de j3) */
  j3_rules_title: 'Règles du jeu',                     /* Titre */
  j3_rules_text: 'Il existe un parcours secret (ex. G G D G…). Tu dois traverser un pont de 7 rangées : à chaque rangée, choisis gauche ou droite. Une seule case est sûre par rangée. Tu peux acheter un bonhomme test (10 000 💎) : tu le contrôles, il fait le parcours à ta place. S\'il pose le pied sur une piège, il meurt (fin de tentative). Ensuite, achète un autre bonhomme test ou tente avec ton vrai joueur. Si ton vrai joueur tombe sur une piège, tu perds. Code 1428 pour passer.',  /* Explication des règles */

  /* Modale CONFIRMATION ACHAT - Bonhomme test (quand le joueur clique pour acheter un bonhomme test) */
  j3_buy_confirm_title: 'Confirmer l\'achat',          /* Titre */
  j3_buy_confirm_text: 'Un bonhomme test coûte 10 000 💎. Il révélera la case sûre d\'une rangée. Confirmer ?',  /* Texte de confirmation */

  /* Modale BONHOMME TEST MORT (quand le bonhomme test tombe sur une case piège) */
  j3_dummy_trap_title: 'Bonhomme test',                 /* Titre */
  j3_dummy_trap_text: 'Le bonhomme test est tombé sur une case piégée. Il n\'est plus utilisable. Il faudra en acheter un autre.',  /* Explication */
  j3_dummy_trap_btn: 'OK',                             /* Bouton pour fermer */

  /* Modale BONHOMME TEST A RÉUSSI (quand le bonhomme test traverse tout le pont) */
  j3_dummy_success_title: 'Bonhomme test',              /* Titre */
  j3_dummy_success_text: 'Le bonhomme test a traversé le pont ! Tu as vu le parcours. À toi de jouer.',  /* Explication */
  /* (le bouton utilise la même clé que j3_dummy_trap_btn : OK) */

  /* Modale VICTOIRE - Tu fais partie de l'élite (quand le joueur gagne j3) */
  j3_elite_title: 'Tu fais partie de l\'élite !',      /* Titre */
  j3_elite_text: 'Félicitations, tu as réussi toutes les épreuves. Tu fais partie de l\'élite.',  /* Texte de félicitations */

  /* Modale DÉFAITE j3 (quand le joueur tombe sur une case piège) */
  j3_lose_msg: 'Perdu !',                              /* Titre */
  j3_lose_explain: 'Tu es tombé sur une case piégée. Tu dois recommencer le jeu depuis le début (page d\'intro).',  /* Explication + rappel quitter */

  /* Modale MOT DE PASSE pour passer l'épreuve j3 (lien "Passer l'épreuve") */
  j3_skip_modal_title: 'Passer l\'épreuve',           /* Titre de la modale code */

  /* ========== BONUS (jbonus) - Quiz Football ========== */
  /* Titre de la page (affiché en haut) */
  jbonus_title: 'Quiz bonus – Football',                /* Titre de la page */

  /* Modale AVERTISSEMENT au démarrage du bonus (avant les questions) */
  jbonus_warning_title: 'Attention',                   /* Titre */
  jbonus_warning_text: 'Si tu perds ce bonus (une mauvaise réponse), tu pourras payer 20 000 💎 pour continuer ou quitter.',  /* Texte d'avertissement */
  jbonus_warning_btn_start: 'Faire le bonus',           /* Bouton pour commencer le quiz */
  jbonus_warning_no_thanks: 'Non merci',                /* Bouton pour refuser et quitter */

  /* Modale RÉSULTAT - Succès (toutes les questions justes) */
  jbonus_win_starcoin: 'Bravo ! Vous gagnez 100 000 Starcoins !',  /* Titre + message */

  /* Modale RÉSULTAT - Défaite (une mauvaise réponse) */
  jbonus_lose_msg: 'Perdu. Vous n\'avez pas réussi les 5 questions.',  /* Message de défaite */

  /* Modale CONTINUER EN PAYANT (mauvaise réponse : proposer de payer pour continuer) */
  jbonus_continue_msg: 'Mauvaise réponse. Payer 20 000 Starcoins pour continuer le quiz ?',  /* Texte principal */
  jbonus_pay_5000: 'Payer 20 000 💎',                   /* Bouton pour payer et continuer */
  jbonus_quit_pintro: 'Quitter (retour pintro)',       /* Bouton pour quitter vers pintro */
  jbonus_exit_bonus_continue_challenge: 'Sortir du bonus mais continuer le challenge (20 000 💎)',  /* Bouton sortir du bonus en payant */
  jbonus_no_starcoins: 'Starcoins insuffisants (il en faut 20 000).',  /* Message si pas assez de Starcoins */

  /* Quiz bonus Histoire & Géo (titre page) */
  jbonus_title_history: 'Quiz bonus – Histoire & Géographie'
};

/* Applique les textes aux traductions françaises (à charger après lang.js) */
if (typeof TRANSLATIONS !== 'undefined' && TRANSLATIONS.fr) {
  for (var key in TEXTES_MODALES) {
    if (TEXTES_MODALES.hasOwnProperty(key)) {
      TRANSLATIONS.fr[key] = TEXTES_MODALES[key];
    }
  }
}
