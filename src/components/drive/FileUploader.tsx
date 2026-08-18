'use client';

import { useState, useRef, useCallback } from 'react';

interface FileUploaderProps {
  folderId?: string;
  clientName?: string;
  category?: 'proposals' | 'contracts' | 'invoices' | 'research';
  onUploadComplete?: (file: DriveFile) => void;
}

interface DriveFile {
  id: string;
  name: string;
  mimeType: string;
  size?: string;
  createdTime?: string;
  modifiedTime?: string;
  webViewLink?: string;
}

export default function FileUploader({ folderId, clientName, category = 'proposals', onUploadComplete }: FileUploaderProps) {
  const [dragActive, setDragActive] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState<string[]>([]);
  const [error, setError] = useState<string | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const handleFiles = useCallback(async (files: FileList | File[]) => {
    const fileArray = Array.from(files);
    if (fileArray.length === 0) return;

    setUploading(true);
    setError(null);
    const newProgress: string[] = [];

    for (const file of fileArray) {
      try {
        newProgress.push(`Uploading ${file.name}...`);
        setUploadProgress([...newProgress]);

        const formData = new FormData();
        formData.append('file', file);
        if (folderId) formData.append('folderId', folderId);
        if (clientName) formData.append('clientName', clientName);
        formData.append('category', category);

        const res = await fetch('/api/drive/upload', {
          method: 'POST',
          body: formData,
        });

        if (!res.ok) {
          const err = await res.json();
          throw new Error(err.error || 'Upload failed');
        }

        const result = await res.json();
        newProgress[newProgress.length - 1] = `✅ ${file.name} uploaded`;
        setUploadProgress([...newProgress]);

        if (onUploadComplete) {
          onUploadComplete(result.file);
        }
      } catch (err) {
        const msg = err instanceof Error ? err.message : 'Unknown error';
        newProgress.push(`❌ ${file.name}: ${msg}`);
        setUploadProgress([...newProgress]);
        setError(msg);
      }
    }

    setUploading(false);
    // Clear progress after 3 seconds
    setTimeout(() => setUploadProgress([]), 3000);
  }, [folderId, clientName, category, onUploadComplete]);

  const handleDrag = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === 'dragenter' || e.type === 'dragover') {
      setDragActive(true);
    } else if (e.type === 'dragleave') {
      setDragActive(false);
    }
  }, []);

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      handleFiles(e.dataTransfer.files);
    }
  }, [handleFiles]);

  const handleChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    if (e.target.files && e.target.files.length > 0) {
      handleFiles(e.target.files);
    }
  }, [handleFiles]);

  return (
    <div className="w-full">
      <div
        className={`relative border-2 border-dashed rounded-xl p-8 text-center transition-all duration-200 cursor-pointer
          ${dragActive
            ? 'border-cyan bg-cyan/5 shadow-[0_0_20px_rgba(0,240,255,0.15)]'
            : 'border-border-light hover:border-cyan-dim hover:bg-bg-hover'
          }
          ${uploading ? 'opacity-60 pointer-events-none' : ''}
        `}
        onDragEnter={handleDrag}
        onDragLeave={handleDrag}
        onDragOver={handleDrag}
        onDrop={handleDrop}
        onClick={() => inputRef.current?.click()}
      >
        <input
          ref={inputRef}
          type="file"
          multiple
          className="hidden"
          onChange={handleChange}
          disabled={uploading}
        />
        <div className="space-y-3">
          <div className="text-4xl">📤</div>
          <div>
            <p className="text-sm font-medium text-text-primary">
              {uploading ? 'Uploading...' : 'Drop files here or click to browse'}
            </p>
            <p className="text-xs text-text-muted mt-1">
              {clientName
                ? `Uploading to SOETech CRM/${clientName}/01-${category}`
                : 'Upload to Google Drive'}
            </p>
          </div>
          <div className="flex items-center justify-center gap-2">
            <span className="btn btn-primary text-xs px-4 py-2">
              {uploading ? '⏳' : '📁'} Select Files
            </span>
          </div>
        </div>
      </div>

      {/* Upload Progress */}
      {uploadProgress.length > 0 && (
        <div className="mt-3 space-y-1">
          {uploadProgress.map((msg, i) => (
            <div key={i} className="text-xs px-3 py-1.5 rounded-lg bg-bg-hover text-text-secondary font-mono">
              {msg}
            </div>
          ))}
        </div>
      )}

      {error && (
        <div className="mt-2 text-xs text-neon-red px-3 py-1.5 rounded-lg bg-neon-red/10">
          {error}
        </div>
      )}
    </div>
  );
}
