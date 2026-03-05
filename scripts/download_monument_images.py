#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""Télécharge une image placeholder pour chaque monument sans image dans assets/monuments/."""
import re
import os
import ssl
import urllib.request
import urllib.error

DATA_FILE = os.path.join(os.path.dirname(__file__), '..', 'monuments-data.js')
OUT_DIR = os.path.join(os.path.dirname(__file__), '..', 'assets', 'monuments')

def extract_monuments(content):
    list = []
    for m in re.finditer(r"\{\s*id:\s*'([^']+)',\s*name:\s*'((?:[^'\\]|\\.)*)'", content):
        name = m.group(2).replace("\\'", "'")
        list.append({'id': m.group(1), 'name': name})
    return list

def main():
    with open(DATA_FILE, 'r', encoding='utf-8') as f:
        monuments = extract_monuments(f.read())
    os.makedirs(OUT_DIR, exist_ok=True)
    downloaded = skipped = 0
    for m in monuments:
        out_path = os.path.join(OUT_DIR, m['id'] + '.png')
        if os.path.exists(out_path):
            skipped += 1
            continue
        text = urllib.parse.quote((m['name'] or '')[:20])
        url = 'https://placehold.co/200x120/1a1a2e/f0c14b?text=' + text
        try:
            ctx = ssl.create_default_context()
            ctx.check_hostname = False
            ctx.verify_mode = ssl.CERT_NONE
            req = urllib.request.Request(url, headers={'User-Agent': 'Python-download'})
            with urllib.request.urlopen(req, timeout=15, context=ctx) as r:
                with open(out_path, 'wb') as f:
                    f.write(r.read())
            downloaded += 1
            print('OK', m['id'])
        except Exception as e:
            print('Erreur', m['id'], str(e))
    print('Terminé:', downloaded, 'téléchargées,', skipped, 'déjà présentes.')

if __name__ == '__main__':
    main()
