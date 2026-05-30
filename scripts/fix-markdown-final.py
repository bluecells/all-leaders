#!/usr/bin/env python3
"""
Répare le formatage markdown des articles .mdoc - Version finale

Traite en 3 passes:
1. Sépare les éléments structurels collés ensemble
2. Fusionne les lignes cassées inappropriately
3. Normalise l'espacement

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


def split_combined_elements(line):
    """
    Sépare les éléments structurels qui sont collés ensemble sur une ligne.

    Par exemple:
    "entreprise ! ### Nous vous proposons... ! > - **liste**"
    devient une liste de:
    ["entreprise !", "### Nous vous proposons...", "> - **liste**"]
    """
    parts = []
    current = []
    i = 0

    while i < len(line):
        # Chercher les marqueurs structurels
        remaining = line[i:]

        # Détecter heading marker (avec espace avant et après)
        heading_match = re.match(r'(\s*)(#{1,6}\s+)', remaining)
        if heading_match and (i == 0 or line[i-1] in '.!? '):
            # Flush current part
            if current:
                parts.append(''.join(current).strip())
                current = []
            # Start new part with heading
            current.append(heading_match.group())
            i += len(heading_match.group())
            continue

        # Détecter blockquote marker (avec espace avant)
        blockquote_match = re.match(r'(\s*>\s*)', remaining)
        if blockquote_match and (i == 0 or line[i-1] in '.!? '):
            # Flush current part
            if current:
                parts.append(''.join(current).strip())
                current = []
            # Start new part with blockquote
            current.append(blockquote_match.group())
            i += len(blockquote_match.group())
            continue

        # Caractère normal
        current.append(line[i])
        i += 1

    # Flush final part
    if current:
        parts.append(''.join(current).strip())

    return [p for p in parts if p]


def pass1_split_combined(text):
    """
    Passe 1: Sépare les éléments structurels collés sur une même ligne.
    """
    lines = text.splitlines()
    result = []

    in_frontmatter = False
    frontmatter_count = 0
    in_code_block = False

    for line in lines:
        # Frontmatter
        if line.strip() == '---':
            frontmatter_count += 1
            if frontmatter_count <= 2:
                in_frontmatter = (frontmatter_count == 1)
                result.append(line)
                continue

        if in_frontmatter:
            result.append(line)
            continue

        # Code blocks
        if line.strip().startswith('```'):
            in_code_block = not in_code_block
            result.append(line)
            continue

        if in_code_block:
            result.append(line)
            continue

        # Keystatic components
        if line.strip().startswith('{%'):
            result.append(line)
            continue

        # Si la ligne commence par un heading ou blockquote, pas de split
        if re.match(r'^\s{0,3}#{1,6}\s', line) or re.match(r'^\s*>\s*', line):
            result.append(line)
            continue

        # Sinon, essayer de splitter
        parts = split_combined_elements(line)
        if len(parts) > 1:
            result.extend(parts)
        else:
            result.append(line)

    return '\n'.join(result)


def is_list_line(line):
    """Détecte les listes markdown"""
    return bool(re.match(r'^\s*([-*+]|\d+\.)\s+', line))


def is_code_fence(line):
    """Détecte les code blocks"""
    return line.strip().startswith("```")


def is_heading(line):
    """Détecte les headings"""
    return bool(re.match(r'^\s{0,3}#{1,6}\s', line))


def is_blockquote(line):
    """Détecte les blockquotes"""
    return bool(re.match(r'^\s*>\s*', line))


def is_keystatic_component(line):
    """Détecte les composants Keystatic"""
    return line.strip().startswith('{%')


def pass2_merge_wrapped_lines(text):
    """
    Passe 2: Fusionne les lignes qui ont été cassées inappropriément.

    Les headings, blockquotes, listes etc. sur plusieurs lignes consécutives
    sont fusionnés.
    """
    lines = text.splitlines()
    result = []
    buffer = []
    buffer_type = None  # 'heading', 'blockquote', 'list', 'paragraph'

    in_frontmatter = False
    frontmatter_count = 0
    in_code_block = False

    def flush_buffer():
        nonlocal buffer, buffer_type
        if not buffer:
            return

        if buffer_type in ('heading', 'blockquote', 'list'):
            # Garder le premier marqueur, fusionner le reste
            first_line = buffer[0]
            rest_lines = [line.lstrip('#>-*+ \t').strip() for line in buffer[1:]]

            # Extraire le marqueur
            match = re.match(r'^(\s{0,3}#{1,6}\s+|>\s*|[-*+]\s+|\d+\.\s+)', first_line)
            if match:
                marker = match.group(1)
                first_content = first_line[len(marker):].strip()
                all_content = [first_content] + rest_lines
                merged = marker + ' '.join(c for c in all_content if c)
                result.append(merged)
            else:
                # Fallback
                result.append(' '.join(line.strip() for line in buffer))

        elif buffer_type == 'paragraph':
            # Fusionner en paragraphe
            merged = ' '.join(line.strip() for line in buffer if line.strip())
            if merged:
                result.append(merged)

        buffer = []
        buffer_type = None

    for line in lines:
        # Frontmatter
        if line.strip() == '---':
            frontmatter_count += 1
            if frontmatter_count <= 2:
                flush_buffer()
                in_frontmatter = (frontmatter_count == 1)
                result.append(line)
                continue

        if in_frontmatter:
            flush_buffer()
            result.append(line)
            continue

        # Code blocks
        if is_code_fence(line):
            flush_buffer()
            in_code_block = not in_code_block
            result.append(line)
            continue

        if in_code_block:
            flush_buffer()
            result.append(line)
            continue

        # Lignes vides
        if line.strip() == '':
            flush_buffer()
            result.append('')
            continue

        # Keystatic components
        if is_keystatic_component(line):
            flush_buffer()
            result.append(line.strip())
            continue

        # Déterminer le type de ligne
        if is_heading(line):
            if buffer_type == 'heading':
                buffer.append(line)
            else:
                flush_buffer()
                buffer_type = 'heading'
                buffer.append(line)

        elif is_blockquote(line):
            if buffer_type == 'blockquote':
                buffer.append(line)
            else:
                flush_buffer()
                buffer_type = 'blockquote'
                buffer.append(line)

        elif is_list_line(line):
            if buffer_type == 'list':
                buffer.append(line)
            else:
                flush_buffer()
                buffer_type = 'list'
                buffer.append(line)

        else:
            # Texte normal
            if buffer_type == 'paragraph':
                buffer.append(line)
            else:
                flush_buffer()
                buffer_type = 'paragraph'
                buffer.append(line)

    # Flush final
    flush_buffer()

    return '\n'.join(result)


def pass3_normalize_spacing(text):
    """
    Passe 3: Normalise l'espacement.

    - Élimine les lignes vides multiples
    - Ajoute des lignes vides avant les headings et autres éléments structurels
    """
    lines = text.splitlines()
    result = []

    in_frontmatter = False
    frontmatter_count = 0
    in_code_block = False
    previous_was_empty = False

    for line in lines:
        # Frontmatter
        if line.strip() == '---':
            frontmatter_count += 1
            if frontmatter_count <= 2:
                in_frontmatter = (frontmatter_count == 1)
                result.append(line)
                previous_was_empty = False
                continue

        if in_frontmatter:
            result.append(line)
            previous_was_empty = False
            continue

        # Code blocks
        if is_code_fence(line):
            in_code_block = not in_code_block
            # Ajouter ligne vide avant si nécessaire
            if result and result[-1].strip() != '':
                result.append('')
            result.append(line)
            previous_was_empty = False
            continue

        if in_code_block:
            result.append(line)
            previous_was_empty = False
            continue

        # Lignes vides
        if line.strip() == '':
            if not previous_was_empty:
                result.append('')
                previous_was_empty = True
            continue

        previous_was_empty = False

        # Éléments structurels: ajouter ligne vide avant si nécessaire
        if is_heading(line) or is_blockquote(line) or is_list_line(line) or is_keystatic_component(line):
            if result and result[-1].strip() != '':
                result.append('')
            result.append(line.strip())
        else:
            # Paragraphe normal
            result.append(line.strip())

    # Enlever les lignes vides finales
    while result and result[-1] == '':
        result.pop()

    return '\n'.join(result)


def fix_markdown(text):
    """
    Applique les 3 passes de réparation.
    """
    # Passe 1: Séparer les éléments collés
    text = pass1_split_combined(text)

    # Passe 2: Fusionner les lignes cassées
    text = pass2_merge_wrapped_lines(text)

    # Passe 3: Normaliser l'espacement
    text = pass3_normalize_spacing(text)

    return text


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
    print("🔧 Réparation des articles markdown (Version finale)")
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
