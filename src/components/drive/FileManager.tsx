'use client';

import { useState, useEffect, useCallback } from 'react';

interface DriveFile {
  id: string;
  name: string;
  mimeType: string;
  size?: string;
  createdTime?: string;
  modifiedTime?: string;
  webViewLink?: string;
}

interface FileManagerProps {
  folderId?: string;
  clientName?: string;
  onFileSelect?: (file: DriveFile) => void;
  onRefresh?: () => void;
}

const FILE_ICONS: Record<string, string> = {
  'application/pdf': '📄',
  'application/vnd.google-apps.document': '📝',
  'application/vnd.google-apps.spreadsheet': '📊',
  'application/vnd.google-apps.folder': '📁',
  'image/png': '🖼️',
  'image/jpeg': '🖼️',
  'image/gif': '🖼️',
  'application/zip': '📦',
  'text/plain': '📃',
  'application/vnd.openxmlformats-officedocument.wordprocessingml.document': '📝',
  'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet': '📊',
  'application/vnd.openxmlformats-officedocument.presentationml.presentation': '📑',
};

function getFileIcon(mimeType: string): string {
  if (mimeType.startsWith('image/')) return '🖼️';
  return FILE_ICONS[mimeType] || '📄';
}

function formatFileSize(sizeStr?: string): string {
  if (!sizeStr) return '—';
  const bytes = parseInt(sizeStr, 10);
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
}

function formatDate(dateStr?: string): string {
  if (!dateStr) return '—';
  return new Date(dateStr).toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  });
}

