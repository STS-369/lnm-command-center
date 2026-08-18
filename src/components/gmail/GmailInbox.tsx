'use client';

import { useState, useEffect, useCallback } from 'react';

interface GmailMessage {
  id: string;
  threadId: string;
  subject: string;
  from: string;
  to: string;
  date: string;
  snippet: string;
  body?: string;
  labelIds: string[];
  hasAttachment?: boolean;
}

export default function GmailInbox() {
  const [messages, setMessages] = useState<GmailMessage[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [profile, setProfile] = useState<{ emailAddress: string; messagesTotal: number } | null>(null);
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [selectedMessage, setSelectedMessage] = useState<{
    body: string;
    htmlBody?: string;
    subject: string;
    from: string;
    to: string;
    date: string;
    snippet?: string;
  } | null>(null);
  const [loadingMessage, setLoadingMessage] = useState(false);
  const [pageToken, setPageToken] = useState<string | undefined>(undefined);
  const [searchQuery, setSearchQuery] = useState('');

  const fetchMessages = useCallback(async (query?: string, token?: string) => {
    setLoading(true);
    setError(null);
    try {
      const params = new URLSearchParams({ maxResults: '20' });
      if (query) params.set('query', query);
      if (token) params.set('pageToken', token);

      const res = await fetch(`/api/gmail/list?${params}`);
      if (!res.ok) throw new Error('Failed to load inbox');
      const data = await res.json();
      setMessages(data.messages || []);
      setPageToken(data.nextPageToken);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to load inbox');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    fetchMessages();
    // Also fetch profile
    fetch('/api/gmail/list?type=profile')
      .then((r) => r.json())
      .then((data) => setProfile(data.profile))
      .catch(() => {});
  }, [fetchMessages]);

  const openMessage = async (id: string) => {
    if (selectedId === id) {
      setSelectedId(null);
      setSelectedMessage(null);
      return;
    }
    setSelectedId(id);
    setLoadingMessage(true);
    try {
      const res = await fetch(`/api/gmail/message?id=${id}`);
      if (!res.ok) throw new Error('Failed to load message');
      const data = await res.json();
      setSelectedMessage(data.message);
    } catch {
      setSelectedMessage(null);
    } finally {
      setLoadingMessage(false);
    }
  };

  const handleSearch = () => {
    fetchMessages(searchQuery || undefined);
  };

  const formatDate = (dateStr: string) => {
    if (!dateStr) return '';
    try {
      const date = new Date(dateStr);
      const now = new Date();
      const diffMs = now.getTime() - date.getTime();
      const diffHours = diffMs / (1000 * 60 * 60);

      if (diffHours < 24) {
        return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
      }
      return date.toLocaleDateString([], { month: 'short', day: 'numeric' });
    } catch {
      return dateStr;
    }
  };

  return (
    <div className="space-y-4">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-sm font-bold text-text-primary font-mono uppercase tracking-wider">
            📬 Gmail Inbox
          </h3>
          {profile && (
            <p className="text-xs text-text-muted mt-0.5">
              {profile.emailAddress} • {profile.messagesTotal.toLocaleString()} messages
            </p>
          )}
        </div>
        <button
          onClick={() => fetchMessages(searchQuery || undefined)}
          className="btn btn-ghost text-xs"
          disabled={loading}
        >
          🔄 Refresh
        </button>
      </div>

      {/* Search */}
      <div className="flex gap-2">
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
          placeholder="Search emails..."
          className="input text-sm flex-1"
        />
        <button onClick={handleSearch} className="btn btn-secondary text-xs">
          🔍 Search
        </button>
      </div>

      {/* Loading */}
      {loading && (
        <div className="text-center py-8">
          <span className="animate-spin text-xl">⏳</span>
          <p className="text-xs text-text-muted mt-2">Loading inbox...</p>
        </div>
      )}

      {/* Error */}
      {error && (
        <div className="card text-center py-6">
          <p className="text-sm text-neon-red">{error}</p>
          <button onClick={() => fetchMessages()} className="btn btn-secondary text-xs mt-2">
            Retry
          </button>
        </div>
      )}

      {/* Messages */}
      {!loading && !error && (
        <div className="space-y-1">
          {messages.length === 0 && (
            <div className="text-center py-8">
              <p className="text-sm text-text-muted">No emails found</p>
            </div>
          )}

          {messages.map((msg) => (
            <div key={msg.id}>
              <div
                onClick={() => openMessage(msg.id)}
                className={`card cursor-pointer transition-all hover:border-border-light ${
                  selectedId === msg.id ? 'border-cyan/30 bg-cyan/5' : ''
                } ${
                  msg.labelIds.includes('UNREAD') ? 'border-l-2 border-l-cyan' : ''
                }`}
              >
                <div className="flex items-start justify-between gap-3">
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2">
                      <span className={`text-sm ${msg.labelIds.includes('UNREAD') ? 'font-bold text-text-primary' : 'text-text-secondary'}`}>
                        {msg.from ? msg.from.replace(/<.*>/, '').trim() : 'Unknown'}
                      </span>
                      {msg.hasAttachment && <span className="text-xs">📎</span>}
                    </div>
                    <p className={`text-xs mt-0.5 ${msg.labelIds.includes('UNREAD') ? 'text-text-primary font-medium' : 'text-text-muted'}`}>
                      {msg.subject || '(no subject)'}
                    </p>
                    <p className="text-xs text-text-muted truncate mt-0.5">
                      {msg.snippet}
                    </p>
                  </div>
                  <span className="text-xs text-text-muted whitespace-nowrap">
                    {formatDate(msg.date)}
                  </span>
                </div>
              </div>

              {/* Expanded message */}
              {selectedId === msg.id && (
                <div className="card ml-4 mt-1 animate-fade-in">
                  {loadingMessage ? (
                    <div className="text-center py-4">
                      <span className="animate-spin text-sm">⏳</span>
                    </div>
                  ) : selectedMessage ? (
                    <div className="space-y-3">
                      <div className="text-xs space-y-1">
                        <p><span className="text-text-muted">Subject:</span> <span className="text-text-primary">{selectedMessage.subject}</span></p>
                        <p><span className="text-text-muted">From:</span> <span className="text-text-primary">{selectedMessage.from}</span></p>
                        <p><span className="text-text-muted">To:</span> <span className="text-text-primary">{selectedMessage.to}</span></p>
                        <p><span className="text-text-muted">Date:</span> <span className="text-text-primary">{selectedMessage.date}</span></p>
                      </div>
                      <div className="bg-bg-secondary rounded-lg p-4 text-sm text-text-primary whitespace-pre-wrap leading-relaxed max-h-96 overflow-y-auto">
                        {selectedMessage.body || selectedMessage.snippet}
                      </div>
                    </div>
                  ) : (
                    <p className="text-xs text-text-muted text-center py-4">Could not load message</p>
                  )}
                </div>
              )}
            </div>
          ))}

          {/* Pagination */}
          {pageToken && (
            <div className="text-center pt-4">
              <button
                onClick={() => fetchMessages(searchQuery || undefined, pageToken)}
                className="btn btn-secondary text-xs"
              >
                Load More →
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
