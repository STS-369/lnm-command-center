'use client';

import { useState, useEffect } from 'react';
import { getEmails, isDataImported } from '@/lib/client-db';
import { useSearchParams } from 'next/navigation';
import ComposeEmail from '@/components/gmail/ComposeEmail';
import GmailInbox from '@/components/gmail/GmailInbox';

type OutreachTab = 'drafts' | 'inbox' | 'compose';

export default function OutreachPage() {
  const searchParams = useSearchParams();
  const initialSearch = searchParams.get('search') || '';
  const [activeTab, setActiveTab] = useState<OutreachTab>('drafts');
  const [emails, setEmails] = useState<any[]>([]);
  const [imported, setImported] = useState(false);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('all');
  const [search, setSearch] = useState(initialSearch);
  const [expandedId, setExpandedId] = useState<string | null>(null);
  const [sendTarget, setSendTarget] = useState<{ to: string; subject: string; body: string } | null>(null);

  useEffect(() => {
    async function load() {
      try {
        const [e, imp] = await Promise.all([getEmails(), isDataImported()]);
        setEmails(e);
        setImported(imp);
      } catch (err) {
        console.error('Failed to load emails:', err);
      } finally {
        setLoading(false);
      }
    }
    load();
  }, []);

  const handleSendFromDraft = (email: any) => {
    setSendTarget({ to: email.email || '', subject: email.subject, body: email.body });
    setActiveTab('compose');
  };

  const tabs = [
    { key: 'drafts' as OutreachTab, label: 'Drafts', icon: '📝', count: emails.length },
    { key: 'inbox' as OutreachTab, label: 'Gmail Inbox', icon: '📬' },
    { key: 'compose' as OutreachTab, label: 'Compose', icon: '✉️' },
  ];

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-center">
          <span className="animate-spin text-2xl">⏳</span>
          <p className="text-sm text-text-muted mt-2">Loading outreach...</p>
        </div>
      </div>
    );
  }

  const filteredEmails = emails.filter(e => {
    const matchesFilter = filter === 'all' || e.status === filter;
    const matchesSearch = !search ||
      e.lead_name.toLowerCase().includes(search.toLowerCase()) ||
      e.subject.toLowerCase().includes(search.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  const statusCounts: Record<string, number> = {};
  for (const email of emails) {
    statusCounts[email.status] = (statusCounts[email.status] || 0) + 1;
  }

  const statusFilters = [
    { key: 'all', label: 'All' },
    { key: 'draft', label: 'Draft' },
    { key: 'sent', label: 'Sent' },
    { key: 'opened', label: 'Opened' },
    { key: 'replied', label: 'Replied' },
  ];

  const statusBadgeClass: Record<string, string> = {
    draft: 'badge-new',
    sent: 'badge-outreach',
    opened: 'badge-researched',
    replied: 'badge-active_deal',
  };

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div>
        <h1 className="text-2xl font-bold text-text-primary glow-text-cyan">Outreach</h1>
        <p className="text-sm text-text-secondary mt-1">
          Email drafts + Gmail integration
          <span className="ml-2 text-neon-green text-xs">● Gmail Connected</span>
        </p>
      </div>

      {/* Tab Navigation */}
      <div className="flex items-center gap-1 border-b border-border pb-0">
        {tabs.map((tab) => (
          <button
            key={tab.key}
            onClick={() => setActiveTab(tab.key)}
            className={`filter-tab ${activeTab === tab.key ? 'active' : ''}`}
          >
            <span className="mr-1">{tab.icon}</span>
            {tab.label}
            {tab.count !== undefined && (
              <span className="ml-1 text-[10px] text-text-muted">({tab.count})</span>
            )}
          </button>
        ))}
      </div>

      {/* Tab Content */}
      {activeTab === 'drafts' && (
        <>
          {!imported && emails.length === 0 && (
            <div className="card text-center py-16">
              <div className="text-5xl mb-4">📧</div>
              <h2 className="text-lg font-bold text-text-primary font-mono mb-2">No Email Drafts</h2>
              <p className="text-sm text-text-secondary max-w-md mx-auto mb-4">
                Import your lead data from the Pipeline page to load pre-written sales email drafts.
              </p>
              <a href="/pipeline" className="btn btn-primary text-sm">
                📥 Go to Pipeline to Import
              </a>
            </div>
          )}

          {emails.length > 0 && (
            <>
              {/* Search */}
              <div className="relative">
                <input
                  type="text"
                  placeholder="Search by business name or subject..."
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  className="input pl-10"
                />
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-text-muted">🔍</span>
              </div>

              {/* Filters */}
              <div className="flex flex-wrap gap-2">
                {statusFilters.map((f) => {
                  const count = f.key === 'all' ? emails.length : (statusCounts[f.key] || 0);
                  return (
                    <button
                      key={f.key}
                      onClick={() => setFilter(f.key)}
                      className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all flex items-center gap-1.5 ${
                        filter === f.key
                          ? 'bg-cyan/20 text-cyan border border-cyan/30'
                          : 'bg-bg-card text-text-secondary border border-border hover:border-border-light'
                      }`}
                    >
                      {f.label}
                      <span className={`text-[10px] ${filter === f.key ? 'text-cyan/70' : 'text-text-muted'}`}>
                        {count}
                      </span>
                    </button>
                  );
                })}
              </div>

              {/* Email List */}
              <div className="space-y-3">
                {filteredEmails.slice(0, 50).map((email) => (
                  <div
                    key={email.id}
                    className="card cursor-pointer transition-all hover:border-border-light"
                    onClick={() => setExpandedId(expandedId === email.id ? null : email.id)}
                  >
                    <div className="flex items-start justify-between gap-4">
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 mb-1">
                          <h3 className="text-sm font-medium text-text-primary">{email.lead_name}</h3>
                          <span className={`badge ${statusBadgeClass[email.status] || 'badge-new'}`}>
                            {email.status}
                          </span>
                        </div>
                        <p className="text-sm text-text-secondary truncate">{email.subject}</p>
                      </div>
                      <span className="text-text-muted text-sm">
                        {expandedId === email.id ? '▲' : '▼'}
                      </span>
                    </div>

                    {expandedId === email.id && (
                      <div className="mt-4 pt-4 border-t border-border">
                        <div className="bg-bg-secondary rounded-lg p-4">
                          <p className="text-sm text-text-primary whitespace-pre-wrap leading-relaxed">
                            {email.body}
                          </p>
                        </div>
                        <div className="flex items-center gap-4 mt-3">
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              handleSendFromDraft(email);
                            }}
                            className="btn btn-primary text-xs"
                          >
                            📤 Send via Gmail
                          </button>
                          <button className="btn btn-secondary text-xs">
                            ✏️ Edit
                          </button>
                          <button className="btn btn-ghost text-xs">
                            📋 Copy
                          </button>
                        </div>
                      </div>
                    )}
                  </div>
                ))}
              </div>

              {filteredEmails.length > 50 && (
                <div className="text-center py-4">
                  <p className="text-xs text-text-muted">
                    Showing 50 of {filteredEmails.length} emails. Use search to narrow results.
                  </p>
                </div>
              )}
            </>
          )}
        </>
      )}

      {activeTab === 'inbox' && <GmailInbox />}

      {activeTab === 'compose' && (
        <ComposeEmail
          defaultTo={sendTarget?.to || ''}
          defaultSubject={sendTarget?.subject || ''}
          defaultBody={sendTarget?.body || ''}
          onSent={() => {
            setSendTarget(null);
            setActiveTab('inbox');
          }}
          onCancel={() => {
            setSendTarget(null);
            setActiveTab('drafts');
          }}
        />
      )}
    </div>
  );
}
