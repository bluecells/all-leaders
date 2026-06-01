#!/usr/bin/env python3
"""
Simple title capitalization: First letter uppercase, rest lowercase.
Preserves acronyms (IA, RH, M&A, HBR, API, etc.)
"""

import re
from pathlib import Path

# Acronyms to preserve in UPPERCASE
ACRONYMS = {
    'AI', 'IA', 'HR', 'RH', 'USA', 'UNESCO', 'ONU', 'CEO', 'CFO', 'CTO',
    'IT', 'API', 'URL', 'HTTP', 'SMTP', 'SMS', 'QR', 'VR', 'AR',
    'CAP', 'OKR', 'STEPPPS', 'LBI', 'PSSM', 'DRH', 'DAF', 'RP', 'ETR',
    'M&A', 'HBR'
}

def normalize_title(title: str) -> str:
    """
    Normalize title:
    - First letter uppercase
    - Rest lowercase
    - Preserve acronyms
    """
    title = title.strip('\'"')
    if not title:
        return title

    result = []
    words = re.split(r'(\W+)', title)
    first_word = True

    for part in words:
        if not part or not any(c.isalpha() for c in part):
            # Keep separators as-is
            result.append(part)
            continue

        # It's a word
        upper_part = part.upper()

        if upper_part in ACRONYMS:
            # Keep acronym uppercase
            result.append(upper_part)
        elif first_word:
            # First word: capitalize first letter only
            result.append(part[0].upper() + part[1:].lower() if len(part) > 1 else part.upper())
            first_word = False
        else:
            # Regular word: all lowercase
            result.append(part.lower())

    return ''.join(result)

def process_file(filepath: str) -> tuple[bool, str, str]:
    """Process a single mdoc file."""
    with open(filepath, 'r', encoding='utf-8') as f:
        content = f.read()

    title_match = re.search(r"^title:\s*['\"]([^'\"]+)['\"]", content, re.MULTILINE)
    if not title_match:
        return False, "", ""

    old_title = title_match.group(1)
    new_title = normalize_title(old_title)

    if old_title == new_title:
        return False, old_title, new_title

    new_content = re.sub(
        r"^(title:\s*['\"])([^'\"]+)(['\"])",
        lambda m: m.group(1) + new_title + m.group(3),
        content,
        flags=re.MULTILINE
    )

    with open(filepath, 'w', encoding='utf-8') as f:
        f.write(new_content)

    return True, old_title, new_title

def main():
    for lang in ['fr', 'en']:
        articles_dir = Path(f'src/content/articles/{lang}')

        if not articles_dir.exists():
            continue

        mdoc_files = sorted(articles_dir.glob('*.mdoc'))

        if not mdoc_files:
            continue

        print(f"\n📝 Processing {len(mdoc_files)} {lang.upper()} articles...\n")

        modified_count = 0
        changes = []

        for filepath in mdoc_files:
            modified, old_title, new_title = process_file(str(filepath))
            if modified:
                modified_count += 1
                changes.append((filepath.name, old_title, new_title))

        # Print all changes
        for filename, old, new in changes:
            print(f"✅ {filename}")
            print(f"   ❌ {old}")
            print(f"   ✅ {new}\n")

        print(f"{'='*80}")
        print(f"Summary ({lang.upper()}): {modified_count}/{len(mdoc_files)} titles normalized")
        print(f"{'='*80}\n")

if __name__ == '__main__':
    main()
