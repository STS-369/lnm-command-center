'use client';

import { useState, useEffect } from 'react';

interface Lead {
  id: string;
  name: string;
  company: string;
  email: string;
  phone: string;
  city: string;
  state: string;
  industry: string;
  source: string;
  status: string;
  score: number;
  created_at: string;
  updated_at: string;
}

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

export default function PipelinePage() {
  const [leads, setLeads] = useState<Lead[]>([]);
  const [filter, setFilter] = useState('all');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchLeads();
  }, []);

  const fetchLeads = async () => {
    try {
      const res = await fetch('/api/leads');
      const data = await res.json();
      setLeads(data);
    } catch (error) {
      console.error('Failed to fetch leads:', error);
    } finally {
      setLoading(false);
    }
  };

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
        <button className="btn btn-primary">
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M8 3v10M3 8h10" strokeLinecap="round" />
          </svg>
          Add Lead
        </button>
      </div>

      {/* Filters */}
      <div className="flex items-center gap-2 overflow-x-auto pb-2">
        {statusFilters.map((f) => (
          <button
            key={f.key}
            onClick={() => setFilter(f.key)}
            className={`filter-tab ${filter === f.key ? 'active' : ''}`}
          >
            {f.label}
            {f.key !== 'all' && (
              <span className="ml-1 text-text-muted">
                ({leads.filter(l => f.key === 'all' || l.status === f.key).length})
              </span>
            )}
          </button>
        ))}
      </div>

      {/* Lead Table */}
      {loading ? (
        <div className="card text-center py-12">
          <div className="text-text-muted">Loading pipeline...</div>
        </div>
      ) : filteredLeads.length === 0 ? (
        <div className="card text-center py-12">
          <div className="text-4xl mb-4">🎯</div>
          <p className="text-text-secondary">No leads found for this filter.</p>
        </div>
      ) : (
        <div className="table-container">
          <table>
            <thead>
              <tr>
                <th>Name</th>
                <th>Company</th>
                <th>Industry</th>
                <th>Status</th>
                <th>Score</th>
                <th>Source</th>
                <th>Location</th>
              </tr>
            </thead>
            <tbody>
              {filteredLeads.map((lead) => (
                <tr key={lead.id} className="cursor-pointer">
                  <td>
                    <div className="font-medium text-text-primary">{lead.name}</div>
                    <div className="text-xs text-text-muted">{lead.email}</div>
                  </td>
                  <td>
                    <div className="text-text-secondary">{lead.company}</div>
                  </td>
                  <td>
                    <span className="text-xs text-text-muted">{lead.industry || '—'}</span>
                  </td>
                  <td>
                    <span className={`badge badge-${lead.status}`}>
                      {statusLabels[lead.status] || lead.status}
                    </span>
                  </td>
                  <td>
                    <span className={`font-mono text-sm font-bold ${getScoreColor(lead.score)}`}>
                      {lead.score}
                    </span>
                  </td>
                  <td>
                    <span className="text-xs text-text-muted capitalize">{lead.source}</span>
                  </td>
                  <td>
                    <span className="text-xs text-text-muted">
                      {lead.city && lead.state ? `${lead.city}, ${lead.state}` : '—'}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
