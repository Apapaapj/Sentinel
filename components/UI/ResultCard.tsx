"use client";

import { ScanResult } from '@/types';
import { Download, Copy, ChevronDown } from 'lucide-react';
import { useState } from 'react';

export function ResultCard({ result }: { result: ScanResult }) {
  const [copied, setCopied] = useState(false);

  const getScoreColor = (score: number) => {
    if (score >= 8) return 'text-green-600';
    if (score >= 6) return 'text-yellow-600';
    if (score >= 4) return 'text-orange-600';
    return 'text-red-600';
  };

  return (
    <div className="scan-card">
      <div className="flex justify-between items-start mb-6">
        <div>
          <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">{result.url}</h3>
          <div className="flex gap-4 text-sm text-gray-600 dark:text-gray-400">
            <span>🕐 {(result.duration / 1000).toFixed(2)}s</span>
            <span>📅 {new Date(result.timestamp).toLocaleDateString()}</span>
          </div>
        </div>
        <div className={`text-4xl font-bold ${getScoreColor(result.score)}`}>{result.score}</div>
      </div>

      <div className="grid grid-cols-5 gap-2 mb-6">
        <div className="p-2 bg-red-50 dark:bg-red-900/20 rounded text-center">
          <div className="font-bold text-red-600">{result.summary.critical}</div>
          <div className="text-xs text-gray-600">Critical</div>
        </div>
        <div className="p-2 bg-orange-50 dark:bg-orange-900/20 rounded text-center">
          <div className="font-bold text-orange-600">{result.summary.high}</div>
          <div className="text-xs text-gray-600">High</div>
        </div>
        <div className="p-2 bg-yellow-50 dark:bg-yellow-900/20 rounded text-center">
          <div className="font-bold text-yellow-600">{result.summary.medium}</div>
          <div className="text-xs text-gray-600">Medium</div>
        </div>
        <div className="p-2 bg-green-50 dark:bg-green-900/20 rounded text-center">
          <div className="font-bold text-green-600">{result.summary.low}</div>
          <div className="text-xs text-gray-600">Low</div>
        </div>
        <div className="p-2 bg-blue-50 dark:bg-blue-900/20 rounded text-center">
          <div className="font-bold text-blue-600">{result.summary.total}</div>
          <div className="text-xs text-gray-600">Total</div>
        </div>
      </div>

      {result.vulnerabilities.length > 0 ? (
        <div className="space-y-3 mb-6">
          {result.vulnerabilities.slice(0, 5).map((vuln: any) => (
            <VulnItem key={vuln.id} vuln={vuln} />
          ))}
          {result.vulnerabilities.length > 5 && (
            <div className="text-center text-sm text-gray-600 py-2">+{result.vulnerabilities.length - 5} more</div>
          )}
        </div>
      ) : (
        <div className="text-center py-6 text-green-600 font-semibold">✅ No vulnerabilities found!</div>
      )}

      <div className="flex gap-2 pt-4 border-t border-gray-200 dark:border-gray-800">
        <button onClick={() => {
          const content = `Report: ${result.url}\nScore: ${result.score}\n\nVulnerabilities:\n${result.vulnerabilities.map(v => `- ${v.name}: ${v.description}`).join('\n')}`;
          const blob = new Blob([content], { type: 'text/plain' });
          const url = URL.createObjectURL(blob);
          const a = document.createElement('a');
          a.href = url;
          a.download = `report-${Date.now()}.txt`;
          a.click();
        }} className="btn-secondary flex items-center gap-2 flex-1">
          <Download size={18} /> Download
        </button>
        <button onClick={() => {
          navigator.clipboard.writeText(`${window.location.origin}?result=${btoa(JSON.stringify(result))}`);
          setCopied(true);
          setTimeout(() => setCopied(false), 2000);
        }} className="btn-secondary flex items-center gap-2 flex-1">
          <Copy size={18} /> {copied ? 'Copied!' : 'Share'}
        </button>
      </div>
    </div>
  );
}

function VulnItem({ vuln }: any) {
  const [expanded, setExpanded] = useState(false);

  const severityColors: any = {
    critical: 'vuln-critical',
    high: 'vuln-high',
    medium: 'vuln-medium',
    low: 'vuln-low',
  };

  return (
    <div className="border border-gray-200 dark:border-gray-700 rounded-lg overflow-hidden">
      <button onClick={() => setExpanded(!expanded)} className="w-full px-4 py-3 flex items-center justify-between hover:bg-gray-50 dark:hover:bg-gray-800/50">
        <div className="flex items-center gap-3">
          <span className={`vuln-badge ${severityColors[vuln.severity]}`}>{vuln.severity.toUpperCase()}</span>
          <span className="font-semibold text-gray-900 dark:text-white">{vuln.name}</span>
        </div>
        <ChevronDown size={18} className={expanded ? 'rotate-180' : ''} />
      </button>
      {expanded && (
        <div className="px-4 py-3 bg-gray-50 dark:bg-gray-800/30 border-t border-gray-200 dark:border-gray-700 space-y-2 text-sm">
          <div><span className="font-semibold">Location:</span> <div className="font-mono text-gray-600 mt-1">{vuln.location}</div></div>
          <div><span className="font-semibold">Description:</span> <div className="text-gray-600 mt-1">{vuln.description}</div></div>
          <div><span className="font-semibold">Fix:</span> <div className="text-gray-600 mt-1">{vuln.fix}</div></div>
        </div>
      )}
    </div>
  );
}
