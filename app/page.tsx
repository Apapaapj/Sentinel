"use client";

import { useState } from 'react';
import { ScanInput } from '@/components/ui/ScanInput';
import { StatsBanner } from '@/components/ui/StatsBanner';
import { ResultCard } from '@/components/ui/ResultCard';
import { ScanResult } from '@/types';

export default function Home() {
  const [results, setResults] = useState<ScanResult[]>([]);
  const [loading, setLoading] = useState(false);
  const [urls, setUrls] = useState<string[]>(['']);

  const handleScan = async () => {
    if (!urls.filter(u => u.trim()).length) return;
    setLoading(true);

    for (const url of urls.filter(u => u.trim())) {
      try {
        const res = await fetch('/api/scan', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ url }),
        });
        if (res.ok) {
          const result = await res.json();
          setResults(prev => [result, ...prev]);
          localStorage.setItem('scans', JSON.stringify([result, ...results]));
        }
      } catch (error) {
        console.error('Scan error:', error);
      }
    }
    setLoading(false);
  };

  const stats = {
    totalScans: results.length,
    critical: results.reduce((sum, r) => sum + r.summary.critical, 0),
    high: results.reduce((sum, r) => sum + r.summary.high, 0),
    medium: results.reduce((sum, r) => sum + r.summary.medium, 0),
    low: results.reduce((sum, r) => sum + r.summary.low, 0),
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800">
      <div className="max-w-6xl mx-auto px-4 py-12">
        <div className="text-center mb-12">
          <h1 className="text-5xl font-bold text-gray-900 dark:text-white mb-4">
            🔍 VulnScanner
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-400">
            Production-Ready Website Vulnerability Scanner
          </p>
        </div>

        <StatsBanner stats={stats} />
        <ScanInput urls={urls} loading={loading} onUrlChange={(i, v) => {
          const nu = [...urls];
          nu[i] = v;
          setUrls(nu);
        }} onAddUrl={() => setUrls([...urls, ''])} onRemoveUrl={(i) => setUrls(urls.filter((_, idx) => idx !== i))} onScan={handleScan} onClearAll={() => { setUrls(['']); setResults([]); }} />

        <div className="mt-12 space-y-6">
          {results.map(result => (
            <ResultCard key={result.id} result={result} />
          ))}
        </div>
      </div>
    </div>
  );
}
