'use client';

import { useState, useEffect, useRef } from 'react';

  // Generate SOETech-styled HTML from plain text body
  const generateHtmlEmail = (email: any): string => {
    if (email.html_body) return email.html_body;
    
    const bodyParagraphs = (email.body || 'No content')
      .split('\n')
      .filter((line: string) => line.trim())
      .map((line: string) => `<p style="margin: 0 0 16px; font-size: 16px; line-height: 1.6; color: #e0e0e0;">${line}</p>`)
      .join('\n');
    
    return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${email.subject || "SOETech Email"}</title>
</head>
<body style="margin: 0; padding: 0; background-color: #0a0a0a; font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;">
  <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background-color: #0a0a0a; padding: 40px 20px;">
    <tr>
      <td align="center">
        <table role="presentation" width="600" cellpadding="0" cellspacing="0" style="background-color: #111111; border-radius: 12px; border: 1px solid #1a1a1a; overflow: hidden;">
          <tr>
            <td style="padding: 32px 40px; border-bottom: 1px solid #1a1a1a;">
              <table width="100%" cellpadding="0" cellspacing="0">
                <tr>
                  <td><h1 style="margin: 0; font-size: 24px; font-weight: 700; color: #00d4ff;">SOETech</h1></td>
                  <td align="right"><span style="font-size: 12px; color: #a855f7; text-transform: uppercase; letter-spacing: 1px;">${email.subject || "Outreach"}</span></td>
                </tr>
              </table>
            </td>
          </tr>
          <tr>
            <td style="padding: 40px;">
              <p style="margin: 0 0 20px; font-size: 16px; line-height: 1.6; color: #e0e0e0;">Hi there,</p>
              ${bodyParagraphs}
              <table cellpadding="0" cellspacing="0" style="margin: 30px 0;">
                <tr>
                  <td style="border-radius: 8px; background: linear-gradient(135deg, #00d4ff, #a855f7);">
                    <a href="#" style="display: inline-block; padding: 14px 32px; font-size: 14px; font-weight: 600; color: #ffffff; text-decoration: none;">Schedule a 15-Minute Call</a>
                  </td>
                </tr>
              </table>
            </td>
          </tr>
          <tr>
            <td style="padding: 32px 40px; border-top: 1px solid #1a1a1a;">
              <p style="margin: 0; font-size: 14px; color: #888888;">Best regards,</p>
              <p style="margin: 8px 0 0; font-size: 16px; font-weight: 600; color: #00d4ff;">Sophia Saitta & The SOETech Team</p>
              <p style="margin: 4px 0 0; font-size: 12px; color: #666666;">— Empowering Humanity Through Technology</p>
              <p style="margin: 4px 0 0; font-size: 12px; color: #666666;">https://soetechllc.com</p>
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>
</body>
</html>`;
  };


import { getEmails, isDataImported } from '@/lib/client-db';
import { useSearchParams } from 'next/navigation';
import ComposeEmail from '@/components/gmail/ComposeEmail';
import GmailInbox from '@/components/gmail/GmailInbox';

type OutreachTab = 'drafts' | 'inbox' | 'compose';
type ViewMode = 'list' | 'preview';

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
  const [viewMode, setViewMode] = useState<ViewMode>('list');
  const [previewEmailId, setPreviewEmailId] = useState<string | null>(null);
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [codeView, setCodeView] = useState(false);
  const iframeRef = useRef<HTMLIFrameElement>(null);

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

  const handleCopyHtml = async (html: string, emailId: string) => {
    try {
      await navigator.clipboard.writeText(html);
      setCopiedId(emailId);
      setTimeout(() => setCopiedId(null), 2000);
    } catch (err) {
      console.error('Failed to copy:', err);
    }
  };

  const handlePreview = (emailId: string) => {
    setPreviewEmailId(emailId);
    setViewMode('preview');
    setCodeView(false);
  };

  const handleEdit = (email: any) => {
    setSendTarget({ to: email.email || '', subject: email.subject, body: email.body });
    setActiveTab('compose');
  };

  const handlePreviewMode = () => {
    setViewMode('preview');
    setCodeView(false);
    // Auto-select first email if none selected
    if (!previewEmailId && filteredEmails.length > 0) {
      setPreviewEmailId(filteredEmails[0].id);
    }
  };

  const handleBackToList = () => {
    setViewMode('list');
    setPreviewEmailId(null);
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

  const previewEmail = previewEmailId ? emails.find(e => e.id === previewEmailId) : null;

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

          {emails.length > 0 && viewMode === 'list' && (
            <>
              {/* Search and View Toggle */}
              <div className="flex items-center gap-3">
                <div className="relative flex-1">
                  <input
                    type="text"
                    placeholder="Search by business name or subject..."
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    className="input pl-10"
                  />
                  <span className="absolute left-3 top-1/2 -translate-y-1/2 text-text-muted">🔍</span>
                </div>
                <button
                  onClick={handlePreviewMode}
                  className="btn btn-secondary text-sm whitespace-nowrap"
                >
                  📧 Preview Mode
                </button>
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
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              handlePreview(email.id);
                            }}
                            className="btn btn-secondary text-xs"
                          >
                            👁️ Preview HTML
                          </button>
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              handleEdit(email);
                            }}
                            className="btn btn-ghost text-xs"
                          >
                            ✏️ Edit
                          </button>
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              handleCopyHtml(email.body, email.id);
                            }}
                            className="btn btn-ghost text-xs"
                          >
                            {copiedId === email.id ? '✓ Copied!' : '📋 Copy'}
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

          {emails.length > 0 && viewMode === 'preview' && previewEmail && (
            <div className="space-y-4">
              {/* Preview Header */}
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <button
                    onClick={handleBackToList}
                    className="btn btn-ghost text-sm"
                  >
                    ← Back to List
                  </button>
                  <div>
                    <h2 className="text-lg font-bold text-text-primary">{previewEmail.subject}</h2>
                    <p className="text-sm text-text-secondary">To: {previewEmail.lead_name}</p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => setCodeView(!codeView)}
                    className={`btn text-sm ${codeView ? 'btn-primary' : 'btn-secondary'}`}
                  >
                    {'</>'} {codeView ? 'Visual' : 'Code'}
                  </button>
                  {previewEmail && (
                    <button
                      onClick={() => handleCopyHtml(generateHtmlEmail(previewEmail), previewEmail.id)}
                      className="btn btn-secondary text-sm"
                    >
                      {copiedId === previewEmail.id ? '✓ Copied!' : '📋 Copy HTML'}
                    </button>
                  )}
                  <button
                    onClick={() => handleSendFromDraft(previewEmail)}
                    className="btn btn-primary text-sm"
                  >
                    📤 Send via Gmail
                  </button>
                </div>
              </div>

              {/* Preview Card */}
              <div className="card overflow-hidden">
                <div className="bg-bg-secondary border-b border-border px-4 py-3 flex items-center gap-2">
                  <div className="flex gap-1.5">
                    <div className="w-3 h-3 rounded-full bg-red-500/80"></div>
                    <div className="w-3 h-3 rounded-full bg-yellow-500/80"></div>
                    <div className="w-3 h-3 rounded-full bg-green-500/80"></div>
                  </div>
                  <span className="text-xs text-text-muted font-mono ml-2">Email Preview</span>
                </div>

                {codeView ? (
                  <div className="p-4 bg-bg-secondary max-h-[600px] overflow-auto">
                    <pre className="text-xs text-text-primary font-mono whitespace-pre-wrap break-words">
                      {generateHtmlEmail(previewEmail)}
                    </pre>
                  </div>
                ) : (
                  <iframe
                    ref={iframeRef}
                    srcDoc={generateHtmlEmail(previewEmail)}
                    className="w-full border-0 bg-[#0a0a0a]"
                    style={{ minHeight: '500px', height: 'auto' }}
                    title="Email Preview"
                    sandbox="allow-same-origin"
                  />
                )}
              </div>
            </div>
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
