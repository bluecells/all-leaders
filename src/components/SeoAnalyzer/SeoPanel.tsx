/** @jsxImportSource react */
import { useState, useEffect, type ReactElement } from 'react';
import type { SeoAnalysis, SeoData } from './types';
import { analyzeSeo } from './analyzers/seo';

interface SeoPanelProps {
  keyword?: string;
}

declare global {
  interface Window {
    seoGlobalReport?: Array<{
      url: string;
      score: number;
      checks: any[];
      timestamp: string;
    }>;
    printSeoReport?: () => void;
  }
}

export default function SeoPanel({ keyword }: SeoPanelProps): ReactElement | null {
  const [isExpanded, setIsExpanded] = useState(false);
  const [activeTab, setActiveTab] = useState<'seo' | 'readability' | 'report'>('seo');
  const [analysis, setAnalysis] = useState<SeoAnalysis | null>(null);

  useEffect(() => {
    console.log('[SEO Analyzer] Component mounted, keyword:', keyword);

    const analyzeContent = () => {
      console.log('[SEO Analyzer] Starting content analysis...');
      const title = document.querySelector('title')?.textContent || '';
      const seoTitle = document.querySelector('meta[name="title"]')?.getAttribute('content') || '';
      const description = document.querySelector('meta[name="description"]')?.getAttribute('content') || '';

      const h1Elements = Array.from(document.querySelectorAll('h1')).map(el => el.textContent || '');
      const h2Elements = Array.from(document.querySelectorAll('h2')).map(el => el.textContent || '');
      const h3Elements = Array.from(document.querySelectorAll('h3')).map(el => el.textContent || '');

      const contentElement = document.querySelector('article') || document.querySelector('main') || document.body;
      const content = contentElement?.textContent || '';

      const images = Array.from(document.querySelectorAll('img')).map(img => ({
        src: img.src,
        alt: img.alt || ''
      }));

      const links = Array.from(document.querySelectorAll('a[href]')).map(link => {
        const href = link.getAttribute('href') || '';
        const isInternal = href.startsWith('/') || href.startsWith('#') || href.includes(window.location.hostname);
        return { href, text: link.textContent || '', isInternal };
      });

      const seoData: SeoData = {
        title, seoTitle, description,
        h1: h1Elements, h2: h2Elements, h3: h3Elements,
        content, images, links,
        url: window.location.pathname, keyword
      };

      const result = analyzeSeo(seoData);
      console.log('[SEO Analyzer] Analysis complete:', result);
      setAnalysis(result);

      if (typeof window !== 'undefined') {
        if (!window.seoGlobalReport) window.seoGlobalReport = [];
        window.seoGlobalReport = window.seoGlobalReport.filter(r => r.url !== window.location.pathname);
        window.seoGlobalReport.push({
          url: window.location.pathname,
          score: result.overallScore,
          checks: result.checks.filter(c => c.status !== 'pass'),
          timestamp: new Date().toISOString()
        });

        if (!window.printSeoReport) {
          window.printSeoReport = () => {
            console.log('=' + '='.repeat(79));
            console.log('SEO GLOBAL REPORT - CORRECTIONS NEEDED');
            console.log('=' + '='.repeat(79));
            const sortedReport = [...(window.seoGlobalReport || [])].sort((a, b) => a.score - b.score);
            sortedReport.forEach(page => {
              console.log(`\n📄 ${page.url} - Score: ${page.score}/100`);
              console.log('-'.repeat(80));
              if (page.checks.length === 0) {
                console.log('  ✅ No issues found');
              } else {
                page.checks.forEach(check => {
                  const icon = check.status === 'fail' ? '❌' : '⚠️';
                  console.log(`  ${icon} [${check.priority.toUpperCase()}] ${check.label}`);
                  console.log(`     ${check.message}`);
                });
              }
            });
            console.log('\n' + '='.repeat(80));
            console.log(`Total pages analyzed: ${sortedReport.length}`);
            console.log('='.repeat(80));
          };
        }
      }
    };

    const timer = setTimeout(analyzeContent, 100);
    return () => clearTimeout(timer);
  }, [keyword]);

  if (!analysis) return null;

  const { overallScore, checks, flesch, keywordDensity, wordCount } = analysis;

  const getScoreColor = (score: number) => {
    if (score >= 70) return '#10b981';
    if (score >= 50) return '#f59e0b';
    return '#ef4444';
  };

  const getStatusIcon = (status: 'pass' | 'warning' | 'fail') => {
    if (status === 'pass') return '✓';
    if (status === 'warning') return '⚠';
    return '✗';
  };

  const getStatusColor = (status: 'pass' | 'warning' | 'fail') => {
    if (status === 'pass') return '#10b981';
    if (status === 'warning') return '#f59e0b';
    return '#ef4444';
  };

  const sortedChecks = [...checks].sort((a, b) => {
    const priorityOrder = { high: 0, medium: 1, low: 2 };
    return priorityOrder[a.priority] - priorityOrder[b.priority];
  });

  const globalReport = (typeof window !== 'undefined' && window.seoGlobalReport) || [];
  const issuesByPage = globalReport.filter(r => r.checks.length > 0).sort((a, b) => a.score - b.score);

  return (
    <div style={{ position: 'fixed', bottom: '20px', right: '20px', width: isExpanded ? '450px' : '80px', maxHeight: isExpanded ? '600px' : '80px', backgroundColor: '#1f2937', color: '#f3f4f6', borderRadius: '12px', boxShadow: '0 10px 40px rgba(0,0,0,0.3)', zIndex: 9999, overflow: 'hidden', transition: 'all 0.3s ease', fontFamily: 'system-ui, -apple-system, sans-serif' }}>
      <div style={{ padding: '16px', borderBottom: isExpanded ? '1px solid #374151' : 'none', display: 'flex', alignItems: 'center', justifyContent: 'space-between', cursor: 'pointer' }} onClick={() => setIsExpanded(!isExpanded)}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <div style={{ width: '40px', height: '40px', borderRadius: '50%', background: `conic-gradient(${getScoreColor(overallScore)} ${overallScore * 3.6}deg, #374151 0deg)`, display: 'flex', alignItems: 'center', justifyContent: 'center', position: 'relative' }}>
            <div style={{ width: '32px', height: '32px', borderRadius: '50%', backgroundColor: '#1f2937', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '12px', fontWeight: 'bold', color: getScoreColor(overallScore) }}>{overallScore}</div>
          </div>
          {isExpanded && (<div><div style={{ fontWeight: 'bold', fontSize: '14px' }}>SEO Analyzer</div><div style={{ fontSize: '11px', color: '#9ca3af' }}>{wordCount} words{keyword && ` • ${keyword}`}</div></div>)}
        </div>
        <button style={{ background: 'none', border: 'none', color: '#9ca3af', fontSize: '20px', cursor: 'pointer', padding: '0', width: '24px', height: '24px', display: 'flex', alignItems: 'center', justifyContent: 'center' }} onClick={(e) => { e.stopPropagation(); setIsExpanded(!isExpanded); }}>{isExpanded ? '−' : '+'}</button>
      </div>

      {isExpanded && (<>
        <div style={{ display: 'flex', borderBottom: '1px solid #374151', backgroundColor: '#111827' }}>
          <button style={{ flex: 1, padding: '12px', background: 'none', border: 'none', color: activeTab === 'seo' ? '#3b82f6' : '#9ca3af', borderBottom: activeTab === 'seo' ? '2px solid #3b82f6' : 'none', cursor: 'pointer', fontSize: '13px', fontWeight: '500' }} onClick={() => setActiveTab('seo')}>SEO</button>
          <button style={{ flex: 1, padding: '12px', background: 'none', border: 'none', color: activeTab === 'readability' ? '#3b82f6' : '#9ca3af', borderBottom: activeTab === 'readability' ? '2px solid #3b82f6' : 'none', cursor: 'pointer', fontSize: '13px', fontWeight: '500' }} onClick={() => setActiveTab('readability')}>Read</button>
          <button style={{ flex: 1, padding: '12px', background: 'none', border: 'none', color: activeTab === 'report' ? '#3b82f6' : '#9ca3af', borderBottom: activeTab === 'report' ? '2px solid #3b82f6' : 'none', cursor: 'pointer', fontSize: '13px', fontWeight: '500', position: 'relative' }} onClick={() => setActiveTab('report')}>
            Report {issuesByPage.length > 0 && (<span style={{ position: 'absolute', top: '8px', right: '8px', backgroundColor: '#ef4444', color: 'white', borderRadius: '10px', padding: '2px 6px', fontSize: '10px', fontWeight: 'bold' }}>{issuesByPage.length}</span>)}
          </button>
        </div>

        <div style={{ maxHeight: '460px', overflowY: 'auto', padding: '16px' }}>
          {activeTab === 'seo' && (<div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            <div style={{ padding: '12px', backgroundColor: '#111827', borderRadius: '8px', fontSize: '12px' }}>
              <div style={{ marginBottom: '8px', color: '#9ca3af' }}>Overall Score</div>
              <div style={{ fontSize: '24px', fontWeight: 'bold', color: getScoreColor(overallScore) }}>{overallScore}/100</div>
              {keywordDensity !== undefined && (<div style={{ marginTop: '8px', fontSize: '11px', color: '#9ca3af' }}>Keyword Density: {keywordDensity.toFixed(2)}%</div>)}
            </div>

            {sortedChecks.map((check) => (<div key={check.id} style={{ padding: '12px', backgroundColor: '#111827', borderRadius: '8px', borderLeft: `3px solid ${getStatusColor(check.status)}` }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '6px' }}>
                <span style={{ fontSize: '16px', color: getStatusColor(check.status) }}>{getStatusIcon(check.status)}</span>
                <span style={{ fontSize: '13px', fontWeight: '600' }}>{check.label}</span>
                <span style={{ marginLeft: 'auto', fontSize: '10px', padding: '2px 6px', borderRadius: '4px', backgroundColor: '#374151', color: '#9ca3af', textTransform: 'uppercase' }}>{check.priority}</span>
              </div>
              <div style={{ fontSize: '12px', color: '#d1d5db', lineHeight: '1.5' }}>{check.message}</div>
            </div>))}
          </div>)}

          {activeTab === 'readability' && (<div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            <div style={{ padding: '16px', backgroundColor: '#111827', borderRadius: '8px' }}>
              <div style={{ marginBottom: '12px', color: '#9ca3af', fontSize: '12px' }}>Flesch Reading Ease</div>
              <div style={{ fontSize: '32px', fontWeight: 'bold', color: getScoreColor(flesch.score), marginBottom: '8px' }}>{flesch.score}</div>
              <div style={{ fontSize: '13px', color: '#d1d5db', marginBottom: '16px' }}>{flesch.interpretation}</div>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px', paddingTop: '12px', borderTop: '1px solid #374151' }}>
                <div><div style={{ fontSize: '11px', color: '#9ca3af', marginBottom: '4px' }}>Avg. Sentence Length</div><div style={{ fontSize: '18px', fontWeight: '600' }}>{flesch.avgSentenceLength}</div></div>
                <div><div style={{ fontSize: '11px', color: '#9ca3af', marginBottom: '4px' }}>Avg. Word Length</div><div style={{ fontSize: '18px', fontWeight: '600' }}>{flesch.avgWordLength}</div></div>
              </div>
            </div>

            <div style={{ padding: '12px', backgroundColor: '#111827', borderRadius: '8px' }}>
              <div style={{ fontSize: '13px', fontWeight: '600', marginBottom: '8px' }}>Tips for Better Readability</div>
              <ul style={{ fontSize: '12px', color: '#d1d5db', margin: 0, paddingLeft: '20px', lineHeight: '1.8' }}>
                <li>Use shorter sentences (15-20 words ideal)</li>
                <li>Avoid complex words when simple ones work</li>
                <li>Break long paragraphs into smaller chunks</li>
                <li>Use subheadings to organize content</li>
                <li>Include bullet points and lists</li>
              </ul>
            </div>
          </div>)}

          {activeTab === 'report' && (<div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            <div style={{ padding: '12px', backgroundColor: '#111827', borderRadius: '8px' }}>
              <div style={{ fontSize: '13px', fontWeight: '600', marginBottom: '8px' }}>Global SEO Report</div>
              <div style={{ fontSize: '11px', color: '#9ca3af' }}>{globalReport.length} page{globalReport.length !== 1 ? 's' : ''} analyzed • {issuesByPage.length} with issues</div>
              <button onClick={() => { if (window.printSeoReport) window.printSeoReport(); }} style={{ marginTop: '12px', padding: '8px 12px', backgroundColor: '#3b82f6', color: 'white', border: 'none', borderRadius: '6px', fontSize: '12px', cursor: 'pointer', width: '100%' }}>Print Report to Console</button>
            </div>

            {issuesByPage.length === 0 ? (<div style={{ padding: '16px', backgroundColor: '#111827', borderRadius: '8px', textAlign: 'center', color: '#10b981' }}>✓ No issues found on any page!</div>) : (
              issuesByPage.map((page) => (<div key={page.url} style={{ padding: '12px', backgroundColor: '#111827', borderRadius: '8px', borderLeft: `3px solid ${getScoreColor(page.score)}` }}>
                <div style={{ fontSize: '13px', fontWeight: '600', marginBottom: '8px' }}>{page.url}</div>
                <div style={{ fontSize: '11px', color: '#9ca3af', marginBottom: '12px' }}>Score: {page.score}/100 • {page.checks.length} issue{page.checks.length !== 1 ? 's' : ''}</div>
                {page.checks.slice(0, 3).map((check: any, idx: number) => (<div key={idx} style={{ fontSize: '11px', color: '#d1d5db', marginBottom: '6px', display: 'flex', gap: '6px' }}>
                  <span style={{ color: getStatusColor(check.status) }}>{getStatusIcon(check.status)}</span>
                  <span>{check.label}</span>
                </div>))}
                {page.checks.length > 3 && (<div style={{ fontSize: '11px', color: '#6b7280', marginTop: '6px' }}>+{page.checks.length - 3} more issue{page.checks.length - 3 !== 1 ? 's' : ''}</div>)}
              </div>))
            )}
          </div>)}
        </div>
      </>)}
    </div>
  );
}
