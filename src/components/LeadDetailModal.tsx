'use client';

import { useState, useEffect } from 'react';
import { getDossier, saveDossier } from '@/lib/client-db';
import type { Lead, Dossier } from '@/lib/client-db';

interface LeadDetailModalProps {
  lead: Lead;
  onClose: () => void;
  onDossierSaved?: (dossier: Dossier) => void;
}

const defaultDossier = (lead: Lead): Omit<Dossier, 'id' | 'created_at' | 'updated_at'> => ({
  lead_id: lead.id,
  business_name: lead.name || '',
  industry: lead.industry || lead.category || '',
  location: lead.city || '',
  website: lead.website || '',
  phone: lead.phone || '',
  owner_name: '',
  owner_title: '',
  contact_email: lead.email || '',
  technology_stack: [],
  pain_points: [],
  opportunities: [],
  confidence_score: 0,
  research_sources: [],
  notes: '',
});

const statusLabels: Record<string, string> = {
  new: 'New',
  researched: 'Researched',
  outreach: 'Outreach',
  proposal: 'Proposal',
  active_deal: 'Active Deal',
  closed_won: 'Won',
  closed_lost: 'Lost',
};

export default function LeadDetailModal({ lead, onClose, onDossierSaved }: LeadDetailModalProps) {
  const [dossier, setDossier] = useState<Omit<Dossier, 'id' | 'created_at' | 'updated_at'> | null>(null);
  const [existingDossier, setExistingDossier] = useState<Dossier | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [editData, setEditData] = useState<Omit<Dossier, 'id' | 'created_at' | 'updated_at'> | null>(null);
  const [techInput, setTechInput] = useState('');
  const [painInput, setPainInput] = useState('');
  const [oppInput, setOppInput] = useState('');
  const [sourceInput, setSourceInput] = useState('');
  const [sourceUrlInput, setSourceUrlInput] = useState('');

  useEffect(() => {
    async function load() {
      try {
        const existing = await getDossier(lead.id);
        setExistingDossier(existing);
        if (existing) {
          setDossier(existing);
          setEditData(existing);
        } else {
          const fresh = defaultDossier(lead);
          setDossier(fresh);
          setEditData(fresh);
        }
      } catch (err) {
        console.error('Failed to load dossier:', err);
        const fresh = defaultDossier(lead);
        setDossier(fresh);
        setEditData(fresh);
      } finally {
        setLoading(false);
      }
    }
    load();
  }, [lead.id]);

  useEffect(() => {
    function handleEsc(e: KeyboardEvent) {
      if (e.key === 'Escape') onClose();
    }
    window.addEventListener('keydown', handleEsc);
    return () => window.removeEventListener('keydown', handleEsc);
  }, [onClose]);

  const handleSave = async () => {
    if (!editData) return;
    setSaving(true);
    try {
      const saved = await saveDossier(editData);
      setExistingDossier(saved);
      setDossier(saved);
      setEditMode(false);
      onDossierSaved?.(saved);
    } catch (err) {
      console.error('Failed to save dossier:', err);
      alert('Failed to save dossier');
    } finally {
      setSaving(false);
    }
  };

  const updateEditField = <K extends keyof Omit<Dossier, 'id' | 'created_at' | 'updated_at'>>(
    key: K, value: Omit<Dossier, 'id' | 'created_at' | 'updated_at'>[K]
  ) => {
    setEditData(prev => prev ? { ...prev, [key]: value } : null);
  };

  const addListItem = (field: 'technology_stack' | 'pain_points' | 'opportunities') => {
    const input = field === 'technology_stack' ? techInput : field === 'pain_points' ? painInput : oppInput;
    if (!input.trim() || !editData) return;
    updateEditField(field, [...(editData[field] || []), input.trim()]);
    if (field === 'technology_stack') setTechInput('');
    else if (field === 'pain_points') setPainInput('');
    else setOppInput('');
  };

  const removeListItem = (field: 'technology_stack' | 'pain_points' | 'opportunities', idx: number) => {
    if (!editData) return;
    updateEditField(field, (editData[field] || []).filter((_, i) => i !== idx));
  };

  const addSource = () => {
    if (!sourceInput.trim() || !editData) return;
    updateEditField('research_sources', [
      ...(editData.research_sources || []),
      { label: sourceInput.trim(), url: sourceUrlInput.trim() || '#' },
    ]);
    setSourceInput('');
    setSourceUrlInput('');
  };

  const removeSource = (idx: number) => {
    if (!editData) return;
    updateEditField('research_sources', (editData.research_sources || []).filter((_, i) => i !== idx));
  };

  const data = editMode ? editData : dossier;

  const getScoreColor = (score: number) => {
    if (score >= 80) return 'text-neon-green';
    if (score >= 60) return 'text-neon-amber';
    if (score >= 40) return 'text-text-secondary';
    return 'text-neon-red';
  };

  const getScoreBg = (score: number) => {
    if (score >= 80) return 'bg-neon-green/10 border-neon-green/30';
    if (score >= 60) return 'bg-neon-amber/10 border-neon-amber/30';
    if (score >= 40) return 'bg-bg-hover border-border';
    return 'bg-neon-red/10 border-neon-red/30';
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4" onClick={onClose}>
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black/70 backdrop-blur-sm" />

      {/* Modal */}
      <div
        className="relative w-full max-w-3xl max-h-[90vh] bg-bg-primary border border-border rounded-xl shadow-2xl overflow-hidden flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-border bg-bg-secondary/50">
          <div className="flex items-center gap-3 min-w-0">
            <span className="text-xl">📋</span>
            <div className="min-w-0">
              <h2 className="text-lg font-bold text-text-primary truncate">
                {data?.business_name || lead.name}
              </h2>
              <p className="text-xs text-text-muted mt-0.5">
                {lead.category || 'Uncategorized'} · {lead.city}
              </p>
            </div>
          </div>
          <div className="flex items-center gap-2 shrink-0">
            {!editMode ? (
              <button
                onClick={() => setEditMode(true)}
                className="px-3 py-1.5 rounded-lg text-xs font-medium bg-purple/20 text-purple border border-purple/30 hover:bg-purple/30 transition-colors"
              >
                ✏️ Edit
              </button>
            ) : (
              <>
                <button
                  onClick={() => {
                    setEditData(dossier);
                    setEditMode(false);
                  }}
                  className="px-3 py-1.5 rounded-lg text-xs font-medium bg-bg-card text-text-secondary border border-border hover:border-border-light transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={handleSave}
                  disabled={saving}
                  className="px-3 py-1.5 rounded-lg text-xs font-medium bg-cyan/20 text-cyan border border-cyan/30 hover:bg-cyan/30 transition-colors disabled:opacity-50"
                >
                  {saving ? 'Saving...' : '💾 Save'}
                </button>
              </>
            )}
            <button
              onClick={onClose}
              className="p-1.5 rounded-lg text-text-muted hover:text-text-primary hover:bg-bg-hover transition-colors"
              title="Close"
            >
              ✕
            </button>
          </div>
        </div>

        {/* Content */}
        {loading ? (
          <div className="flex items-center justify-center py-20">
            <span className="animate-spin text-2xl">⏳</span>
            <span className="ml-3 text-sm text-text-muted">Loading dossier...</span>
          </div>
        ) : (
          <div className="overflow-y-auto flex-1 p-6 space-y-6">
            {/* Score Banner */}
            <div className={`flex items-center justify-between p-4 rounded-lg border ${getScoreBg(data?.confidence_score || 0)}`}>
              <div>
                <p className="text-xs text-text-muted uppercase tracking-wider">Confidence Score</p>
                <p className={`text-3xl font-bold ${getScoreColor(data?.confidence_score || 0)}`}>
                  {data?.confidence_score || 0}%
                </p>
              </div>
              <div className="text-right">
                <p className="text-xs text-text-muted">Status</p>
                <span className={`px-2 py-1 rounded-full text-xs font-medium badge-${lead.status}`}>
                  {statusLabels[lead.status] || lead.status}
                </span>
              </div>
            </div>

            {/* Business Info */}
            <Section title="🏢 Business Info" editMode={editMode}>
              <InfoGrid>
                <InfoField
                  label="Business Name"
                  value={data?.business_name || '—'}
                  editMode={editMode}
                  onChange={(v) => updateEditField('business_name', v)}
                />
                <InfoField
                  label="Industry"
                  value={data?.industry || '—'}
                  editMode={editMode}
                  onChange={(v) => updateEditField('industry', v)}
                />
                <InfoField
                  label="Location"
                  value={data?.location || '—'}
                  editMode={editMode}
                  onChange={(v) => updateEditField('location', v)}
                />
                <InfoField
                  label="Phone"
                  value={data?.phone || lead.phone || '—'}
                  editMode={editMode}
                  onChange={(v) => updateEditField('phone', v)}
                />
                <InfoField
                  label="Website"
                  value={data?.website || '—'}
                  editMode={editMode}
                  onChange={(v) => updateEditField('website', v)}
                  isUrl={!!(data?.website || lead.website)}
                  urlValue={data?.website || lead.website}
                />
                <InfoField
                  label="Rating"
                  value={lead.rating ? `${lead.rating}★ (${lead.user_ratings_total || 0} reviews)` : '—'}
                />
              </InfoGrid>
            </Section>

            {/* Contacts */}
            <Section title="👤 Contacts" editMode={editMode}>
              <InfoGrid>
                <InfoField
                  label="Owner / Founder"
                  value={data?.owner_name || '—'}
                  editMode={editMode}
                  onChange={(v) => updateEditField('owner_name', v)}
                />
                <InfoField
                  label="Title"
                  value={data?.owner_title || '—'}
                  editMode={editMode}
                  onChange={(v) => updateEditField('owner_title', v)}
                />
                <InfoField
                  label="Contact Email"
                  value={data?.contact_email || lead.email || '—'}
                  editMode={editMode}
                  onChange={(v) => updateEditField('contact_email', v)}
                  isEmail={!!(data?.contact_email || lead.email)}
                  emailValue={data?.contact_email || lead.email}
                />
              </InfoGrid>
            </Section>

            {/* Technology Stack */}
            <Section title="🔧 Technology Stack" editMode={editMode}>
              <TagList tags={data?.technology_stack || []} editMode={editMode} color="cyan"
                onRemove={(i) => removeListItem('technology_stack', i)} />
              {editMode && (
                <TagInput value={techInput} onChange={setTechInput}
                  onAdd={() => addListItem('technology_stack')}
                  placeholder="Add technology (e.g. WordPress, Shopify)..." />
              )}
            </Section>

            {/* Pain Points */}
            <Section title="🎯 Pain Points" editMode={editMode}>
              <TagList tags={data?.pain_points || []} editMode={editMode} color="neon-red"
                onRemove={(i) => removeListItem('pain_points', i)} />
              {editMode && (
                <TagInput value={painInput} onChange={setPainInput}
                  onAdd={() => addListItem('pain_points')}
                  placeholder="Add pain point..." />
              )}
            </Section>

            {/* Opportunities */}
            <Section title="💡 Opportunities" editMode={editMode}>
              <TagList tags={data?.opportunities || []} editMode={editMode} color="neon-green"
                onRemove={(i) => removeListItem('opportunities', i)} />
              {editMode && (
                <TagInput value={oppInput} onChange={setOppInput}
                  onAdd={() => addListItem('opportunities')}
                  placeholder="Add opportunity..." />
              )}
            </Section>

            {/* Research Sources */}
            <Section title="📚 Research Sources" editMode={editMode}>
              {(data?.research_sources || []).length > 0 ? (
                <div className="space-y-1.5">
                  {data!.research_sources.map((src, i) => (
                    <div key={i} className="flex items-center gap-2 text-sm">
                      {src.url && src.url !== '#' ? (
                        <a href={src.url} target="_blank" rel="noopener noreferrer"
                          className="text-cyan hover:underline">{src.label}</a>
                      ) : (
                        <span className="text-text-secondary">{src.label}</span>
                      )}
                      {editMode && (
                        <button onClick={() => removeSource(i)}
                          className="text-text-muted hover:text-neon-red text-xs">✕</button>
                      )}
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-sm text-text-muted italic">No sources added yet</p>
              )}
              {editMode && (
                <div className="flex gap-2 mt-2">
                  <input type="text" value={sourceInput} onChange={(e) => setSourceInput(e.target.value)}
                    placeholder="Source name..." className="input flex-1 text-sm"
                    onKeyDown={(e) => e.key === 'Enter' && addSource()} />
                  <input type="text" value={sourceUrlInput} onChange={(e) => setSourceUrlInput(e.target.value)}
                    placeholder="URL (optional)..." className="input flex-1 text-sm"
                    onKeyDown={(e) => e.key === 'Enter' && addSource()} />
                  <button onClick={addSource}
                    className="px-3 py-1 rounded bg-cyan/20 text-cyan border border-cyan/30 text-xs hover:bg-cyan/30 transition-colors">
                    + Add
                  </button>
                </div>
              )}
            </Section>

            {/* Notes */}
            <Section title="📝 Notes" editMode={editMode}>
              {editMode ? (
                <textarea
                  value={data?.notes || ''}
                  onChange={(e) => updateEditField('notes', e.target.value)}
                  className="input w-full min-h-[100px] text-sm"
                  placeholder="Add notes about this lead..."
                />
              ) : (
                <p className="text-sm text-text-secondary whitespace-pre-wrap">
                  {data?.notes || <span className="text-text-muted italic">No notes</span>}
                </p>
              )}
            </Section>
          </div>
        )}
      </div>
    </div>
  );
}

// === Sub-components ===

function Section({ title, editMode, children }: { title: string; editMode?: boolean; children: React.ReactNode }) {
  return (
    <div className="space-y-3">
      <h3 className="text-sm font-semibold text-text-primary flex items-center gap-2">
        {title}
      </h3>
      {children}
    </div>
  );
}

function InfoGrid({ children }: { children: React.ReactNode }) {
  return <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">{children}</div>;
}

interface InfoFieldProps {
  label: string;
  value: string;
  editMode?: boolean;
  onChange?: (value: string) => void;
  isUrl?: boolean;
  urlValue?: string;
  isEmail?: boolean;
  emailValue?: string;
}

function InfoField({ label, value, editMode, onChange, isUrl, urlValue, isEmail, emailValue }: InfoFieldProps) {
  if (editMode && onChange) {
    return (
      <div>
        <label className="text-xs text-text-muted block mb-1">{label}</label>
        <input
          type="text"
          value={value === '—' ? '' : value}
          onChange={(e) => onChange(e.target.value)}
          className="input w-full text-sm"
          placeholder={label}
        />
      </div>
    );
  }

  return (
    <div>
      <p className="text-xs text-text-muted mb-1">{label}</p>
      {isUrl && urlValue ? (
        <a href={urlValue} target="_blank" rel="noopener noreferrer"
          className="text-sm text-cyan hover:underline break-all">{value}</a>
      ) : isEmail && emailValue ? (
        <a href={`mailto:${emailValue}`} className="text-sm text-cyan hover:underline">{value}</a>
      ) : (
        <p className="text-sm text-text-primary">{value}</p>
      )}
    </div>
  );
}

function TagList({ tags, editMode, color, onRemove }: { tags: string[]; editMode?: boolean; color: string; onRemove: (i: number) => void }) {
  if (tags.length === 0) return <p className="text-sm text-text-muted italic">None added</p>;

  return (
    <div className="flex flex-wrap gap-1.5">
      {tags.map((tag, i) => (
        <span key={i} className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-medium border bg-${color}/10 text-${color} border-${color}/20`}>
          {tag}
          {editMode && (
            <button onClick={() => onRemove(i)} className="hover:opacity-70 text-[10px]">✕</button>
          )}
        </span>
      ))}
    </div>
  );
}

function TagInput({ value, onChange, onAdd, placeholder }: { value: string; onChange: (v: string) => void; onAdd: () => void; placeholder: string }) {
  return (
    <div className="flex gap-2">
      <input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        onKeyDown={(e) => e.key === 'Enter' && onAdd()}
        placeholder={placeholder}
        className="input flex-1 text-sm"
      />
      <button onClick={onAdd}
        className="px-3 py-1 rounded bg-cyan/20 text-cyan border border-cyan/30 text-xs hover:bg-cyan/30 transition-colors">
        + Add
      </button>
    </div>
  );
}
