'use client';

import { useState, useEffect } from 'react';
import { syncData, getSyncState, type SyncResult, type SyncMetadata } from '@/lib/client-db';

interface SyncButtonProps {
  onSyncComplete?: (result: SyncResult) => void;
}

export default function SyncButton({ onSyncComplete }: SyncButtonProps) {
  const [syncing, setSyncing] = useState(false);
  const [lastResult, setLastResult] = useState<SyncResult | null>(null);
  const [metadata, setMetadata] = useState<SyncMetadata>({ last_sync: null, sync_count: 0, source: 'local' });

  // Load sync metadata on mount
  useEffect(() => {
    setMetadata(getSyncState());
  }, []);

  const handleSync = async () => {
    setSyncing(true);
    try {
      const result = await syncData();
      setLastResult(result);
      setMetadata(getSyncState());
      onSyncComplete?.(result);
    } catch (err) {
      console.error('Sync failed:', err);
      setLastResult(null);
    } finally {
      setSyncing(false);
    }
  };

  const formatTime = (iso?: string | null): string => {
    if (!iso) return 'Never';
    const d = new Date(iso);
    const now = new Date();
    const diffMs = now.getTime() - d.getTime();
    const diffMins = Math.floor(diffMs / 60000);
    const diffHours = Math.floor(diffMs / 3600000);
    const diffDays = Math.floor(diffMs / 86400000);
    if (diffMins < 1) return 'Just now';
    if (diffMins < 60) return `${diffMins}m ago`;
    if (diffHours < 24) return `${diffHours}h ago`;
    if (diffDays < 7) return `${diffDays}d ago`;
    return d.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
  };

  return (
    <div className="flex items-center gap-3">
      {/* Sync status summary (shown between button and search) */}
      {metadata.last_sync && (
        <div className="hidden sm:flex items-center gap-2 text-xs text-text-muted">
          <span className="w-1.5 h-1.5 rounded-full bg-neon-green animate-pulse" aria-hidden="true"></span>
          <span>Synced {formatTime(metadata.last_sync)}</span>
          <span className="text-text-muted">·</span>
          <span>{metadata.sync_count} sync{metadata.sync_count !== 1 ? 's' : ''}</span>
        </div>
      )}

      {/* Sync button */}
      <div className="relative">
        <button
          onClick={handleSync}
          disabled={syncing}
          className={`btn btn-secondary text-xs font-mono transition-all duration-200 ${
            syncing ? 'opacity-60 cursor-not-allowed' : 'hover:border-cyan hover:text-cyan'
          }`}
          aria-label={syncing ? 'Syncing data...' : 'Sync data from Google Drive'}
          aria-busy={syncing}
        >
          {syncing ? (
            <>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="animate-spin">
                <circle cx="12" cy="12" r="10" />
                <path d="M12 1v4m0 14v4M4.22 4.22l2.83 2.83m8.48 8.48l2.83 2.83M1 12h4m14 0h4M4.22 19.78l2.83-2.83m8.48-8.48l2.83-2.83" />
              </svg>
              <span>Syncing...</span>
            </>
          ) : (
            <>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
                <path d="M3 12a9 9 0 019-9 9 9 0 019 9 9 9 0 01-9 9 9 9 0 01-9-9z" />
                <path d="M12 7v5l3 3" />
              </svg>
              <span>Sync</span>
            </>
          )}
        </button>

        {/* Popover — sync results */}
        {lastResult && (
          <div className="absolute top-full right-0 mt-2 w-72 z-50">
            <div className="card border-cyan/30">
              <div className="flex items-center justify-between mb-3">
                <h3 className="text-xs font-bold text-text-primary font-mono uppercase tracking-wider">Sync Results</h3>
                <span className="text-[10px] text-text-muted">{new Date(lastResult.timestamp).toLocaleTimeString()}</span>
              </div>
              <div className="space-y-2 text-xs">
                <div className="flex justify-between">
                  <span className="text-text-muted">Total Leads</span>
                  <span className="text-text-primary">{lastResult.totalLeads}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-text-muted">New Leads</span>
                  <span className={lastResult.newLeads > 0 ? 'text-cyan' : 'text-text-muted'}>+{lastResult.newLeads}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-text-muted">Updated Leads</span>
                  <span className={lastResult.updatedLeads > 0 ? 'text-neon-amber' : 'text-text-muted'}>+{lastResult.updatedLeads}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-text-muted">New Emails</span>
                  <span className={lastResult.newEmails > 0 ? 'text-cyan' : 'text-text-muted'}>+{lastResult.newEmails}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-text-muted">Conflicts Resolved</span>
                  <span className="text-neon-green">+{lastResult.conflictsResolved}</span>
                </div>
                <div className="flex justify-between pt-2 border-t border-border">
                  <span className="text-text-muted">Duration</span>
                  <span className="text-text-primary">{lastResult.syncDurationMs}ms</span>
                </div>
              </div>
              <div className="mt-3 pt-2 border-t border-border">
                <button
                  onClick={() => setLastResult(null)}
                  className="text-[10px] text-text-muted hover:text-text-primary transition-colors w-full"
                >
                  Dismiss
                </button>
              </div>
            </div>
            {/* Arrow */}
            <div className="absolute -top-1 right-4 w-3 h-3 rotate-45 border-l border-t border-border bg-bg-card"></div>
          </div>
        )}
      </div>
    </div>
  );
}
