#!/usr/bin/env python3
"""
Replace English quotes with French quotes in articles, excluding frontmatter.
Usage: python scripts/fix-quotes.py
"""

import os
import re
from pathlib import Path

def replace_quotes_in_content(content: str) -> str:
    """Replace English quotes with French quotes («&nbsp;...&nbsp;»)
    Excludes quotes inside Markdoc components (between {% and /%})
    """
    # Find all Markdoc components and protect them
    markdoc_pattern = r'\{%.*?/%\}'
    markdoc_components = []

    def protect_markdoc(match):
        markdoc_components.append(match.group(0))
        return f'__MARKDOC_{len(markdoc_components) - 1}__'

    # Replace markdoc components with placeholders
    protected_content = re.sub(markdoc_pattern, protect_markdoc, content, flags=re.DOTALL)

    # Now replace quotes
    pattern = r'"([^"]*)"'
    replacement = r'«&nbsp;\1&nbsp;»'
    result = re.sub(pattern, replacement, protected_content)

    # Restore markdoc components
    for i, component in enumerate(markdoc_components):
        result = result.replace(f'__MARKDOC_{i}__', component)

    return result

def process_file(filepath: str) -> tuple[bool, int]:
    """
    Process a single mdoc file.
    Returns (was_modified, quote_count)
    """
    with open(filepath, 'r', encoding='utf-8') as f:
        content = f.read()

    # Split frontmatter from content
    parts = content.split('---\n', 2)

    if len(parts) < 3:
        print(f"⚠️  Invalid format: {filepath}")
        return False, 0

    frontmatter = parts[0] + '---\n' + parts[1] + '---\n'
    body = parts[2]

    # Count quotes before
    quote_count_before = len(re.findall(r'"[^"]*"', body))

    # Replace quotes in body only
    new_body = replace_quotes_in_content(body)

    # Check if anything changed
    if body == new_body:
        return False, 0

    # Write back
    new_content = frontmatter + new_body
    with open(filepath, 'w', encoding='utf-8') as f:
        f.write(new_content)

    return True, quote_count_before

def main():
    articles_dir = Path('src/content/articles/fr')

    if not articles_dir.exists():
        print(f"❌ Directory not found: {articles_dir}")
        return

    mdoc_files = list(articles_dir.glob('*.mdoc'))

    if not mdoc_files:
        print(f"❌ No .mdoc files found in {articles_dir}")
        return

    print(f"📝 Processing {len(mdoc_files)} French articles...\n")

    total_modified = 0
    total_quotes = 0

    for filepath in sorted(mdoc_files):
        modified, quote_count = process_file(str(filepath))
        if modified:
            total_modified += 1
            total_quotes += quote_count
            print(f"✅ {filepath.name}: {quote_count} quotes replaced")
        else:
            print(f"⏭️  {filepath.name}: no changes needed")

    print(f"\n{'='*60}")
    print(f"✨ Summary:")
    print(f"   Files modified: {total_modified}/{len(mdoc_files)}")
    print(f"   Total quotes replaced: {total_quotes}")
    print(f"{'='*60}")

if __name__ == '__main__':
    main()
