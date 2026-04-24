export interface SeoData {
  title: string;
  seoTitle?: string;
  description: string;
  h1: string[];
  h2: string[];
  h3: string[];
  content: string;
  images: Array<{ src: string; alt: string }>;
  links: Array<{ href: string; text: string; isInternal: boolean }>;
  url: string;
  keyword?: string;
}

export interface SeoCheck {
  id: string;
  label: string;
  status: 'pass' | 'warning' | 'fail';
  message: string;
  priority: 'high' | 'medium' | 'low';
  score: number; // 0-100
}

export interface FleschScore {
  score: number;
  interpretation: string;
  avgSentenceLength: number;
  avgWordLength: number;
}

export interface SeoAnalysis {
  overallScore: number;
  checks: SeoCheck[];
  flesch: FleschScore;
  keywordDensity?: number;
  wordCount: number;
}
