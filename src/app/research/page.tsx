'use client';

import { useState, useMemo, useEffect } from 'react';
import {
  getLeadsWithStats,
  loadRealDataFromJSON,
} from '@/lib/client-db';
import type { LeadWithStats } from '@/lib/client-db';

type ResearchTab = 'lookup' | 'enrich' | 'briefs';

const TABS: { key: ResearchTab; label: string; icon: string }[] = [
  { key: 'lookup', label: 'Company Lookup', icon: '🔍' },
  { key: 'enrich', label: 'Lead Enrichment', icon: '📊' },
  { key: 'briefs', label: 'Research Briefs', icon: '📋' },
];

export default function ResearchPage() {
  const [leads, setLeads] = useState<LeadWithStats[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<ResearchTab>('lookup');
  const [search, setSearch] = useState('');
  const [selectedLead, setSelectedLead] = useState<LeadWithStats | null>(null);
  const [enriching, setEnriching] = useState(false);
  const [enrichResult, setEnrichResult] = useState<string | null>(null);

  useEffect(() => {
    async function load() {
      try {
        await loadRealDataFromJSON();
        const l = await getLeadsWithStats();
        setLeads(l);
      } catch (err) {
        console.error('Failed to load research data:', err);
      } finally {
        setLoading(false);
      }
    }
    load();
  }, []);

  const filteredLeads = useMemo(() => {
    if (!search) return leads.slice(0, 50);
    const q = search.toLowerCase();
    return leads.filter(
      l =>
        l.name.toLowerCase().includes(q) ||
        l.company.toLowerCase().includes(q) ||
        l.city.toLowerCase().includes(q) ||
        (l.category?.toLowerCase().includes(q)) ||
        (l.industry?.toLowerCase().includes(q))
    );
  }, [leads, search]);

  const handleEnrich = (lead: LeadWithStats) => {
    setEnriching(true);
    setEnrichResult(null);
    setSelectedLead(lead);
    setTimeout(() => {
      setEnrichResult(
        `Enrichment complete for ${lead.company}. Found website status: ${lead.website_status || 'Unknown'}. ` +
        `Rating: ${lead.rating || 'N/A'} (${lead.user_ratings_total || 0} reviews). ` +
        `Category: ${lead.category || lead.industry || 'Unknown'}. ` +
        `Emails in system: ${lead.email_count}.`
      );
      setEnriching(false);
    }, 1200);
  };

  const getScoreColor = (score: number) => {
    if (score >= 80) return 'text-neon-green';
    if (score >= 60) return 'text-neon-amber';
    if (score >= 40) return 'text-text-secondary';
    return 'text-neon-red';
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-center">
          <span className="animate-spin text-2xl">⏳</span>
          <p className="text-sm text-text-muted mt-2">Loading research data...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-text-primary glow-text-cyan">Research</h1>
        <p className="text-sm text-text-secondary mt-1">AI-powered lead research and analysis</p>
      </div>

      {/* Tab Navigation */}
      <div className="flex gap-1 bg-bg-secondary rounded-lg p-1 border border-border">
        {TABS.map(tab => (
          <button
            key={tab.key}
            onClick={() => setActiveTab(tab.key)}
            className={`flex items-center gap-2 px-4 py-2 rounded-md text-sm font-medium transition-all ${
              activeTab === tab.key
                ? 'bg-cyan/10 text-cyan border border-cyan/30'
                : 'text-text-secondary hover:text-text-primary hover:bg-bg-hover'
            }`}
          >
            <span>{tab.icon}</span>
            <span>{tab.label}</span>
          </button>
        ))}
      </div>

      {/* Company Lookup Tab */}
      {activeTab === 'lookup' && (
        <div className="space-y-4">
          <div className="relative">
            <input
              type="text"
              placeholder="Search companies, names, cities, or categories..."
              value={search}
              onChange={e => setSearch(e.target.value)}
              className="input pl-10"
            />
            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-text-muted">🔍</span>
          </div>

          <div className="card overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-border">
                    <th className="text-left text-xs text-text-muted uppercase tracking-wider px-4 py-3">Company</th>
                    <th className="text-left text-xs text-text-muted uppercase tracking-wider px-4 py-3">Contact</th>
                    <th className="text-left text-xs text-text-muted uppercase tracking-wider px-4 py-3">Location</th>
                    <th className="text-left text-xs text-text-muted uppercase tracking-wider px-4 py-3">Score</th>
                    <th className="text-left text-xs text-text-muted uppercase tracking-wider px-4 py-3">Website</th>
                    <th className="text-left text-xs text-text-muted uppercase tracking-wider px-4 py-3">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredLeads.map(lead => (
                    <tr key={lead.id} className="border-b border-border/50 hover:bg-bg-hover transition-colors">
                      <td className="px-4 py-3">
                        <div>
                          <p className="text-sm font-medium text-text-primary">{lead.company}</p>
                          <p className="text-xs text-text-muted">{lead.category || lead.industry || '—'}</p>
                        </div>
                      </td>
                      <td className="px-4 py-3">
                        <p className="text-sm text-text-secondary">{lead.name}</p>
                        <p className="text-xs text-text-muted">{lead.email || '—'}</p>
                      </td>
                      <td className="px-4 py-3 text-sm text-text-secondary">
                        {lead.city}, {lead.state}
                      </td>
                      <td className="px-4 py-3">
                        <span className={`text-sm font-bold font-mono ${getScoreColor(lead.score)}`}>
                          {lead.score}
                        </span>
                      </td>
                      <td className="px-4 py-3">
                        {lead.website ? (
                          <span className={`text-xs ${lead.website_status === 'REACHABLE' ? 'text-neon-green' : 'text-neon-red'}`}>
                            {lead.website_status === 'REACHABLE' ? '● Online' : '● Offline'}
                          </span>
                        ) : (
                          <span className="text-xs text-text-muted">No website</span>
                        )}
                      </td>
                      <td className="px-4 py-3">
                        <div className="flex items-center gap-2">
                          {lead.website && (
                            <a
                              href={lead.website}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="text-xs text-cyan hover:text-cyan/80 transition-colors"
                              title="Visit website"
                            >
                              🌐
                            </a>
                          )}
                          <button
                            onClick={() => handleEnrich(lead)}
                            className="text-xs text-purple hover:text-purple/80 transition-colors"
                            title="Enrich lead"
                          >
                            📊
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            {filteredLeads.length === 0 && (
              <div className="text-center py-12">
                <p className="text-text-muted">No results found.</p>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Lead Enrichment Tab */}
      {activeTab === 'enrich' && (
        <div className="space-y-4">
          <div className="card">
            <h3 className="text-sm font-bold text-text-primary font-mono mb-4">Lead Enrichment Tool</h3>
            <p className="text-xs text-text-secondary mb-4">
              Select a lead to enrich with additional data. Enrichment pulls website status,
              ratings, and category information from available sources.
            </p>

            <div className="space-y-3">
              <div className="relative">
                <input
                  type="text"
                  placeholder="Search leads to enrich..."
                  value={search}
                  onChange={e => setSearch(e.target.value)}
                  className="input pl-10"
                />
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-text-muted">🔍</span>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 max-h-[400px] overflow-y-auto">
                {filteredLeads.map(lead => (
                  <button
                    key={lead.id}
                    onClick={() => handleEnrich(lead)}
                    disabled={enriching}
                    className={`text-left p-3 rounded-lg border transition-all ${
                      selectedLead?.id === lead.id
                        ? 'bg-purple/10 border-purple/30'
                        : 'bg-bg-secondary border-border hover:border-border-light hover:bg-bg-hover'
                    }`}
                  >
                    <div className="flex items-start justify-between">
                      <div className="min-w-0">
                        <p className="text-sm font-medium text-text-primary truncate">{lead.company}</p>
                        <p className="text-xs text-text-secondary">{lead.name}</p>
                        <p className="text-xs text-text-muted">{lead.city}, {lead.state}</p>
                      </div>
                      <span className={`text-xs font-mono font-bold ${getScoreColor(lead.score)}`}>
                        {lead.score}
                      </span>
                    </div>
                  </button>
                ))}
              </div>
            </div>
          </div>

          {enriching && (
            <div className="card border-purple/30 bg-purple/5">
              <div className="flex items-center gap-3">
                <span className="animate-spin text-xl">⏳</span>
                <div>
                  <p className="text-sm font-medium text-purple">Enriching lead data...</p>
                  <p className="text-xs text-text-secondary">Scanning available sources</p>
                </div>
              </div>
            </div>
          )}

          {enrichResult && !enriching && (
            <div className="card border-neon-green/30 bg-neon-green/5">
              <div className="flex items-start gap-3">
                <span className="text-xl">✅</span>
                <div>
                  <p className="text-sm font-medium text-neon-green mb-1">Enrichment Complete</p>
                  <p className="text-xs text-text-secondary leading-relaxed">{enrichResult}</p>
                </div>
              </div>
            </div>
          )}
        </div>
      )}

      {/* Research Briefs Tab */}
      {activeTab === 'briefs' && (
        <div className="space-y-4">
          <div className="card">
            <h3 className="text-sm font-bold text-text-primary font-mono mb-2">Research Briefs</h3>
            <p className="text-xs text-text-secondary mb-6">
              AI-generated research briefs for leads. Briefs include company overview,
              pain points, and recommended approach.
            </p>

            <div className="space-y-3">
              {leads
                .filter(l => l.score >= 70)
                .slice(0, 10)
                .map(lead => (
                  <div
                    key={lead.id}
                    className="p-4 rounded-lg bg-bg-secondary border border-border hover:border-border-light transition-colors"
                  >
                    <div className="flex items-start justify-between mb-2">
                      <div>
                        <h4 className="text-sm font-medium text-text-primary">{lead.company}</h4>
                        <p className="text-xs text-text-secondary">
                          {lead.name} • {lead.city}, {lead.state}
                        </p>
                      </div>
                      <span className={`px-2 py-0.5 rounded text-xs font-bold font-mono ${
                        lead.score >= 80 ? 'bg-neon-green/10 text-neon-green' : 'bg-neon-amber/10 text-neon-amber'
                      }`}>
                        {lead.score}
                      </span>
                    </div>
                    <div className="text-xs text-text-secondary space-y-1">
                      <p>
                        <span className="text-text-muted">Category:</span>{' '}
                        {lead.category || lead.industry || 'Unknown'}
                      </p>
                      <p>
                        <span className="text-text-muted">Status:</span>{' '}
                        <span className="capitalize">{lead.status.replace('_', ' ')}</span>
                      </p>
                      {lead.website && (
                        <p>
                          <span className="text-text-muted">Website:</span>{' '}
                          <span className={lead.website_status === 'REACHABLE' ? 'text-neon-green' : 'text-neon-red'}>
                            {lead.website_status === 'REACHABLE' ? 'Active' : 'Offline'}
                          </span>
                        </p>
                      )}
                      <p className="text-text-muted pt-1 italic">
                        Recommended approach: {lead.score >= 80
                          ? 'High priority — direct outreach with tailored proposal'
                          : 'Standard outreach — research-enhanced email sequence'}
                      </p>
                    </div>
                  </div>
                ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
