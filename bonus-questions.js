/**
 * Base de questions du quiz bonus – à éditer pour ajouter/modifier des questions.
 * Chaque question : { q: "Question ?", options: ["A", "B", "C", "D"], correct: 0 } (correct = index 0-3)
 */
window.BONUS_QUESTIONS = [
  {
    q: "Quel pays a organisé la Coupe du Monde 2022 ?",
    options: ["Russie", "Brésil", "Allemagne", "Qatar"],
    correct: 3
  },
  {
    q: "Quelle équipe est le grand rival du FC Barcelone en Espagne ?",
    options: ["Atlético Madrid", "Séville", "Real Madrid", "Valence"],
    correct: 2
  },
  {
    q: "Combien de joueurs composent une équipe sur la feuille de match en Coupe du Monde (avec remplaçants) ?",
    options: ["23", "24", "26", "28"],
    correct: 2
  },
  {
    q: "Quel joueur a marqué un triplé en finale de la Coupe du Monde 2022 ?",
    options: ["Lionel Messi", "Kylian Mbappé", "Olivier Giroud", "Ángel Di María"],
    correct: 1
  },
  {
    q: "Quelle équipe a gagné l'Euro 2020 (joué en 2021) ?",
    options: ["Angleterre", "Italie", "Espagne", "France"],
    correct: 1
  },
  {
    q: "Quelle équipe a remporté la Coupe du Monde 2022 au Qatar ?",
    options: ["France", "Argentine", "Croatie", "Maroc"],
    correct: 1
  },
  {
    q: "Qui a remporté le Ballon d'Or 2023 ?",
    options: ["Erling Haaland", "Lionel Messi", "Kylian Mbappé", "Kevin De Bruyne"],
    correct: 1
  },
  {
    q: "Quel club a gagné la Ligue des Champions 2023 ?",
    options: ["Real Madrid", "Inter Milan", "Manchester City", "AC Milan"],
    correct: 2
  },
  {
    q: "Quel joueur a été le meilleur buteur de la Coupe du Monde 2022 ?",
    options: ["Lionel Messi", "Kylian Mbappé", "Cristiano Ronaldo", "Julian Alvarez"],
    correct: 1
  },
  {
    q: "Dans quel club joue Jude Bellingham depuis 2023 ?",
    options: ["Liverpool", "Real Madrid", "Borussia Dortmund", "Manchester City"],
    correct: 1
  },
  {
    q: "Quelle équipe a remporté la Premier League 2023-2024 ?",
    options: ["Arsenal", "Liverpool", "Manchester City", "Chelsea"],
    correct: 2
  },
  {
    q: "Quel club a signé Kylian Mbappé en 2024 ?",
    options: ["Paris SG", "Real Madrid", "Liverpool", "Barcelone"],
    correct: 1
  },
  {
    q: "Qui est l'entraîneur de Manchester City depuis 2016 ?",
    options: ["Pep Guardiola", "Jürgen Klopp", "Carlo Ancelotti", "José Mourinho"],
    correct: 0
  },
  {
    q: "Quel club italien a atteint la finale de la Ligue des Champions 2023 ?",
    options: ["Juventus", "Inter Milan", "AC Milan", "Naples"],
    correct: 1
  },
  {
    q: "Quelle sélection a gagné l'Euro 2024 ?",
    options: ["Allemagne", "Espagne", "France", "Angleterre"],
    correct: 1
  },
  {
    q: "Quel club joue au Parc des Princes ?",
    options: ["Olympique de Marseille", "Paris Saint-Germain", "Lyon", "Monaco"],
    correct: 1
  },
  {
    q: "Qui est le capitaine de l'équipe de France après la retraite de Lloris ?",
    options: ["Kylian Mbappé", "Antoine Griezmann", "Olivier Giroud", "Benjamin Pavard"],
    correct: 0
  },
  {
    q: "Quel club anglais a réalisé le triplé (Premier League + FA Cup + Ligue des Champions) en 2023 ?",
    options: ["Manchester United", "Chelsea", "Manchester City", "Liverpool"],
    correct: 2
  },
  {
    q: "Quel joueur argentin a remporté le Ballon d'Or 2021 et 2023 ?",
    options: ["Sergio Agüero", "Ángel Di María", "Lionel Messi", "Paulo Dybala"],
    correct: 2
  },
  {
    q: "Quel club espagnol est le plus titré en Ligue des Champions ?",
    options: ["Barcelone", "Real Madrid", "Atlético Madrid", "Valence"],
    correct: 1
  },
  {
    q: "Quelle sélection africaine a atteint la demi-finale de la Coupe du Monde 2022 ?",
    options: ["Sénégal", "Maroc", "Tunisie", "Ghana"],
    correct: 1
  },
  {
    q: "Quel club italien est surnommé « La Vieille Dame » ?",
    options: ["Inter Milan", "AC Milan", "Juventus", "AS Rome"],
    correct: 2
  },
  {
    q: "Quel club allemand a dominé la Bundesliga pendant plus de 10 ans avant 2024 ?",
    options: ["Borussia Dortmund", "RB Leipzig", "Bayern Munich", "Bayer Leverkusen"],
    correct: 2
  },
  {
    q: "Quel joueur norvégien est célèbre pour ses buts avec Manchester City ?",
    options: ["Martin Ødegaard", "Erling Haaland", "Alexander Sørloth", "Sander Berge"],
    correct: 1
  },
  {
    q: "Quel club a éliminé le PSG en Ligue des Champions 2024 ?",
    options: ["Barcelone", "Borussia Dortmund", "Real Madrid", "Manchester City"],
    correct: 1
  }
];

