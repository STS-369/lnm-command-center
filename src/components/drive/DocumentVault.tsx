'use client';

import { useState, useEffect, useCallback } from 'react';
import FileUploader from './FileUploader';
import FileManager from './FileManager';

interface DriveFile {
  id: string;
  name: string;
  mimeType: string;
  size?: string;
  createdTime?: string;
  modifiedTime?: string;
  webViewLink?: string;
}

interface FolderStructure {
  rootFolderId: string;
  folders: {
    proposals: string;
    contracts: string;
    invoices: string;
    research: string;
  };
}

type Tab = 'all' | 'proposals' | 'contracts' | 'invoices' | 'research';

const TAB_CONFIG: { key: Tab; label: string; icon: string }[] = [
  { key: 'all', label: 'All Files', icon: '📂' },
  { key: 'proposals', label: 'Proposals', icon: '📝' },
  { key: 'contracts', label: 'Contracts', icon: '📋' },
  { key: 'invoices', label: 'Invoices', icon: '💰' },
  { key: 'research', label: 'Research', icon: '🔬' },
];

export default function DocumentVault() {
  const [activeTab, setActiveTab] = useState<Tab>('all');
  const [structure, setStructure] = useState<FolderStructure | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [showUploader, setShowUploader] = useState(false);
  const [setupComplete, setSetupComplete] = useState(false);
  const [setupLoading, setSetupLoading] = useState(false);

  const setupFolders = useCallback(async () => {
    setSetupLoading(true);
    setError(null);
    try {
      const res = await fetch('/api/drive/setup', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({}),
      });
      if (!res.ok) {
        const err = await res.json();
        throw new Error(err.error || 'Setup failed');
      }
      const data = await res.json();
      setStructure(data.structure);
      setSetupComplete(true);
    } catch (err) {
      const msg = err instanceof Error ? err.message : 'Setup failed';
      setError(msg);
    } finally {
      setSetupLoading(false);
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    setupFolders();
  }, [setupFolders]);

  const getCurrentFolderId = (): string | undefined => {
    if (!structure) return undefined;
    if (activeTab === 'all') return structure.rootFolderId;
    return structure.folders[activeTab as keyof typeof structure.folders];
  };

  const handleUploadComplete = () => {
    setShowUploader(false);
  };

  const handleRefresh = () => {
    // Force FileManager to re-fetch by changing a key
    window.dispatchEvent(new CustomEvent('drive-refresh'));
  };

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-text-primary glow-text-cyan">Document Vault</h1>
          <p className="text-sm text-text-secondary mt-1">
            Google Drive integration — SOETech CRM
            {structure && (
              <span className="ml-2 text-neon-green text-xs">● Connected</span>
            )}
          </p>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={() => setShowUploader(!showUploader)}
            className="btn btn-primary"
          >
            {showUploader ? '✕ Close' : '📤 Upload Files'}
          </button>
          <button
            onClick={handleRefresh}
            className="btn btn-ghost"
          >
            🔄
          </button>
        </div>
      </div>

      {/* Setup Status */}
      {loading ? (
        <div className="card text-center py-8">
          <span className="animate-spin text-2xl">⏳</span>
          <p className="text-sm text-text-muted mt-2">Connecting to Google Drive...</p>
          {setupLoading && (
            <p className="text-xs text-text-muted mt-1">Setting up folder structure</p>
          )}
        </div>
      ) : error ? (
        <div className="card">
          <div className="text-center py-6">
            <div className="text-4xl mb-3">⚠️</div>
            <p className="text-sm text-neon-red">{error}</p>
            <button onClick={setupFolders} className="btn btn-secondary mt-3 text-sm">
              Retry Connection
            </button>
          </div>
        </div>
      ) : (
        <>
          {/* Folder Structure Info */}
          {structure && (
            <div className="card">
              <div className="flex items-center justify-between mb-3">
                <h2 className="text-sm font-bold text-text-primary font-mono uppercase tracking-wider">
                  SOETech CRM
                </h2>
                <button
                  onClick={() => {
                    const url = `https://drive.google.com/drive/folders/${structure.rootFolderId}`;
                    window.open(url, '_blank');
                  }}
                  className="btn btn-ghost text-xs"
                >
                  🔗 Open in Drive
                </button>
              </div>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                {Object.entries(structure.folders).map(([key, id]) => (
                  <button
                    key={key}
                    onClick={() => setActiveTab(key as Tab)}
                    className={`p-3 rounded-lg border transition-all text-left
                      ${activeTab === key
                        ? 'border-cyan bg-cyan/5'
                        : 'border-border hover:border-border-light hover:bg-bg-hover'
                      }`}
                  >
                    <span className="text-lg">
                      {key === 'proposals' ? '📝' : key === 'contracts' ? '📋' : key === 'invoices' ? '💰' : '🔬'}
                    </span>
                    <p className="text-xs font-medium text-text-primary mt-1 capitalize">{key}</p>
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Tab Navigation */}
          <div className="flex items-center gap-1 border-b border-border pb-0">
            {TAB_CONFIG.map((tab) => (
              <button
                key={tab.key}
                onClick={() => setActiveTab(tab.key)}
                className={`filter-tab ${activeTab === tab.key ? 'active' : ''}`}
              >
                <span className="mr-1">{tab.icon}</span>
                {tab.label}
              </button>
            ))}
          </div>

          {/* File Uploader */}
          {showUploader && (
            <div className="card animate-fade-in">
              <h3 className="text-sm font-bold text-text-primary mb-3 font-mono uppercase tracking-wider">
                Upload Files
              </h3>
              <FileUploader
                folderId={getCurrentFolderId()}
                category={activeTab === 'all' ? 'proposals' : activeTab}
                onUploadComplete={handleUploadComplete}
              />
            </div>
          )}

          {/* File Manager */}
          <div className="card">
            <FileManager
              key={`${activeTab}-${JSON.stringify(structure)}`}
              folderId={getCurrentFolderId()}
              onRefresh={handleRefresh}
            />
          </div>
        </>
      )}
    </div>
  );
}
