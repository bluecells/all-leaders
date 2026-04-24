# SEO Analyzer Component

A lightweight SEO and readability analyzer for Astro projects, similar to Yoast SEO but built from scratch with no external dependencies.

## Features

- **SEO Analysis**: Checks 15+ SEO factors including title, meta description, headings, keyword density, images, and links
- **Readability Score**: Flesch Reading Ease calculation adapted for multiple languages
- **Development Only**: Automatically disabled in production builds
- **Client-Side Analysis**: Analyzes the actual rendered HTML for accurate results
- **Interactive Panel**: Floating, collapsible panel with tabbed interface
- **Visual Scoring**: Color-coded scores (green/orange/red) with detailed recommendations

## Installation

The component is already integrated into the BlogLayout and PageLayout.

## Usage

### In Blog Posts

Add the `seoKeyword` field to your blog post frontmatter:

```markdown
---
title: "Cuncordu Lussurzesu e Cantigos in Carrela"
description: "Ti raccontiamo il Cuncurdu Lussurzesu..."
date: "2025-11-21"
categorie: "Canto Sardo"
seoKeyword: "canto a cuncordu"
---

Your content here...
```

### In FAQ Pages

Add the `seoKeyword` field to your FAQ frontmatter:

```markdown
---
question: "Che cos'è il canto a Cuncordu sardo?"
shortAnswer: "Il canto a Cuncordu è una forma di canto polifonico..."
dateUpdated: "2025-10-30"
categorie: "Musica"
seoKeyword: "canto a cuncordu"
draft: false
---

Your content here...
```

### Manual Integration

To add the SEO Analyzer to other layouts:

```astro
---
import SeoAnalyzer from "@components/SeoAnalyzer/SeoAnalyzer.astro";

const { seoKeyword } = Astro.props;
---

<html>
  <body>
    <main>
      <slot />
    </main>
    <SeoAnalyzer keyword={seoKeyword} />
  </body>
</html>
```

## SEO Checks

The analyzer performs the following checks:

### High Priority
- ✓ **Title Length**: 50-60 characters (optimal for search results)
- ✓ **Meta Description Length**: 150-160 characters
- ✓ **Single H1**: Ensures only one H1 per page
- ✓ **Keyword in Title**: Focus keyword appears in title
- ✓ **Keyword in Description**: Focus keyword in meta description
- ✓ **Keyword in H1**: Focus keyword in main heading
- ✓ **Keyword Density**: 1-3% is optimal (avoids keyword stuffing)

### Medium Priority
- ✓ **Keyword in Introduction**: Keyword appears in first paragraph
- ✓ **Content Length**: Minimum 300 words recommended
- ✓ **Heading Structure**: Proper H2/H3 hierarchy
- ✓ **Image Alt Text**: All images have descriptive alt text

### Low Priority
- ✓ **Internal Links**: Links to related content
- ✓ **External Links**: References to authoritative sources
- ✓ **Images Present**: Visual content enhances engagement

## Readability Analysis

Uses the Flesch Reading Ease formula to calculate readability:

- **90-100**: Very Easy (11-year-old level)
- **80-89**: Easy (Conversational)
- **70-79**: Fairly Easy (Most readers)
- **60-69**: Standard (13-15 year olds)
- **50-59**: Fairly Difficult (High school)
- **30-49**: Difficult (College level)
- **0-29**: Very Difficult (Graduate level)

Also provides:
- Average sentence length
- Average word length
- Tips for improving readability

## UI Features

- **Collapsible Panel**: Click to expand/collapse
- **Score Circle**: Visual overall score indicator
- **Tabs**: Switch between SEO and Readability views
- **Color Coding**:
  - 🟢 Green (70+): Good
  - 🟡 Orange (50-69): Needs improvement
  - 🔴 Red (<50): Poor
- **Priority Labels**: High/Medium/Low priority recommendations

## Technical Details

### Architecture

```
src/components/SeoAnalyzer/
├── SeoAnalyzer.astro      # Main Astro component
├── SeoPanel.tsx           # React UI component
├── types.ts               # TypeScript interfaces
└── analyzers/
    ├── seo.ts             # SEO analysis logic
    └── flesch.ts          # Readability calculation
```

### How It Works

1. **Server-Side**: The Astro component checks if it's in dev mode
2. **Client-Side**: React component extracts page content from the DOM
3. **Analysis**: Runs SEO and readability checks on the extracted content
4. **Display**: Shows results in an interactive panel

### Data Extraction

The analyzer automatically extracts:
- Title from `<title>` tag
- Description from `<meta name="description">`
- Headings from `<h1>`, `<h2>`, `<h3>` tags
- Content from `<article>` or `<main>` elements
- Images with their `alt` attributes
- Links (internal and external)

## Best Practices

1. **Set a Focus Keyword**: Always define `seoKeyword` in frontmatter
2. **Target Score**: Aim for 70+ overall score
3. **Fix High Priority Issues First**: Start with red/orange high-priority items
4. **Balance Readability**: Don't sacrifice readability for keyword density
5. **Natural Language**: Write for humans first, search engines second

## Limitations

- **Development Only**: Component only renders in `npm run dev` mode
- **Client-Side Analysis**: Requires JavaScript to run
- **Single Language Formula**: Flesch score is optimized for Romance languages but works reasonably well for all

## Future Enhancements

Potential improvements:
- Export reports as PDF
- Track scores over time
- Competitor comparison
- Schema markup validation
- Mobile-friendliness check
- Page speed insights

## Example Output

```
Overall Score: 85/100

✓ Title Length: 52 characters (optimal)
✓ Keyword in Title: "canto a cuncordu" appears in title
✓ Meta Description: 158 characters (optimal)
⚠ Keyword Density: 0.8% (aim for 1-3%)
✓ H1 Structure: One H1 found
✓ Content Length: 1,247 words

Flesch Score: 72.3
Interpretation: Fairly Easy - Acceptable for most readers
Avg Sentence Length: 18.2 words
Avg Word Length: 4.8 characters
```

## Troubleshooting

### Panel Doesn't Appear
- Ensure you're in development mode (`npm run dev`)
- Check browser console for errors
- Verify React is properly installed

### Incorrect Scores
- Wait a moment after page load for analysis to complete
- Check that content is within `<article>` or `<main>` tags
- Verify frontmatter has correct `seoKeyword`

### TypeScript Errors
- Run `npm run build` to check for type issues
- Ensure all dependencies are installed
- Check that schema in `config.ts` includes `seoKeyword`

## License

Part of the Cantigos in Carrela project.
