'use client';

import { useState } from 'react';

interface ComposeEmailProps {
  defaultTo?: string;
  defaultSubject?: string;
  defaultBody?: string;
  onSent?: () => void;
  onCancel?: () => void;
}

export default function ComposeEmail({
  defaultTo = '',
  defaultSubject = '',
  defaultBody = '',
  onSent,
  onCancel,
}: ComposeEmailProps) {
  const [to, setTo] = useState(defaultTo);
  const [cc, setCc] = useState('');
  const [subject, setSubject] = useState(defaultSubject);
  const [body, setBody] = useState(defaultBody);
  const [sending, setSending] = useState(false);
  const [result, setResult] = useState<{ success: boolean; message: string } | null>(null);
  const [showCc, setShowCc] = useState(false);

  const handleSend = async () => {
    if (!to.trim() || !subject.trim() || !body.trim()) return;

    setSending(true);
    setResult(null);

    try {
      const payload: Record<string, unknown> = {
        to: to.split(',').map((s) => s.trim()).filter(Boolean),
        subject,
        body,
      };

      if (cc.trim()) {
        payload.cc = cc.split(',').map((s) => s.trim()).filter(Boolean);
      }

      const res = await fetch('/api/gmail/send', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      const data = await res.json();

      if (res.ok && data.success) {
        setResult({ success: true, message: 'Email sent successfully!' });
        setTimeout(() => {
          onSent?.();
        }, 1500);
      } else {
        setResult({ success: false, message: data.error || 'Failed to send' });
      }
    } catch {
      setResult({ success: false, message: 'Network error — check connection' });
    } finally {
      setSending(false);
    }
  };

  return (
    <div className="card animate-fade-in">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-sm font-bold text-text-primary font-mono uppercase tracking-wider">
          ✉️ Compose Email
        </h3>
        {onCancel && (
          <button onClick={onCancel} className="btn btn-ghost text-xs">
            ✕ Close
          </button>
        )}
      </div>

      {/* Result banner */}
      {result && (
        <div
          className={`mb-4 p-3 rounded-lg text-sm ${
            result.success
              ? 'bg-neon-green/10 text-neon-green border border-neon-green/20'
              : 'bg-neon-red/10 text-neon-red border border-neon-red/20'
          }`}
        >
          {result.success ? '✓' : '⚠'} {result.message}
        </div>
      )}

      <div className="space-y-3">
        {/* To */}
        <div>
          <label className="block text-xs text-text-muted mb-1 font-mono">TO</label>
          <input
            type="email"
            value={to}
            onChange={(e) => setTo(e.target.value)}
            placeholder="recipient@example.com"
            className="input text-sm"
          />
        </div>

        {/* CC toggle */}
        {!showCc && (
          <button
            onClick={() => setShowCc(true)}
            className="text-xs text-cyan hover:text-cyan/80 transition-colors"
          >
            + Add CC
          </button>
        )}

        {showCc && (
          <div>
            <label className="block text-xs text-text-muted mb-1 font-mono">CC</label>
            <input
              type="email"
              value={cc}
              onChange={(e) => setCc(e.target.value)}
              placeholder="cc@example.com"
              className="input text-sm"
            />
          </div>
        )}

        {/* Subject */}
        <div>
          <label className="block text-xs text-text-muted mb-1 font-mono">SUBJECT</label>
          <input
            type="text"
            value={subject}
            onChange={(e) => setSubject(e.target.value)}
            placeholder="Email subject"
            className="input text-sm"
          />
        </div>

        {/* Body */}
        <div>
          <label className="block text-xs text-text-muted mb-1 font-mono">BODY</label>
          <textarea
            value={body}
            onChange={(e) => setBody(e.target.value)}
            placeholder="Write your email..."
            rows={8}
            className="input text-sm resize-y min-h-[160px]"
          />
        </div>

        {/* Actions */}
        <div className="flex items-center justify-between pt-2">
          <p className="text-xs text-text-muted">
            From: soetechllc@gmail.com
          </p>
          <div className="flex items-center gap-2">
            {onCancel && (
              <button onClick={onCancel} className="btn btn-ghost text-xs">
                Cancel
              </button>
            )}
            <button
              onClick={handleSend}
              disabled={sending || !to.trim() || !subject.trim() || !body.trim()}
              className="btn btn-primary text-xs disabled:opacity-50"
            >
              {sending ? (
                <span className="flex items-center gap-1.5">
                  <span className="animate-spin">⏳</span> Sending...
                </span>
              ) : (
                '📤 Send'
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