/** Questions bonus Histoire & Géographie (débloquées après j3). */
window.BONUS_QUESTIONS_HISTORY = [
  { q: "En quelle année a commencé la Première Guerre mondiale ?", options: ["1912", "1914", "1916", "1918"], correct: 1 },
  { q: "Quel événement a déclenché la Première Guerre mondiale ?", options: ["L'invasion de la Pologne", "L'assassinat de l'archiduc François-Ferdinand à Sarajevo", "La bataille de Verdun", "Le traité de Versailles"], correct: 1 },
  { q: "Qui était le dirigeant de l'Allemagne pendant la Seconde Guerre mondiale ?", options: ["Staline", "Mussolini", "Adolf Hitler", "Churchill"], correct: 2 },
  { q: "Que signifie l'abréviation ONU et en quelle année a-t-elle été créée ?", options: ["Organisation des Nations unies, 1945", "Organisation nord-atlantique, 1949", "Organisation mondiale de la santé, 1948", "Organisation du traité de l'Atlantique, 1945"], correct: 0 },
  { q: "Quel mur célèbre a séparé une ville européenne de 1961 à 1989 ?", options: ["Le mur de Berlin", "Le mur d'Hadrien", "Le mur de l'Atlantique", "Le mur de Vienne"], correct: 0 },
  { q: "Quelle révolution a eu lieu en Russie en 1917 ?", options: ["La Révolution française", "La Révolution bolchevique (d'Octobre)", "La Révolution industrielle", "La Révolution des œillets"], correct: 1 },
  { q: "Quel pays a été le premier à envoyer un homme dans l'espace ?", options: ["Les États-Unis", "L'URSS (Union soviétique)", "La Chine", "La France"], correct: 1 },
  { q: "Qui était le premier président de la Ve République française ?", options: ["François Mitterrand", "Georges Pompidou", "Charles de Gaulle", "Valéry Giscard d'Estaing"], correct: 2 },
  { q: "Quel traité a officiellement mis fin à la Première Guerre mondiale ?", options: ["Le traité de Rome", "Le traité de Versailles", "Le traité de Maastricht", "Le traité de Tordesillas"], correct: 1 },
  { q: "Quel mouvement politique a dirigé la Chine depuis 1949 ?", options: ["Le Kuomintang", "Le Parti communiste chinois", "Le Parti nationaliste", "Le Parti libéral"], correct: 1 },
  { q: "Quel est le pays le plus peuplé du monde aujourd'hui ?", options: ["La Chine", "L'Inde", "Les États-Unis", "L'Indonésie"], correct: 1 },
  { q: "Quelle est la capitale du Canada ?", options: ["Toronto", "Montréal", "Ottawa", "Vancouver"], correct: 2 },
  { q: "Quel fleuve traverse Paris ?", options: ["La Loire", "Le Rhône", "La Seine", "La Garonne"], correct: 2 },
  { q: "Dans quel continent se trouve le désert du Sahara ?", options: ["L'Asie", "L'Amérique", "L'Afrique", "L'Océanie"], correct: 2 },
  { q: "Quelle est la plus grande île du monde ?", options: ["L'Australie", "La Nouvelle-Guinée", "Bornéo", "Le Groenland"], correct: 3 },
  { q: "Quel pays européen possède le plus grand territoire ?", options: ["La France", "L'Ukraine", "La Russie", "L'Espagne"], correct: 2 },
  { q: "Quelle mer borde le sud de la France ?", options: ["La Manche", "L'océan Atlantique", "La Méditerranée", "La mer du Nord"], correct: 2 },
  { q: "Quelle chaîne de montagnes sépare la France et l'Espagne ?", options: ["Les Alpes", "Les Pyrénées", "Le Jura", "Les Cévennes"], correct: 1 },
  { q: "Quel pays est surnommé « le pays du Soleil levant » ?", options: ["La Chine", "La Corée du Sud", "Le Japon", "Le Vietnam"], correct: 2 },
  { q: "Quelle est la capitale de l'Australie ?", options: ["Sydney", "Melbourne", "Canberra", "Brisbane"], correct: 2 }
];
