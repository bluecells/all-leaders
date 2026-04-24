#!/usr/bin/env python3
"""
Restructure featuredPhoto fields in .mdoc files from flat format to nested format.

Transforms:
  featuredPhoto: /path/to/image.jpg
  featuredPhotoAlt: Alt text

Into:
  featuredPhoto:
    image: /path/to/image.jpg
    alt: Alt text

Does NOT modify if:
- featuredPhoto is already nested (has image/alt keys)
- featuredPhoto and featuredPhotoAlt don't exist
"""

import os
import re
import sys
from pathlib import Path
from typing import Tuple

def extract_frontmatter_and_body(content: str) -> Tuple[str, str]:
    """Extract frontmatter and body from .mdoc file content."""
    if not content.startswith('---'):
        return "", content
    
    lines = content.split('\n')
    if len(lines) < 2:
        return "", content
    
    for i in range(1, len(lines)):
        if lines[i].strip() == '---':
            frontmatter = '\n'.join(lines[1:i])
            body = '\n'.join(lines[i+1:])
            return frontmatter, body
    
    return "", content

def should_restructure(frontmatter: str) -> bool:
    """Check if featuredPhoto needs restructuring."""
    # Look for the pattern: "featuredPhoto: <value>" (not nested)
    # We need to detect if it's a string value, not nested
    
    lines = frontmatter.split('\n')
    for i, line in enumerate(lines):
        # Match "featuredPhoto:" at the start with some content
        if re.match(r'^featuredPhoto:\s+\S', line):
            return True
        # Also check for "featuredPhoto:" with empty value if followed by non-indented line
        if re.match(r'^featuredPhoto:\s*$', line):
            # If next line exists and is NOT indented (starts with spaces), it's empty string featured
            if i + 1 < len(lines) and not lines[i + 1].startswith(' ') and not lines[i + 1].startswith('\t'):
                return True
    
    return 'featuredPhotoAlt:' in frontmatter

def restructure_featured_photo(content: str) -> Tuple[str, bool]:
    """
    Restructure featuredPhoto fields in .mdoc file content.
    
    Returns tuple of (modified_content, was_modified)
    """
    frontmatter, body = extract_frontmatter_and_body(content)
    
    if not frontmatter or not should_restructure(frontmatter):
        return content, False
    
    # Extract values carefully, line by line
    featured_value = ''
    alt_value = ''
    
    lines = frontmatter.split('\n')
    new_lines = []
    featured_line_index = -1
    
    i = 0
    while i < len(lines):
        line = lines[i]
        
        # Match featuredPhoto line with value
        if re.match(r'^featuredPhoto:\s+\S', line):
            featured_line_index = len(new_lines)
            match = re.match(r'^featuredPhoto:\s+(.+)$', line)
            if match:
                featured_value = match.group(1).strip()
            # Don't add this line, we'll add it later
            i += 1
            continue
        
        # Match featuredPhoto with empty value
        if re.match(r'^featuredPhoto:\s*$', line):
            featured_line_index = len(new_lines)
            # Empty featured photo
            featured_value = ''
            i += 1
            continue
        
        # Match featuredPhotoAlt line
        if re.match(r'^featuredPhotoAlt:\s*', line):
            match = re.match(r'^featuredPhotoAlt:\s*(.*)$', line)
            if match:
                alt_value = match.group(1).strip()
            # Skip this line
            i += 1
            continue
        
        new_lines.append(line)
        i += 1
    
    # Add the restructured field
    if featured_line_index >= 0:
        # Insert at the original position
        insert_pos = featured_line_index
    else:
        # Insert at the end
        insert_pos = len(new_lines)
    
    # Add the restructured field
    restructured = [
        'featuredPhoto:',
        f'  image: {featured_value}',
        f'  alt: {alt_value}'
    ]
    
    new_lines[insert_pos:insert_pos] = restructured
    
    new_frontmatter = '\n'.join(new_lines)
    
    # Reconstruct the file
    modified_content = f'---\n{new_frontmatter}\n---\n{body}'
    return modified_content, True

def process_mdoc_files(root_dir: str) -> int:
    """Process all .mdoc files in the directory tree."""
    mdoc_files = sorted(list(Path(root_dir).rglob('*.mdoc')))
    modified_count = 0
    
    print(f"Found {len(mdoc_files)} .mdoc files\n")
    
    for file_path in mdoc_files:
        try:
            with open(file_path, 'r', encoding='utf-8') as f:
                original_content = f.read()
            
            modified_content, was_modified = restructure_featured_photo(original_content)
            
            if was_modified:
                with open(file_path, 'w', encoding='utf-8') as f:
                    f.write(modified_content)
                print(f"✓ Modified: {file_path.relative_to(root_dir)}")
                modified_count += 1
        
        except Exception as e:
            print(f"✗ Error processing {file_path.relative_to(root_dir)}: {e}")
    
    return modified_count

def main():
    root_dir = '/Users/bluecells/Websites/limolo/src/content'
    
    if not os.path.isdir(root_dir):
        print(f"Error: Directory not found: {root_dir}")
        sys.exit(1)
    
    print(f"Processing .mdoc files in: {root_dir}\n")
    
    modified_count = process_mdoc_files(root_dir)
    
    print(f"\n{'='*50}")
    print(f"Summary: {modified_count} files modified")
    print(f"{'='*50}")

if __name__ == '__main__':
    main()
