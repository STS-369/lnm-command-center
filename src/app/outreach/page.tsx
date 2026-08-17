'use client';

import { useState } from 'react';
import { seedDemoData, getEmails, isDataImported } from '@/lib/client-db';
import type { OutreachEmail } from '@/lib/client-db';

function initializeData() {
  seedDemoData();
  return {
    emails: getEmails(),
    imported: isDataImported(),
  };
}

export default function OutreachPage() {
  const [data] = useState(initializeData);
  const { emails, imported } = data;
  const [filter, setFilter] = useState('all');
  const [search, setSearch] = useState('');
  const [expandedId, setExpandedId] = useState<string | null>(null);

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
          {filteredEmails.length} email drafts
          {imported && (
            <span className="ml-2 text-neon-green text-xs">● Live Data</span>
          )}
        </p>
      </div>

      {!imported && emails.length === 0 && (
        <div className="card text-center py-16">
          <div className="text-5xl mb-4">📧</div>
          <h2 className="text-lg font-bold text-text-primary font-mono mb-2">No Email Drafts</h2>
          <p className="text-sm text-text-secondary max-w-md mx-auto mb-4">
            Import your lead data from the Pipeline page to load 99 pre-written sales email drafts.
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
                      <button className="btn btn-primary text-xs">
                        📤 Send Email
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
    </div>
  );
}
