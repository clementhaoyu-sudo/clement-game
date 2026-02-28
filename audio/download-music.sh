#!/bin/bash
# Télécharge un MP3 dans ce dossier sous le nom beast-game.mp3
# Usage : ./download-music.sh [URL_MP3]
# Exemple : ./download-music.sh "https://example.com/music.mp3"

DIR="$(cd "$(dirname "$0")" && pwd)"
OUT="$DIR/beast-game.mp3"

if [ -n "$1" ]; then
  echo "Téléchargement de $1 vers beast-game.mp3 ..."
  curl -sL -o "$OUT" "$1" && echo "OK : $OUT" || echo "Erreur téléchargement"
else
  echo "Usage: $0 <URL_MP3>"
  echo "Exemple: $0 \"https://cdn.pixabay.com/audio/2022/05/27/audio_81b2d940f0.mp3\""
fi
