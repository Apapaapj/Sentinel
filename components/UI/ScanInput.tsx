"use client";

import { Plus, Trash2, Zap } from 'lucide-react';

export function ScanInput({ urls, loading, onUrlChange, onAddUrl, onRemoveUrl, onScan, onClearAll }: any) {
  return (
    <div className="scan-card">
      <h2 className="text-2xl font-bold mb-6 text-gray-900 dark:text-white">Scan URLs</h2>
      <div className="space-y-3 mb-6">
        {urls.map((url: string, idx: number) => (
          <div key={idx} className="flex gap-2">
            <input type="text" placeholder="https://example.com" value={url} onChange={(e) => onUrlChange(idx, e.target.value)} className="flex-1 px-4 py-2 bg-gray-50 dark:bg-gray-800 border border-gray-300 dark:border-gray-700 rounded-lg text-gray-900 dark:text-white" />
            {urls.length > 1 && (
              <button onClick={() => onRemoveUrl(idx)} className="btn-secondary">
                <Trash2 size={18} />
              </button>
            )}
          </div>
        ))}
      </div>
      <div className="flex gap-3">
        <button onClick={onAddUrl} className="btn-secondary flex items-center gap-2">
          <Plus size={18} /> Add URL
        </button>
        <button onClick={onScan} disabled={loading || !urls.some((u: string) => u.trim())} className="btn-primary flex items-center gap-2 flex-1 justify-center">
          {loading ? '⚙️ Scanning...' : <>
            <Zap size={18} /> Scan All
          </>}
        </button>
        <button onClick={onClearAll} className="btn-secondary">Clear</button>
      </div>
    </div>
  );
}
