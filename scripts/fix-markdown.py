#!/usr/bin/env python3
"""
Répare le formatage markdown des articles .mdoc

Fusionne les paragraphes mal coupés tout en préservant :
- Le frontmatter YAML
- Les headings (##, ###)
- Les listes (-, *, 1.)
- Les blockquotes (>)
- Les code blocks (```)
- Les composants Keystatic ({% ... %})
"""

import re
from pathlib import Path


def is_list_line(line):
    """Détecte les listes markdown (-, *, +, 1., 2., etc.)"""
    return bool(re.match(r'^\s*([-*+]|\d+\.)\s+', line))


def is_code_fence(line):
    """Détecte les code blocks (```)"""
    return line.strip().startswith("```")


def is_heading(line):
    """Détecte les headings (#, ##, ###, etc.)"""
    return bool(re.match(r'^\s{0,3}#{1,6}\s', line))


def is_blockquote(line):
    """Détecte les blockquotes (>)"""
    return bool(re.match(r'^\s*>\s', line))


def is_keystatic_component(line):
    """Détecte les composants Keystatic {% ... %}"""
    return line.strip().startswith('{%')


def fix_markdown(text):
    """
    Fusionne les paragraphes mal coupés et normalise le formatage.

    Règles :
    - Lignes vides = séparateurs de paragraphes
    - Headings, listes, blockquotes, code blocks = non fusionnés
    - Texte normal sur plusieurs lignes = fusionné en un paragraphe
    - Préserve le frontmatter YAML intact
    """
    lines = text.splitlines()
    out = []
    buffer = []  # Accumule les lignes à fusionner
    in_code_block = False
    in_frontmatter = False
    frontmatter_count = 0
    previous_was_empty = False

    def flush_buffer():
        """Fusionne les lignes du buffer en un seul paragraphe"""
        nonlocal buffer
        if buffer:
            # Join wrapped lines into a single paragraph
            paragraph = " ".join(l.strip() for l in buffer)
            out.append(paragraph)
            buffer = []

    for line in lines:
        # Détection frontmatter (entre les deux '---')
        if line.strip() == '---':
            frontmatter_count += 1
            if frontmatter_count <= 2:
                flush_buffer()
                in_frontmatter = (frontmatter_count == 1)
                out.append(line)
                previous_was_empty = False
                continue

        # Préservation frontmatter tel quel
        if in_frontmatter:
            out.append(line)
            previous_was_empty = False
            continue

        # Gestion code blocks
        if is_code_fence(line):
            flush_buffer()
            in_code_block = not in_code_block
            out.append(line)
            previous_was_empty = False
            continue

        if in_code_block:
            out.append(line)
            previous_was_empty = False
            continue

        # Ligne vide
        if line.strip() == "":
            # Ne flush le buffer que si on a déjà une ligne vide
            # Cela permet de fusionner les paragraphes séparés par une seule ligne vide
            if not previous_was_empty:
                flush_buffer()
                # Ne pas ajouter de ligne vide si la dernière ligne ajoutée est déjà vide
                if out and out[-1] != "":
                    out.append("")
            previous_was_empty = True
            continue

        previous_was_empty = False

        # Éléments structurels (ne pas fusionner)
        if is_heading(line) or is_list_line(line) or is_blockquote(line):
            flush_buffer()
            out.append(line.strip())
            continue

        # Composants Keystatic {% ... %}
        if is_keystatic_component(line):
            flush_buffer()
            out.append(line.strip())
            continue

        # Ligne de texte normal → ajouter au buffer
        buffer.append(line)

    # Vider le buffer final
    flush_buffer()

    return "\n".join(out)


def process_file(filepath):
    """Traite un fichier .mdoc individuel"""
    relative_path = filepath.relative_to(Path.cwd())
    print(f"📄 {relative_path}")

    try:
        with open(filepath, 'r', encoding='utf-8') as f:
            content = f.read()

        fixed = fix_markdown(content)

        with open(filepath, 'w', encoding='utf-8') as f:
            f.write(fixed)

        print(f"   ✅ Réparé")
        return True
    except Exception as e:
        print(f"   ❌ Erreur: {e}")
        return False


def process_directory(directory):
    """Traite tous les .mdoc d'un répertoire"""
    mdoc_files = sorted(Path(directory).glob('*.mdoc'))

    print(f"\n📁 {directory.relative_to(Path.cwd())}")
    print(f"   {len(mdoc_files)} fichiers trouvés\n")

    success_count = 0
    for filepath in mdoc_files:
        if process_file(filepath):
            success_count += 1

    return success_count, len(mdoc_files)


def main():
    """Point d'entrée du script"""
    script_dir = Path(__file__).parent
    articles_dir = script_dir.parent / 'src' / 'content' / 'articles'

    print("=" * 60)
    print("🔧 Réparation des articles markdown")
    print("=" * 60)

    total_success = 0
    total_files = 0

    # Traiter FR et EN
    for lang in ['fr', 'en']:
        lang_dir = articles_dir / lang
        if lang_dir.exists():
            success, total = process_directory(lang_dir)
            total_success += success
            total_files += total
        else:
            print(f"\n⚠️  Répertoire non trouvé: {lang_dir}")

    print("\n" + "=" * 60)
    print(f"✨ {total_success}/{total_files} fichiers traités avec succès")
    print("=" * 60)


if __name__ == "__main__":
    main()
