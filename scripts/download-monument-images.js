/**
 * Télécharge une image placeholder (avec le nom du monument) pour chaque monument
 * qui n'a pas encore d'image dans assets/monuments/.
 * Usage: node scripts/download-monument-images.js
 */
const https = require('https');
const fs = require('fs');
const path = require('path');

const DATA_FILE = path.join(__dirname, '..', 'monuments-data.js');
const OUT_DIR = path.join(__dirname, '..', 'assets', 'monuments');

function fetchUrl(url) {
  return new Promise((resolve, reject) => {
    https.get(url, { headers: { 'User-Agent': 'Node-download' } }, (res) => {
      const chunks = [];
      res.on('data', (chunk) => chunks.push(chunk));
      res.on('end', () => resolve(Buffer.concat(chunks)));
      res.on('error', reject);
    }).on('error', reject);
  });
}

function extractMonuments(content) {
  const list = [];
  const re = /\{\s*id:\s*'([^']+)',\s*name:\s*'((?:[^'\\]|\\.)*)'/g;
  let m;
  while ((m = re.exec(content)) !== null) {
    const name = m[2].replace(/\\'/g, "'");
    list.push({ id: m[1], name });
  }
  return list;
}

async function main() {
  const raw = fs.readFileSync(DATA_FILE, 'utf8');
  const monuments = extractMonuments(raw);
  if (!fs.existsSync(OUT_DIR)) fs.mkdirSync(OUT_DIR, { recursive: true });

  let downloaded = 0;
  let skipped = 0;
  for (const { id, name } of monuments) {
    const outPath = path.join(OUT_DIR, id + '.png');
    if (fs.existsSync(outPath)) {
      skipped++;
      continue;
    }
    const text = encodeURIComponent(name.length > 20 ? name.slice(0, 20) : name);
    const url = `https://placehold.co/200x120/1a1a2e/f0c14b?text=${text}`;
    try {
      const buf = await fetchUrl(url);
      fs.writeFileSync(outPath, buf);
      downloaded++;
      console.log('OK', id);
    } catch (e) {
      console.error('Erreur', id, e.message);
    }
  }
  console.log('Terminé:', downloaded, 'téléchargées,', skipped, 'déjà présentes.');
}

main().catch(console.error);
