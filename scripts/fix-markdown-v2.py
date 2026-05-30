#!/usr/bin/env python3
"""
Répare le formatage markdown des articles .mdoc - Version améliorée

Fusionne les paragraphes mal coupés tout en préservant :
- Le frontmatter YAML
- Les headings (##, ###)
- Les listes (-, *, 1.)
- Les blockquotes (>)
- Les code blocks (```)
- Les composants Keystatic ({% ... %})

Gère les cas complexes où les éléments structurels sont cassés sur plusieurs lignes.
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


def starts_with_heading(line):
    """Détecte si une ligne commence par un heading marker"""
    return bool(re.match(r'^\s{0,3}#{1,6}\s', line))


def contains_heading_marker(text):
    """Détecte si le texte contient un heading marker en milieu de ligne"""
    # Cherche des patterns comme " ### " au milieu du texte
    return bool(re.search(r'\s#{1,6}\s', text))


def is_blockquote(line):
    """Détecte les blockquotes (>)"""
    return bool(re.match(r'^\s*>\s*', line))


def contains_blockquote_marker(text):
    """Détecte si le texte contient un marqueur blockquote"""
    return ' > ' in text or ' >-' in text


def is_keystatic_component(line):
    """Détecte les composants Keystatic {% ... %}"""
    return line.strip().startswith('{%')


def preprocess_broken_elements(text):
    """
    Première passe: sépare les éléments structurels qui sont collés ensemble.

    Par exemple:
    "entreprise ! ### Nous vous proposons"
    devient:
    "entreprise !"
    "### Nous vous proposons"
    """
    lines = text.splitlines()
    fixed_lines = []

    in_frontmatter = False
    frontmatter_count = 0
    in_code_block = False

    for line in lines:
        # Gestion frontmatter
        if line.strip() == '---':
            frontmatter_count += 1
            if frontmatter_count <= 2:
                in_frontmatter = (frontmatter_count == 1)
                fixed_lines.append(line)
                continue

        if in_frontmatter:
            fixed_lines.append(line)
            continue

        # Gestion code blocks
        if is_code_fence(line):
            in_code_block = not in_code_block
            fixed_lines.append(line)
            continue

        if in_code_block:
            fixed_lines.append(line)
            continue

        # Si la ligne commence déjà par un heading, on la garde telle quelle
        if starts_with_heading(line):
            fixed_lines.append(line)
            continue

        # Chercher les heading markers au milieu de la ligne
        # Pattern: texte ### plus de texte
        match = re.search(r'^(.*?)\s(#{1,6}\s+.*)$', line)
        if match:
            before = match.group(1).strip()
            heading_part = match.group(2).strip()

            if before and not starts_with_heading(before):
                # Séparer en deux lignes
                fixed_lines.append(before)
                fixed_lines.append(heading_part)
                continue

        # Chercher les blockquote markers au milieu
        # Pattern: texte > - liste ou texte > texte
        match = re.search(r'^(.*?)\s(>\s*.*)$', line)
        if match:
            before = match.group(1).strip()
            quote_part = match.group(2).strip()

            if before and not starts_with_heading(before) and not is_blockquote(before):
                # Séparer en deux lignes
                if before.rstrip().endswith('!') or before.rstrip().endswith('.') or before.rstrip().endswith('?'):
                    fixed_lines.append(before)
                    fixed_lines.append(quote_part)
                    continue

        # Ligne normale
        fixed_lines.append(line)

    return '\n'.join(fixed_lines)


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
                continue

        # Préservation frontmatter tel quel
        if in_frontmatter:
            out.append(line)
            continue

        # Gestion code blocks
        if is_code_fence(line):
            flush_buffer()
            in_code_block = not in_code_block
            out.append(line)
            continue

        if in_code_block:
            out.append(line)
            continue

        # Ligne vide = break de paragraphe
        if line.strip() == "":
            flush_buffer()
            # Éviter les lignes vides multiples
            if out and out[-1] != "":
                out.append("")
            continue

        # Éléments structurels (ne pas fusionner)
        if is_heading(line) or is_list_line(line) or is_blockquote(line):
            flush_buffer()
            # Ajouter une ligne vide avant si nécessaire
            if out and out[-1] != "":
                out.append("")
            out.append(line.strip())
            continue

        # Composants Keystatic {% ... %}
        if is_keystatic_component(line):
            flush_buffer()
            if out and out[-1] != "":
                out.append("")
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

        # Première passe: séparer les éléments structurels collés
        preprocessed = preprocess_broken_elements(content)

        # Deuxième passe: fusionner les paragraphes et normaliser
        fixed = fix_markdown(preprocessed)

        with open(filepath, 'w', encoding='utf-8') as f:
            f.write(fixed)

        print(f"   ✅ Réparé")
        return True
    except Exception as e:
        print(f"   ❌ Erreur: {e}")
        import traceback
        traceback.print_exc()
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
    print("🔧 Réparation des articles markdown (Version améliorée)")
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
