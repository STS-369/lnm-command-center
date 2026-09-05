'use client';

import React, { useState, useEffect, useRef } from 'react';
import { getEmails, OutreachEmail } from '@/lib/client-db';
import GmailInbox from '@/components/gmail/GmailInbox';
import ComposeEmail from '@/components/gmail/ComposeEmail';

type Tab = 'drafts' | 'inbox' | 'compose';

export default function OutreachPage() {
  const [tab, setTab] = useState<Tab>('drafts');
  const [emails, setEmails] = useState<OutreachEmail[]>([]);
  const [loading, setLoading] = useState(true);
  const [previewEmailId, setPreviewEmailId] = useState<string | null>(null);
  const [codeView, setCodeView] = useState(false);
  const iframeRef = useRef<HTMLIFrameElement>(null);

  useEffect(() => {
    (async () => {
      try {
        const list = await getEmails();
        // newest first
        list.sort((a, b) => (b.created_at || '').localeCompare(a.created_at || ''));
        setEmails(list);
        if (list.length > 0) setPreviewEmailId(list[0].id);
      } catch (e) {
        console.error('Failed to load emails', e);
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  // iframe auto-resize (critical: height:auto does not work on iframes)
  useEffect(() => {
    const iframe = iframeRef.current;
    if (!iframe || codeView) return;
    const resizeIframe = () => {
      try {
        const doc = iframe.contentDocument || iframe.contentWindow?.document;
        if (doc && doc.body) {
          iframe.style.height = `${Math.max(doc.body.scrollHeight, 500)}px`;
        }
      } catch (e) { /* cross-origin */ }
    };
    iframe.addEventListener('load', resizeIframe);
    resizeIframe();
    return () => iframe.removeEventListener('load', resizeIframe);
  }, [previewEmailId, codeView]);

  const previewEmail = emails.find(e => e.id === previewEmailId) || null;
  const htmlCount = emails.filter(e => e.html_body).length;

  const tabButton = (id: Tab, label: string, badge?: number) => (
    <button
      onClick={() => setTab(id)}
      className={`px-4 py-2 rounded-lg text-sm font-semibold transition-colors ${
        tab === id
          ? 'bg-[#00d4ff] text-black'
          : 'bg-[#1a1a2e] text-gray-300 hover:bg-[#252540]'
      }`}
    >
      {label}
      {badge !== undefined && badge > 0 && (
        <span className="ml-2 px-2 py-0.5 rounded-full text-xs bg-[#a855f7] text-white">{badge}</span>
      )}
    </button>
  );

  return (
    <div className="p-6 max-w-7xl mx-auto">
      <h1 className="text-2xl font-bold text-white mb-4">Email Outreach</h1>

      <div className="flex gap-2 mb-6">
        {tabButton('drafts', 'Drafts', emails.length)}
        {tabButton('inbox', 'Gmail Inbox')}
        {tabButton('compose', 'Compose')}
      </div>

      {tab === 'drafts' && (
        loading ? (
          <p className="text-gray-400">Loading drafts…</p>
        ) : emails.length === 0 ? (
          <p className="text-gray-400">No email drafts found.</p>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* List */}
            <div className="lg:col-span-1 space-y-2 max-h-[75vh] overflow-y-auto pr-1">
              {emails.map(e => (
                <button
                  key={e.id}
                  onClick={() => { setPreviewEmailId(e.id); setCodeView(false); }}
                  className={`w-full text-left p-3 rounded-lg border transition-colors ${
                    previewEmailId === e.id
                      ? 'border-[#00d4ff] bg-[#0f2030]'
                      : 'border-[#2a2a3a] bg-[#141420] hover:border-[#a855f7]'
                  }`}
                >
                  <div className="flex items-center justify-between gap-2">
                    <span className="text-sm font-semibold text-white truncate">{e.lead_name}</span>
                    {e.html_body && (
                      <span className="text-[10px] px-1.5 py-0.5 rounded bg-[#a855f7]/20 text-[#a855f7] shrink-0">HTML</span>
                    )}
                  </div>
                  <div className="text-xs text-gray-400 truncate mt-1">{e.subject}</div>
                  <div className="text-[10px] text-gray-500 mt-1 uppercase tracking-wide">{e.status}</div>
                </button>
              ))}
            </div>

            {/* Preview */}
            <div className="lg:col-span-2">
              {previewEmail ? (
                <div className="email-preview-card bg-[#111118] border border-[#2a2a3a] rounded-xl overflow-hidden">
                  <div className="email-preview-toolbar flex items-center justify-between px-4 py-2 bg-[#1a1a24] border-b border-[#2a2a3a]">
                    <div className="flex gap-1.5">
                      <span className="w-3 h-3 rounded-full bg-red-500" />
                      <span className="w-3 h-3 rounded-full bg-yellow-500" />
                      <span className="w-3 h-3 rounded-full bg-green-500" />
                    </div>
                    <div className="flex gap-2">
                      <button
                        onClick={() => setCodeView(false)}
                        className={`px-3 py-1 text-xs rounded ${!codeView ? 'bg-[#00d4ff] text-black' : 'bg-[#252540] text-gray-300'}`}
                      >Visual</button>
                      <button
                        onClick={() => setCodeView(true)}
                        className={`px-3 py-1 text-xs rounded ${codeView ? 'bg-[#00d4ff] text-black' : 'bg-[#252540] text-gray-300'}`}
                      >Code</button>
                      <button
                        onClick={() => {
                          const html = previewEmail.html_body || `<html><body><pre style="font-family:inherit">${previewEmail.body}</pre></body></html>`;
                          navigator.clipboard.writeText(html).then(() => {
                            const btn = document.getElementById('copy-feedback');
                            if (btn) { btn.textContent = '✓ Copied!'; setTimeout(() => { btn.textContent = 'Copy HTML'; }, 1500); }
                          });
                        }}
                        className="px-3 py-1 text-xs rounded bg-[#252540] text-gray-300 hover:bg-[#a855f7] hover:text-white"
                        id="copy-feedback"
                      >Copy HTML</button>
                    </div>
                  </div>
                  <div className="p-2">
                    <div className="px-3 py-2 text-sm text-gray-300">
                      <span className="text-[#00d4ff] font-semibold">To:</span> {previewEmail.lead_name}
                      <span className="mx-2 text-gray-600">|</span>
                      <span className="text-[#a855f7] font-semibold">Subject:</span> {previewEmail.subject}
                    </div>
                    {codeView ? (
                      <pre className="text-xs text-gray-300 bg-[#0a0a12] p-4 rounded-lg overflow-auto max-h-[70vh] whitespace-pre-wrap">
                        {previewEmail.html_body || previewEmail.body}
                      </pre>
                    ) : previewEmail.html_body ? (
                      <iframe
                        ref={iframeRef}
                        srcDoc={previewEmail.html_body}
                        title={`Preview: ${previewEmail.subject}`}
                        className="w-full border-0 rounded-lg bg-white"
                        style={{ minHeight: '500px' }}
                        sandbox="allow-same-origin"
                      />
                    ) : (
                      <pre className="text-sm text-gray-200 whitespace-pre-wrap p-4">{previewEmail.body}</pre>
                    )}
                  </div>
                </div>
              ) : (
                <p className="text-gray-400">Select a draft to preview.</p>
              )}
            </div>
          </div>
        )
      )}

      {tab === 'inbox' && <GmailInbox />}
      {tab === 'compose' && <ComposeEmail />}
    </div>
  );
}
