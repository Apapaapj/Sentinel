"use client";

export function StatsBanner({ stats }: any) {
  return (
    <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mb-8">
      <div className="scan-card text-center">
        <div className="text-3xl font-bold text-blue-600">{stats.totalScans}</div>
        <div className="text-sm text-gray-600 dark:text-gray-400">Total Scans</div>
      </div>
      <div className="scan-card text-center">
        <div className="text-3xl font-bold text-red-600">{stats.critical}</div>
        <div className="text-sm text-gray-600 dark:text-gray-400">Critical</div>
      </div>
      <div className="scan-card text-center">
        <div className="text-3xl font-bold text-orange-600">{stats.high}</div>
        <div className="text-sm text-gray-600 dark:text-gray-400">High</div>
      </div>
      <div className="scan-card text-center">
        <div className="text-3xl font-bold text-yellow-600">{stats.medium}</div>
        <div className="text-sm text-gray-600 dark:text-gray-400">Medium</div>
      </div>
      <div className="scan-card text-center">
        <div className="text-3xl font-bold text-green-600">{stats.low}</div>
        <div className="text-sm text-gray-600 dark:text-gray-400">Low</div>
      </div>
    </div>
  );
}
