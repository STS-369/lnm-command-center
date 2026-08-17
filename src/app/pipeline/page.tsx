'use client';

import { useState, useCallback } from 'react';
import {
  seedDemoData,
  getLeads,
  getLeadsWithStats,
  importRealData,
  isDataImported,
  getImportStats,
} from '@/lib/client-db';
import type { LeadWithStats } from '@/lib/client-db';

const statusFilters = [
  { key: 'all', label: 'All', color: 'text-text-primary' },
  { key: 'new', label: 'New', color: 'text-cyan' },
  { key: 'researched', label: 'Researched', color: 'text-purple' },
  { key: 'outreach', label: 'Outreach', color: 'text-neon-amber' },
  { key: 'proposal', label: 'Proposal', color: 'text-orange-400' },
  { key: 'active_deal', label: 'Deal', color: 'text-neon-green' },
  { key: 'closed_won', label: 'Won', color: 'text-green-400' },
  { key: 'closed_lost', label: 'Lost', color: 'text-neon-red' },
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

function initializeData() {
  seedDemoData();
  return {
    leads: getLeadsWithStats(),
    imported: isDataImported(),
  };
}

export default function PipelinePage() {
  const [data, setData] = useState(initializeData);
  const [filter, setFilter] = useState('all');
  const [search, setSearch] = useState('');
  const [pageSize, setPageSize] = useState(50);
  const [currentPage, setCurrentPage] = useState(1);
  const [importing, setImporting] = useState(false);
  const [importResult, setImportResult] = useState<{
    leadsImported: number;
    emailsImported: number;
    totalLeads: number;
    totalEmails: number;
  } | null>(null);

  const handleImport = useCallback(() => {
    setImporting(true);
    // Small delay to show loading state
    setTimeout(() => {
      const result = importRealData();
      const updatedLeads = getLeadsWithStats();
      setData({ leads: updatedLeads, imported: true });
      setImportResult(result);
      setImporting(false);
    }, 100);
  }, []);

  const leads = data.leads;

  const filteredLeads = leads.filter(l => {
    const matchesFilter = filter === 'all' || l.status === filter;
    const matchesSearch = !search ||
      l.name.toLowerCase().includes(search.toLowerCase()) ||
      l.company.toLowerCase().includes(search.toLowerCase()) ||
      l.city.toLowerCase().includes(search.toLowerCase()) ||
      l.category?.toLowerCase().includes(search.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  // Pagination calculations
  const totalPages = Math.max(1, Math.ceil(filteredLeads.length / pageSize));
  const safeCurrentPage = Math.min(currentPage, totalPages);
  const startIdx = (safeCurrentPage - 1) * pageSize;
  const endIdx = Math.min(startIdx + pageSize, filteredLeads.length);
  const paginatedLeads = filteredLeads.slice(startIdx, endIdx);

  // Reset to page 1 when filter or search changes
  const handleFilterChange = (key: string) => {
    setFilter(key);
    setCurrentPage(1);
  };

  const handleSearchChange = (value: string) => {
    setSearch(value);
    setCurrentPage(1);
  };

  const handlePageSizeChange = (newSize: number) => {
    setPageSize(newSize);
    setCurrentPage(1);
  };

  // Status counts for filter badges
  const statusCounts: Record<string, number> = {};
  for (const lead of leads) {
    statusCounts[lead.status] = (statusCounts[lead.status] || 0) + 1;
  }

  const getScoreColor = (score: number) => {
    if (score >= 80) return 'text-neon-green';
    if (score >= 60) return 'text-neon-amber';
    if (score >= 40) return 'text-text-secondary';
    return 'text-neon-red';
  };

  const getScoreBg = (score: number) => {
    if (score >= 80) return 'bg-neon-green/10 border-neon-green/20';
    if (score >= 60) return 'bg-neon-amber/10 border-neon-amber/20';
    if (score >= 40) return 'bg-bg-hover border-border';
    return 'bg-neon-red/10 border-neon-red/20';
  };

  const getCategoryBadge = (category: string) => {
    const colors: Record<string, string> = {
      'funeral homes': 'bg-purple/10 text-purple border-purple/20',
      'dental practices': 'bg-cyan/10 text-cyan border-cyan/20',
      'auto repair': 'bg-neon-amber/10 text-neon-amber border-neon-amber/20',
      'coffee shops': 'bg-amber-600/10 text-amber-400 border-amber-600/20',
      'florists': 'bg-pink-500/10 text-pink-400 border-pink-500/20',
      'senior care facilities': 'bg-blue-500/10 text-blue-400 border-blue-500/20',
      'accounting firms': 'bg-green-600/10 text-green-400 border-green-600/20',
      'law offices': 'bg-slate-500/10 text-slate-300 border-slate-500/20',
      'marketing agencies': 'bg-orange-500/10 text-orange-400 border-orange-500/20',
      'home services': 'bg-teal-500/10 text-teal-400 border-teal-500/20',
    };
    return colors[category?.toLowerCase()] || 'bg-bg-hover text-text-secondary border-border';
  };

  const importStats = getImportStats();

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-text-primary glow-text-cyan">Pipeline</h1>
          <p className="text-sm text-text-secondary mt-1">
            {filteredLeads.length} of {leads.length} leads
            {data.imported && (
              <span className="ml-2 text-neon-green text-xs">● Live Data</span>
            )}
          </p>
        </div>
        <div className="flex items-center gap-3">
          {!data.imported ? (
            <button
              onClick={handleImport}
              disabled={importing}
              className="btn btn-primary text-sm"
            >
              {importing ? (
                <>
                  <span className="animate-spin">⏳</span> Importing...
                </>
              ) : (
                <>
                  📥 Import Data ({importStats.totalLeads} leads, {importStats.totalEmails} emails)
                </>
              )}
            </button>
          ) : (
            <span className="text-xs text-text-muted">
              ✅ {leads.length} leads loaded
            </span>
          )}
        </div>
      </div>

      {/* Import Result Banner */}
      {importResult && (
        <div className="card border-neon-green/30 bg-neon-green/5">
          <div className="flex items-center gap-3">
            <span className="text-xl">✅</span>
            <div>
              <p className="text-sm font-medium text-neon-green">
                Import Complete
              </p>
              <p className="text-xs text-text-secondary">
                {importResult.leadsImported} leads imported • {importResult.emailsImported} emails imported •
                Total: {importResult.totalLeads} leads, {importResult.totalEmails} emails
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Search */}
      <div className="relative">
        <input
          type="text"
          placeholder="Search leads by name, company, city, or category..."
          value={search}
          onChange={(e) => handleSearchChange(e.target.value)}
          className="input pl-10"
        />
        <span className="absolute left-3 top-1/2 -translate-y-1/2 text-text-muted">🔍</span>
      </div>

      {/* Filters */}
      <div className="flex flex-wrap gap-2">
        {statusFilters.map((f) => {
          const count = f.key === 'all' ? leads.length : (statusCounts[f.key] || 0);
          return (
            <button
              key={f.key}
              onClick={() => handleFilterChange(f.key)}
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

      {/* Leads Table */}
      <div className="card overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-border">
                <th className="text-left text-xs text-text-muted uppercase tracking-wider px-4 py-3">Lead</th>
                <th className="text-left text-xs text-text-muted uppercase tracking-wider px-4 py-3">Category</th>
                <th className="text-left text-xs text-text-muted uppercase tracking-wider px-4 py-3">City</th>
                <th className="text-left text-xs text-text-muted uppercase tracking-wider px-4 py-3">Status</th>
                <th className="text-left text-xs text-text-muted uppercase tracking-wider px-4 py-3">Score</th>
                <th className="text-left text-xs text-text-muted uppercase tracking-wider px-4 py-3">Rating</th>
                <th className="text-left text-xs text-text-muted uppercase tracking-wider px-4 py-3">Website</th>
                <th className="text-left text-xs text-text-muted uppercase tracking-wider px-4 py-3">Emails</th>
              </tr>
            </thead>
            <tbody>
              {paginatedLeads.map((lead) => (
                <tr key={lead.id} className="border-b border-border/50 hover:bg-bg-hover transition-colors">
                  <td className="px-4 py-3">
                    <div>
                      <p className="text-sm font-medium text-text-primary">{lead.name}</p>
                      <p className="text-xs text-text-muted">{lead.phone}</p>
                    </div>
                  </td>
                  <td className="px-4 py-3">
                    <span className={`px-2 py-0.5 rounded-full text-[10px] font-medium border ${getCategoryBadge(lead.category || '')}`}>
                      {lead.category || '—'}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-sm text-text-secondary">{lead.city}</td>
                  <td className="px-4 py-3">
                    <span className={`px-2 py-1 rounded-full text-xs font-medium badge-${lead.status}`}>
                      {statusLabels[lead.status] || lead.status}
                    </span>
                  </td>
                  <td className="px-4 py-3">
                    <span className={`inline-flex items-center justify-center min-w-[2rem] px-2 py-0.5 rounded text-sm font-bold border ${getScoreBg(lead.score)} ${getScoreColor(lead.score)}`}>
                      {lead.score}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-sm text-text-secondary">
                    {lead.rating ? (
                      <span className="text-neon-amber">{lead.rating}★</span>
                    ) : '—'}
                  </td>
                  <td className="px-4 py-3">
                    {lead.website ? (
                      <span className={`text-xs ${lead.website_status === 'REACHABLE' ? 'text-neon-green' : 'text-neon-red'}`}>
                        {lead.website_status === 'REACHABLE' ? '● Online' : '● Offline'}
                      </span>
                    ) : (
                      <span className="text-xs text-text-muted">—</span>
                    )}
                  </td>
                  <td className="px-4 py-3 text-sm text-text-secondary">
                    {lead.email_count > 0 ? (
                      <span className="text-cyan">{lead.email_count}</span>
                    ) : (
                      <span className="text-text-muted">0</span>
                    )}
                  </td>
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
        {filteredLeads.length > 0 && (
          <div className="px-4 py-3 border-t border-border flex flex-col sm:flex-row items-center justify-between gap-3">
            {/* Showing X-Y of Z */}
            <p className="text-xs text-text-muted">
              Showing {startIdx + 1}–{endIdx} of {filteredLeads.length} leads
            </p>

            <div className="flex items-center gap-4">
              {/* Page size selector */}
              <div className="flex items-center gap-2">
                <label htmlFor="page-size" className="text-xs text-text-muted">Per page:</label>
                <select
                  id="page-size"
                  value={pageSize}
                  onChange={(e) => handlePageSizeChange(Number(e.target.value))}
                  className="text-xs bg-bg-secondary border border-border rounded px-2 py-1 text-text-primary"
                >
                  <option value={20}>20</option>
                  <option value={50}>50</option>
                  <option value={100}>100</option>
                </select>
              </div>

              {/* Page navigation */}
              <div className="flex items-center gap-2">
                <button
                  onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
                  disabled={safeCurrentPage <= 1}
                  className="px-3 py-1 rounded text-xs font-medium bg-bg-secondary border border-border text-text-secondary hover:text-text-primary hover:border-border-light disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
                >
                  ← Prev
                </button>
                <span className="text-xs text-text-muted font-mono">
                  Page {safeCurrentPage} of {totalPages}
                </span>
                <button
                  onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
                  disabled={safeCurrentPage >= totalPages}
                  className="px-3 py-1 rounded text-xs font-medium bg-bg-secondary border border-border text-text-secondary hover:text-text-primary hover:border-border-light disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
                >
                  Next →
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
