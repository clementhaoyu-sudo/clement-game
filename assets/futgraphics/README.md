# Cartes FutGraphics (FC26)

Cartes joueurs depuis [FutGraphics – Database](https://futgraphics.com/database) (FC26).

## Comment ajouter des joueurs

1. **Télécharger les cartes**  
   Va sur https://futgraphics.com/database, choisis FC26, et télécharge les images des joueurs que tu veux. Enregistre chaque fichier dans ce dossier (`assets/futgraphics/`), par ex. `mbappe-92.png`, `vinicius-91.png`.

2. **Les ajouter à la collection**  
   Ouvre `joueurs-data.js` à la racine du projet. Trouve le tableau `JOUEURS_FUTGRAPHICS_FC26` et ajoute une ligne par joueur :

   ```js
   { name: 'Nom du joueur', ovr: 92, image: 'assets/futgraphics/nom-du-fichier.png' },
   ```

   Les joueurs apparaîtront dans la boutique (collection), le rangement et Ma composition.

## Nommage des fichiers

Tu peux utiliser le nom que tu veux (ex. `mbappe-92.png`, `vinicius-jr-fc26.png`). Pense à utiliser le même chemin dans `image:` dans `joueurs-data.js`.
