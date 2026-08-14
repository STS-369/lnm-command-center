'use client';

import { useState } from 'react';
import { seedDemoData, getLeads } from '@/lib/client-db';
import type { Lead } from '@/lib/client-db';

const statusFilters = [
  { key: 'all', label: 'All' },
  { key: 'new', label: 'New' },
  { key: 'researched', label: 'Researched' },
  { key: 'outreach', label: 'Outreach' },
  { key: 'proposal', label: 'Proposal' },
  { key: 'active_deal', label: 'Deal' },
  { key: 'closed_won', label: 'Closed' },
];

const statusLabels: Record<string, string> = {
  new: 'New',
  researched: 'Researched',
  outreach: 'Outreach',
  proposal: 'Proposal',
  active_deal: 'Active Deal',
  closed_won: 'Won',
  closed_lost: 'Lost',
};

function initializeLeads() {
  seedDemoData();
  return getLeads();
}

export default function PipelinePage() {
  const [leads] = useState(initializeLeads);
  const [filter, setFilter] = useState('all');

  const filteredLeads = filter === 'all'
    ? leads
    : leads.filter(l => l.status === filter);

  const getScoreColor = (score: number) => {
    if (score >= 80) return 'text-neon-green';
    if (score >= 60) return 'text-neon-amber';
    if (score >= 40) return 'text-text-secondary';
    return 'text-neon-red';
  };

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-text-primary glow-text-cyan">Pipeline</h1>
          <p className="text-sm text-text-secondary mt-1">{filteredLeads.length} leads in pipeline</p>
        </div>
      </div>

      {/* Filters */}
      <div className="flex flex-wrap gap-2">
        {statusFilters.map((f) => (
          <button
            key={f.key}
            onClick={() => setFilter(f.key)}
            className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
              filter === f.key
                ? 'bg-cyan/20 text-cyan border border-cyan/30'
                : 'bg-bg-card text-text-secondary border border-border hover:border-border-light'
            }`}
          >
            {f.label}
          </button>
        ))}
      </div>

      {/* Leads Table */}
      <div className="card overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-border">
                <th className="text-left text-xs text-text-muted uppercase tracking-wider px-4 py-3">Lead</th>
                <th className="text-left text-xs text-text-muted uppercase tracking-wider px-4 py-3">Company</th>
                <th className="text-left text-xs text-text-muted uppercase tracking-wider px-4 py-3">Status</th>
                <th className="text-left text-xs text-text-muted uppercase tracking-wider px-4 py-3">Score</th>
                <th className="text-left text-xs text-text-muted uppercase tracking-wider px-4 py-3">Source</th>
              </tr>
            </thead>
            <tbody>
              {filteredLeads.map((lead) => (
                <tr key={lead.id} className="border-b border-border/50 hover:bg-bg-hover transition-colors">
                  <td className="px-4 py-3">
                    <div>
                      <p className="text-sm font-medium text-text-primary">{lead.name}</p>
                      <p className="text-xs text-text-muted">{lead.email}</p>
                    </div>
                  </td>
                  <td className="px-4 py-3 text-sm text-text-secondary">{lead.company}</td>
                  <td className="px-4 py-3">
                    <span className="px-2 py-1 rounded-full text-xs font-medium bg-bg-hover text-text-secondary">
                      {statusLabels[lead.status] || lead.status}
                    </span>
                  </td>
                  <td className="px-4 py-3">
                    <span className={`text-sm font-bold ${getScoreColor(lead.score)}`}>{lead.score}</span>
                  </td>
                  <td className="px-4 py-3 text-xs text-text-muted capitalize">{lead.source}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        {filteredLeads.length === 0 && (
          <div className="text-center py-12">
            <p className="text-text-muted">No leads found for this filter.</p>
          </div>
        )}
      </div>
    </div>
  );
}
