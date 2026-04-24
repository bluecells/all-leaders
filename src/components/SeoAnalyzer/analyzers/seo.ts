import type { SeoData, SeoCheck, SeoAnalysis } from '../types';
import { calculateFleschScore } from './flesch';

/**
 * Calculate keyword density (percentage)
 */
function calculateKeywordDensity(content: string, keyword: string): number {
  if (!keyword) return 0;

  const normalizedContent = content.toLowerCase();
  const normalizedKeyword = keyword.toLowerCase();

  const words = content.split(/\s+/).filter(w => w.length > 0);
  const keywordOccurrences = (normalizedContent.match(new RegExp(normalizedKeyword, 'g')) || []).length;

  return words.length > 0 ? (keywordOccurrences / words.length) * 100 : 0;
}

/**
 * Count words in text
 */
function countWords(text: string): number {
  return text.split(/\s+/).filter(w => w.length > 0).length;
}

/**
 * Check if text contains keyword (case insensitive)
 */
function containsKeyword(text: string, keyword?: string): boolean {
  if (!keyword) return false;
  return text.toLowerCase().includes(keyword.toLowerCase());
}

/**
 * Analyze SEO aspects of the page
 */
export function analyzeSeo(data: SeoData): SeoAnalysis {
  const checks: SeoCheck[] = [];
  const { title, seoTitle, description, h1, h2, content, images, links, keyword } = data;

  const wordCount = countWords(content);
  const keywordDensity = keyword ? calculateKeywordDensity(content, keyword) : undefined;

  // === TITLE CHECKS ===

  // SEO Title length (only check seoTitle if it exists)
  const titleToCheck = seoTitle || title;

  if (titleToCheck.length === 0) {
    checks.push({
      id: 'title-exists',
      label: 'SEO Title Tag',
      status: 'fail',
      message: 'No SEO title tag found',
      priority: 'high',
      score: 0
    });
  } else if (titleToCheck.length < 30) {
    checks.push({
      id: 'title-length',
      label: 'SEO Title Length',
      status: 'warning',
      message: `SEO title is too short (${titleToCheck.length} chars). Aim for 50-60 characters.`,
      priority: 'high',
      score: 50
    });
  } else if (titleToCheck.length > 70) {
    checks.push({
      id: 'title-length',
      label: 'SEO Title Length',
      status: 'warning',
      message: `SEO title is too long (${titleToCheck.length} chars). It may be truncated in search results.`,
      priority: 'high',
      score: 70
    });
  } else {
    checks.push({
      id: 'title-length',
      label: 'SEO Title Length',
      status: 'pass',
      message: `SEO title length is optimal (${titleToCheck.length} chars)`,
      priority: 'high',
      score: 100
    });
  }

  // Title vs seoTitle uniqueness (HIGH PRIORITY)
  if (seoTitle && title.trim().toLowerCase() === seoTitle.trim().toLowerCase()) {
    checks.push({
      id: 'title-seotitle-different',
      label: 'Title vs SEO Title',
      status: 'fail',
      message: 'Browser title and SEO meta title are identical! They should be different for better optimization.',
      priority: 'high',
      score: 0
    });
  } else if (seoTitle) {
    checks.push({
      id: 'title-seotitle-different',
      label: 'Title vs SEO Title',
      status: 'pass',
      message: 'Browser title and SEO meta title are different, excellent!',
      priority: 'high',
      score: 100
    });
  }

  // Title vs H1 uniqueness
  if (h1.length > 0 && title.trim().toLowerCase() === h1[0].trim().toLowerCase()) {
    checks.push({
      id: 'title-h1-different',
      label: 'Title vs H1 Uniqueness',
      status: 'warning',
      message: 'SEO title is identical to H1. Consider making them different for better optimization.',
      priority: 'medium',
      score: 50
    });
  } else if (h1.length > 0) {
    checks.push({
      id: 'title-h1-different',
      label: 'Title vs H1 Uniqueness',
      status: 'pass',
      message: 'SEO title and H1 are different, which is good practice',
      priority: 'medium',
      score: 100
    });
  }

  // Page title vs H1 uniqueness (browser title vs H1)
  if (h1.length > 0 && title.trim().toLowerCase() === h1[0].trim().toLowerCase()) {
    checks.push({
      id: 'page-title-h1-different',
      label: 'Page title vs H1 Uniqueness',
      status: 'warning',
      message: 'Page title is identical to H1. Consider making them different for better optimization.',
      priority: 'medium',
      score: 50
    });
  } else if (h1.length > 0) {
    checks.push({
      id: 'page-title-h1-different',
      label: 'Page title vs H1 Uniqueness',
      status: 'pass',
      message: 'Page title and H1 are different, which is good practice',
      priority: 'medium',
      score: 100
    });
  }

  // Keyword in SEO title
  if (keyword) {
    if (containsKeyword(titleToCheck, keyword)) {
      checks.push({
        id: 'keyword-in-title',
        label: 'Keyword in SEO Title',
        status: 'pass',
        message: `Focus keyword "${keyword}" appears in the SEO title`,
        priority: 'high',
        score: 100
      });
    } else {
      checks.push({
        id: 'keyword-in-title',
        label: 'Keyword in SEO Title',
        status: 'fail',
        message: `Focus keyword "${keyword}" is missing from the SEO title`,
        priority: 'high',
        score: 0
      });
    }
  }

  // === META DESCRIPTION CHECKS ===

  if (description.length === 0) {
    checks.push({
      id: 'description-exists',
      label: 'Meta Description',
      status: 'fail',
      message: 'No meta description found',
      priority: 'high',
      score: 0
    });
  } else if (description.length < 120) {
    checks.push({
      id: 'description-length',
      label: 'Meta Description Length',
      status: 'warning',
      message: `Meta description is too short (${description.length} chars). Aim for 150-160.`,
      priority: 'high',
      score: 60
    });
  } else if (description.length > 170) {
    checks.push({
      id: 'description-length',
      label: 'Meta Description Length',
      status: 'warning',
      message: `Meta description is too long (${description.length} chars). It may be truncated.`,
      priority: 'medium',
      score: 70
    });
  } else {
    checks.push({
      id: 'description-length',
      label: 'Meta Description Length',
      status: 'pass',
      message: `Meta description length is optimal (${description.length} chars)`,
      priority: 'high',
      score: 100
    });
  }

  // Keyword in description
  if (keyword) {
    if (containsKeyword(description, keyword)) {
      checks.push({
        id: 'keyword-in-description',
        label: 'Keyword in Description',
        status: 'pass',
        message: `Focus keyword appears in meta description`,
        priority: 'high',
        score: 100
      });
    } else {
      checks.push({
        id: 'keyword-in-description',
        label: 'Keyword in Description',
        status: 'warning',
        message: `Consider adding focus keyword to meta description`,
        priority: 'medium',
        score: 50
      });
    }
  }

  // === H1 CHECKS ===

  if (h1.length === 0) {
    checks.push({
      id: 'h1-exists',
      label: 'H1 Heading',
      status: 'fail',
      message: 'No H1 heading found on the page',
      priority: 'high',
      score: 0
    });
  } else if (h1.length > 1) {
    checks.push({
      id: 'h1-single',
      label: 'Single H1',
      status: 'warning',
      message: `Found ${h1.length} H1 headings. Use only one H1 per page.`,
      priority: 'medium',
      score: 50
    });
  } else {
    checks.push({
      id: 'h1-single',
      label: 'Single H1',
      status: 'pass',
      message: 'Page has exactly one H1 heading',
      priority: 'high',
      score: 100
    });
  }

  // Keyword in H1
  if (keyword && h1.length > 0) {
    if (containsKeyword(h1[0], keyword)) {
      checks.push({
        id: 'keyword-in-h1',
        label: 'Keyword in H1',
        status: 'pass',
        message: 'Focus keyword appears in H1',
        priority: 'high',
        score: 100
      });
    } else {
      checks.push({
        id: 'keyword-in-h1',
        label: 'Keyword in H1',
        status: 'warning',
        message: 'Consider including focus keyword in H1',
        priority: 'medium',
        score: 50
      });
    }
  }

  // === HEADING STRUCTURE ===

  if (h2.length > 0) {
    checks.push({
      id: 'h2-structure',
      label: 'Heading Structure',
      status: 'pass',
      message: `Good heading structure with ${h2.length} H2 heading${h2.length > 1 ? 's' : ''}`,
      priority: 'medium',
      score: 100
    });
  } else {
    checks.push({
      id: 'h2-structure',
      label: 'Heading Structure',
      status: 'warning',
      message: 'No H2 headings found. Consider adding subheadings.',
      priority: 'low',
      score: 60
    });
  }

  // === CONTENT CHECKS ===

  // Word count
  if (wordCount < 300) {
    checks.push({
      id: 'word-count',
      label: 'Content Length',
      status: 'warning',
      message: `Content is short (${wordCount} words). Aim for at least 300 words.`,
      priority: 'medium',
      score: Math.min((wordCount / 300) * 100, 100)
    });
  } else {
    checks.push({
      id: 'word-count',
      label: 'Content Length',
      status: 'pass',
      message: `Good content length (${wordCount} words)`,
      priority: 'medium',
      score: 100
    });
  }

  // Keyword in first paragraph
  if (keyword) {
    const firstParagraph = content.substring(0, 200);
    if (containsKeyword(firstParagraph, keyword)) {
      checks.push({
        id: 'keyword-in-intro',
        label: 'Keyword in Introduction',
        status: 'pass',
        message: 'Focus keyword appears in the first paragraph',
        priority: 'medium',
        score: 100
      });
    } else {
      checks.push({
        id: 'keyword-in-intro',
        label: 'Keyword in Introduction',
        status: 'warning',
        message: 'Consider adding focus keyword to the introduction',
        priority: 'low',
        score: 50
      });
    }
  }

  // Keyword density
  if (keyword && keywordDensity !== undefined) {
    if (keywordDensity === 0) {
      checks.push({
        id: 'keyword-density',
        label: 'Keyword Density',
        status: 'fail',
        message: 'Focus keyword not found in content',
        priority: 'high',
        score: 0
      });
    } else if (keywordDensity < 0.5) {
      checks.push({
        id: 'keyword-density',
        label: 'Keyword Density',
        status: 'warning',
        message: `Keyword density is low (${keywordDensity.toFixed(2)}%). Aim for 1-3%.`,
        priority: 'medium',
        score: 50
      });
    } else if (keywordDensity > 3) {
      checks.push({
        id: 'keyword-density',
        label: 'Keyword Density',
        status: 'warning',
        message: `Keyword density is high (${keywordDensity.toFixed(2)}%). Avoid keyword stuffing.`,
        priority: 'medium',
        score: 60
      });
    } else {
      checks.push({
        id: 'keyword-density',
        label: 'Keyword Density',
        status: 'pass',
        message: `Keyword density is optimal (${keywordDensity.toFixed(2)}%)`,
        priority: 'medium',
        score: 100
      });
    }
  }

  // === IMAGE CHECKS ===

  const imagesWithoutAlt = images.filter(img => !img.alt || img.alt.trim().length === 0);

  if (images.length === 0) {
    checks.push({
      id: 'images',
      label: 'Images',
      status: 'warning',
      message: 'No images found. Consider adding relevant images.',
      priority: 'low',
      score: 70
    });
  } else if (imagesWithoutAlt.length > 0) {
    checks.push({
      id: 'image-alt',
      label: 'Image Alt Text',
      status: 'warning',
      message: `${imagesWithoutAlt.length} of ${images.length} image${images.length > 1 ? 's' : ''} missing alt text`,
      priority: 'medium',
      score: ((images.length - imagesWithoutAlt.length) / images.length) * 100
    });
  } else {
    checks.push({
      id: 'image-alt',
      label: 'Image Alt Text',
      status: 'pass',
      message: `All ${images.length} image${images.length > 1 ? 's have' : ' has'} alt text`,
      priority: 'medium',
      score: 100
    });
  }

  // === LINK CHECKS ===

  const internalLinks = links.filter(l => l.isInternal);
  const externalLinks = links.filter(l => !l.isInternal);

  if (internalLinks.length === 0) {
    checks.push({
      id: 'internal-links',
      label: 'Internal Links',
      status: 'warning',
      message: 'No internal links found. Consider linking to related content.',
      priority: 'low',
      score: 60
    });
  } else {
    checks.push({
      id: 'internal-links',
      label: 'Internal Links',
      status: 'pass',
      message: `Found ${internalLinks.length} internal link${internalLinks.length > 1 ? 's' : ''}`,
      priority: 'low',
      score: 100
    });
  }

  if (externalLinks.length > 0) {
    checks.push({
      id: 'external-links',
      label: 'External Links',
      status: 'pass',
      message: `Found ${externalLinks.length} external link${externalLinks.length > 1 ? 's' : ''}`,
      priority: 'low',
      score: 100
    });
  }

  // === CALCULATE OVERALL SCORE ===

  // Weight checks by priority
  const weights = { high: 3, medium: 2, low: 1 };
  let totalScore = 0;
  let totalWeight = 0;

  checks.forEach(check => {
    const weight = weights[check.priority];
    totalScore += check.score * weight;
    totalWeight += weight * 100; // max score per check is 100
  });

  const overallScore = totalWeight > 0 ? Math.round(totalScore / totalWeight * 100) : 0;

  // === FLESCH READABILITY ===

  const flesch = calculateFleschScore(content);

  return {
    overallScore,
    checks,
    flesch,
    keywordDensity,
    wordCount
  };
}