export default function FileManager({ folderId, clientName, onFileSelect, onRefresh }: FileManagerProps) {
  const [files, setFiles] = useState<DriveFile[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [nextPageToken, setNextPageToken] = useState<string | undefined>();
  const [selectedFile, setSelectedFile] = useState<string | null>(null);

  const fetchFiles = useCallback(async (token?: string) => {
    setLoading(true);
    setError(null);
    try {
      const params = new URLSearchParams();
      if (folderId) params.set('folderId', folderId);
      if (token) params.set('pageToken', token);
      params.set('pageSize', '50');

      const res = await fetch(`/api/drive/list?${params.toString()}`);
      if (!res.ok) {
        const err = await res.json();
        throw new Error(err.error || 'Failed to list files');
      }

      const data = await res.json();
      setFiles(prev => token ? [...prev, ...data.files] : data.files);
      setNextPageToken(data.nextPageToken);
    } catch (err) {
      const msg = err instanceof Error ? err.message : 'Unknown error';
      setError(msg);
    } finally {
      setLoading(false);
    }
  }, [folderId]);

  useEffect(() => {
    fetchFiles();
  }, [fetchFiles]);

  const handleSearch = async () => {
    if (!searchQuery.trim()) {
      fetchFiles();
      return;
    }
    setLoading(true);
    setError(null);
    try {
      const res = await fetch(`/api/drive/list?type=search&query=${encodeURIComponent(searchQuery)}`);
      if (!res.ok) {
        const err = await res.json();
        throw new Error(err.error || 'Search failed');
      }
      const data = await res.json();
      setFiles(data.files);
    } catch (err) {
      const msg = err instanceof Error ? err.message : 'Unknown error';
      setError(msg);
    } finally {
      setLoading(false);
    }
  };

  const handleDownload = (fileId: string) => {
    window.open(`/api/drive/download?fileId=${fileId}`, '_blank');
  };

  const handleDelete = async (fileId: string, fileName: string) => {
    if (!confirm(`Delete "${fileName}"?`)) return;
    try {
      const res = await fetch(`/api/drive/delete?fileId=${fileId}`, { method: 'DELETE' });
      if (!res.ok) throw new Error('Delete failed');
      setFiles(prev => prev.filter(f => f.id !== fileId));
      onRefresh?.();
    } catch (err) {
      const msg = err instanceof Error ? err.message : 'Delete failed';
      alert(msg);
    }
  };

  const handleSelectFile = (file: DriveFile) => {
    setSelectedFile(file.id);
    onFileSelect?.(file);
  };

  return (
    <div className="space-y-4">
      {/* Search + Actions Bar */}
      <div className="flex items-center gap-3">
        <div className="flex-1 relative">
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
            placeholder="Search files..."
            className="input pl-10"
          />
          <span className="absolute left-3 top-1/2 -translate-y-1/2 text-text-muted text-sm">🔍</span>
        </div>
        <button onClick={handleSearch} className="btn btn-secondary text-sm">
          Search
        </button>
        <button onClick={() => fetchFiles()} className="btn btn-ghost text-sm">
          🔄 Refresh
        </button>
      </div>

      {/* Error */}
      {error && (
        <div className="text-xs text-neon-red px-3 py-2 rounded-lg bg-neon-red/10 border border-neon-red/20">
          ⚠️ {error}
        </div>
      )}

      {/* File List */}
      {loading ? (
        <div className="flex items-center justify-center py-12">
          <div className="text-center">
            <span className="animate-spin text-2xl">⏳</span>
            <p className="text-sm text-text-muted mt-2">Loading files...</p>
          </div>
        </div>
      ) : files.length === 0 ? (
        <div className="text-center py-12">
          <div className="text-4xl mb-3">📂</div>
          <p className="text-sm text-text-muted">
            {clientName
              ? `No files yet in SOETech CRM/${clientName}`
              : searchQuery
                ? 'No files match your search'
                : 'No files in this folder'}
          </p>
          <p className="text-xs text-text-muted mt-1">Upload files using the dropzone above</p>
        </div>
      ) : (
        <div className="space-y-1">
          {files.map((file) => (
            <div
              key={file.id}
              className={`flex items-center gap-3 p-3 rounded-lg transition-all cursor-pointer
                ${selectedFile === file.id
                  ? 'bg-cyan/10 border border-cyan-dim'
                  : 'hover:bg-bg-hover border border-transparent'
                }`}
              onClick={() => handleSelectFile(file)}
            >
              <span className="text-xl flex-shrink-0">{getFileIcon(file.mimeType)}</span>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-text-primary truncate">{file.name}</p>
                <div className="flex items-center gap-3 mt-0.5">
                  <span className="text-xs text-text-muted">{formatFileSize(file.size)}</span>
                  <span className="text-xs text-text-muted">{formatDate(file.modifiedTime || file.createdTime)}</span>
                </div>
              </div>
              <div className="flex items-center gap-1 flex-shrink-0">
                {file.webViewLink && (
                  <a
                    href={file.webViewLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn btn-ghost text-xs px-2 py-1"
                    title="Open in Drive"
                    onClick={(e) => e.stopPropagation()}
                  >
                    🔗
                  </a>
                )}
                <button
                  onClick={(e) => { e.stopPropagation(); handleDownload(file.id); }}
                  className="btn btn-ghost text-xs px-2 py-1"
                  title="Download"
                >
                  ⬇️
                </button>
                <button
                  onClick={(e) => { e.stopPropagation(); handleDelete(file.id, file.name); }}
                  className="btn btn-ghost text-xs px-2 py-1 text-neon-red"
                  title="Delete"
                >
                  🗑️
                </button>
              </div>
            </div>
          ))}

          {/* Load More */}
          {nextPageToken && (
            <div className="text-center py-3">
              <button
                onClick={() => fetchFiles(nextPageToken)}
                className="btn btn-secondary text-xs"
              >
                Load More
              </button>
            </div>
          )}
        </div>
      )}

      {/* File Count */}
      {!loading && files.length > 0 && (
        <p className="text-xs text-text-muted text-center">
          {files.length} file{files.length !== 1 ? 's' : ''}
        </p>
      )}
    </div>
  );
}
