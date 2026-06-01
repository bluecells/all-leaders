#!/usr/bin/env python3
"""
Normalize title capitalization in articles.
Rules:
- Capitalize first letter only
- Keep acronyms in UPPERCASE (IA, RH, USA, etc.)
- Keep proper nouns capitalized (need manual review)
- Words after hyphens stay lowercase
- Words after colons stay lowercase (unless acronym/proper noun)
- Words after guillemets stay lowercase (unless acronym/proper noun)
Usage: python scripts/fix-title-capitalization.py
"""

import re
from pathlib import Path

# Common French/English acronyms to preserve
ACRONYMS = {
    'IA', 'RH', 'USA', 'UNESCO', 'ONU', 'CEO', 'CFO', 'CTO',
    'IT', 'HR', 'AI', 'API', 'URL', 'HTTP', 'SMTP', 'SMS', 'QR',
    'VR', 'AR', 'CAP', 'OKR', 'STEPPPS', 'LBI', 'PSSM',
    'DRH', 'DAF', 'RP', 'ETR'
}

# Common proper nouns (French/English names and places)
PROPER_NOUNS = {
    'David', 'Marquet', 'Jean', 'Riou', 'Marie', 'Emmanuelle', 'Py',
    'Christian', 'Clot', 'Johnny', 'Gauthier', 'Bril', 'Vincent', 'Lenhardt',
    'OpinionWay', 'All', 'Leaders', 'Initiative', 'YouTube', 'Marine',
    'France', 'World', 'Champion', 'Mondiale', 'Monde', 'Navy',
    'Google', 'Facebook', 'LinkedIn', 'Twitter'
}

def normalize_title(title: str) -> str:
    """Normalize title capitalization - fast version"""
    # Remove surrounding quotes if present
    title = title.strip('\'"')

    # Split by word boundaries but keep separators
    # Pattern: word characters (including accented chars) or separators
    words = re.split(r'(\W+)', title)

    result = []
    first_word = True
    after_separator = False

    for part in words:
        if not part:
            continue

        # If it's a separator (spaces, hyphens, etc.)
        if not re.search(r'[a-zA-Zàâäéèêëïîôöùûüœæç]', part):
            result.append(part)
            # Mark if we're after a colon, hyphen, or opening guillemet
            if part.rstrip() in ':-«»':
                after_separator = True
            continue

        # It's a word - normalize it
        upper_part = part.upper()

        if upper_part in ACRONYMS:
            result.append(upper_part)
        elif part.title() in PROPER_NOUNS or part in PROPER_NOUNS:
            result.append(part[0].upper() + part[1:].lower())
        elif first_word and not after_separator:
            result.append(part[0].upper() + part[1:].lower())
            first_word = False
        else:
            result.append(part.lower())
            after_separator = False

    return ''.join(result)

def process_file(filepath: str) -> tuple[bool, str, str]:
    """
    Process a single mdoc file.
    Returns (was_modified, old_title, new_title)
    """
    with open(filepath, 'r', encoding='utf-8') as f:
        content = f.read()

    # Find title line
    title_match = re.search(r"^title:\s*['\"]([^'\"]+)['\"]", content, re.MULTILINE)
    if not title_match:
        return False, "", ""

    old_title = title_match.group(1)
    new_title = normalize_title(old_title)

    if old_title == new_title:
        return False, old_title, new_title

    # Replace in content
    new_content = re.sub(
        r"^(title:\s*['\"])([^'\"]+)(['\"])",
        lambda m: m.group(1) + new_title + m.group(3),
        content,
        flags=re.MULTILINE
    )

    # Write back
    with open(filepath, 'w', encoding='utf-8') as f:
        f.write(new_content)

    return True, old_title, new_title

def main():
    # Process both FR and EN articles
    for lang in ['fr', 'en']:
        articles_dir = Path(f'src/content/articles/{lang}')

        if not articles_dir.exists():
            print(f"⚠️  Directory not found: {articles_dir}")
            continue

        mdoc_files = list(articles_dir.glob('*.mdoc'))

        if not mdoc_files:
            print(f"⚠️  No .mdoc files found in {articles_dir}")
            continue

        print(f"\n📝 Processing {len(mdoc_files)} {lang.upper()} articles...\n")

        total_modified = 0

        for filepath in sorted(mdoc_files):
            modified, old_title, new_title = process_file(str(filepath))
            if modified:
                total_modified += 1
                print(f"✅ {filepath.name}")
                print(f"   ❌ {old_title}")
                print(f"   ✅ {new_title}")
            else:
                pass  # Silent for unmodified files

        print(f"\n{'='*70}")
        print(f"Summary ({lang.upper()}): {total_modified}/{len(mdoc_files)} titles normalized")
        print(f"{'='*70}")

if __name__ == '__main__':
    main()
