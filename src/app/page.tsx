'use client';

import { useState } from 'react';
import {
  seedDemoData,
  getLeads,
  getDeals,
  getTasks,
  getActivities,
  getEmails,
  getPipelineStats,
  getCategoryStats,
  getCityStats,
  importRealData,
  isDataImported,
} from '@/lib/client-db';
import type { Lead, Deal, Task, Activity, OutreachEmail } from '@/lib/client-db';

interface StatCardProps {
  label: string;
  value: string | number;
  change?: string;
  color: 'cyan' | 'purple' | 'green' | 'amber' | 'red';
}

function StatCard({ label, value, change, color }: StatCardProps) {
  const colorMap = {
    cyan: 'text-cyan',
    purple: 'text-purple',
    green: 'text-neon-green',
    amber: 'text-neon-amber',
    red: 'text-neon-red',
  };

  return (
    <div className="stat-card animate-fade-in">
      <p className="text-xs text-text-muted uppercase tracking-wider mb-2">{label}</p>
      <p className={`stat-value ${colorMap[color]}`}>{value}</p>
      {change && (
        <p className="text-xs text-neon-green mt-1">{change}</p>
      )}
    </div>
  );
}

function formatCurrency(value: number): string {
  if (value >= 1000) {
    return `$${(value / 1000).toFixed(1)}k`;
  }
  return `$${value}`;
}

function getRelativeTime(dateStr: string): string {
  const date = new Date(dateStr);
  const now = new Date();
  const diffMs = now.getTime() - date.getTime();
  const diffMins = Math.floor(diffMs / 60000);
  const diffHours = Math.floor(diffMs / 3600000);
  const diffDays = Math.floor(diffMs / 86400000);

  if (diffMins < 1) return 'Just now';
  if (diffMins < 60) return `${diffMins}m ago`;
  if (diffHours < 24) return `${diffHours}h ago`;
  return `${diffDays}d ago`;
}

function initializeData() {
  seedDemoData();
  return {
    leads: getLeads(),
    deals: getDeals(),
    tasks: getTasks(),
    activities: getActivities(),
    emails: getEmails(),
    imported: isDataImported(),
  };
}

export default function DashboardPage() {
  const [data] = useState(initializeData);
  const { leads, deals, tasks, activities, emails, imported } = data;

  // Compute stats from client-side data
  const totalLeads = leads.length;
  const activeDeals = deals.filter(d => d.status === 'active').length;
  const totalRevenue = deals.filter(d => d.status === 'completed').reduce((sum, d) => sum + d.value, 0);
  const pendingTasks = tasks.filter(t => t.status !== 'completed').length;
  const totalEmails = emails.length;
  const sentEmails = emails.filter(e => e.status === 'sent').length;

  // Pipeline breakdown
  const pipelineStats = getPipelineStats();
  const statusOrder = ['new', 'researched', 'outreach', 'proposal', 'active_deal', 'closed_won', 'closed_lost'];
  const pipelineStages = statusOrder
    .map(status => ({
      status,
      count: pipelineStats[status] || 0,
    }))
    .filter(s => s.count > 0);

  const statusColors: Record<string, string> = {
    new: 'bg-text-muted',
    researched: 'bg-cyan',
    outreach: 'bg-purple',
    proposal: 'bg-neon-amber',
    active_deal: 'bg-neon-green',
    closed_won: 'bg-neon-green',
    closed_lost: 'bg-neon-red',
  };

  const statusLabels: Record<string, string> = {
    new: 'New',
    researched: 'Researched',
    outreach: 'Outreach',
    proposal: 'Proposal',
    active_deal: 'Active Deal',
    closed_won: 'Won',
    closed_lost: 'Lost',
  };

  // Category breakdown (top 8)
  const categoryStats = getCategoryStats();
  const topCategories = Object.entries(categoryStats)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 8);

  // City breakdown
  const cityStats = getCityStats();
  const topCities = Object.entries(cityStats)
    .sort((a, b) => b[1] - a[1]);

  // Average score
  const avgScore = totalLeads > 0
    ? Math.round(leads.reduce((sum, l) => sum + l.score, 0) / totalLeads)
    : 0;

  // High-priority leads (score >= 80)
  const highPriorityLeads = leads.filter(l => l.score >= 80).length;

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div>
        <h1 className="text-2xl font-bold text-text-primary glow-text-cyan">Dashboard</h1>
        <p className="text-sm text-text-secondary mt-1">
          Welcome back, Admin
          {imported && (
            <span className="ml-2 text-neon-green text-xs">● Live Data</span>
          )}
        </p>
      </div>

      {/* Stat Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard label="Total Leads" value={totalLeads} color="cyan" />
        <StatCard label="Active Deals" value={activeDeals} color="green" />
        <StatCard label="Email Drafts" value={totalEmails} color="purple" />
        <StatCard label="Pending Tasks" value={pendingTasks} color="amber" />
      </div>

      {/* Secondary Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard label="Avg Lead Score" value={avgScore} color="cyan" />
        <StatCard label="High Priority" value={highPriorityLeads} change={`≥80 score`} color="green" />
        <StatCard label="Revenue" value={formatCurrency(totalRevenue)} color="purple" />
        <StatCard label="Emails Sent" value={sentEmails} change={`of ${totalEmails}`} color="amber" />
      </div>

      {/* Pipeline + Activity Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        {/* Pipeline Overview */}
        <div className="card lg:col-span-1">
          <h2 className="text-sm font-bold text-text-primary font-mono mb-4 uppercase tracking-wider">Pipeline</h2>
          <div className="space-y-3">
            {pipelineStages.map((stage) => (
              <div key={stage.status} className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className={`w-2 h-2 rounded-full ${statusColors[stage.status]}`}></div>
                  <span className="text-sm text-text-secondary">{statusLabels[stage.status]}</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-sm font-bold text-text-primary">{stage.count}</span>
                  <div className="w-16 h-1.5 bg-bg-hover rounded-full overflow-hidden">
                    <div
                      className={`h-full rounded-full ${statusColors[stage.status]}`}
                      style={{ width: `${totalLeads > 0 ? (stage.count / totalLeads) * 100 : 0}%` }}
                    ></div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Recent Activity */}
        <div className="card lg:col-span-2">
          <h2 className="text-sm font-bold text-text-primary font-mono mb-4 uppercase tracking-wider">Recent Activity</h2>
          <div className="space-y-3">
            {activities.slice(0, 8).map((activity) => (
              <div key={activity.id} className="flex items-start gap-3 p-2 rounded-lg hover:bg-bg-hover transition-colors">
                <div className="w-8 h-8 rounded-full bg-bg-hover flex items-center justify-center text-sm mt-0.5">
                  {activity.action === 'created' ? '➕' : activity.action === 'completed' ? '✅' : activity.action === 'scored' ? '📊' : activity.action === 'import' ? '📥' : '🔄'}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm text-text-primary truncate">{activity.details}</p>
                  <p className="text-xs text-text-muted">{getRelativeTime(activity.created_at)}</p>
                </div>
              </div>
            ))}
            {activities.length === 0 && (
              <p className="text-sm text-text-muted text-center py-4">No activity yet. Import data to get started.</p>
            )}
          </div>
        </div>
      </div>

      {/* Category + City Breakdown */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {/* Categories */}
        <div className="card">
          <h2 className="text-sm font-bold text-text-primary font-mono mb-4 uppercase tracking-wider">By Category</h2>
          <div className="space-y-2">
            {topCategories.map(([category, count]) => (
              <div key={category} className="flex items-center justify-between">
                <span className="text-sm text-text-secondary capitalize">{category}</span>
                <div className="flex items-center gap-2">
                  <span className="text-sm font-bold text-text-primary">{count}</span>
                  <div className="w-20 h-1.5 bg-bg-hover rounded-full overflow-hidden">
                    <div
                      className="h-full rounded-full bg-cyan"
                      style={{ width: `${totalLeads > 0 ? (count / totalLeads) * 100 : 0}%` }}
                    ></div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Cities */}
        <div className="card">
          <h2 className="text-sm font-bold text-text-primary font-mono mb-4 uppercase tracking-wider">By City</h2>
          <div className="space-y-2">
            {topCities.map(([city, count]) => (
              <div key={city} className="flex items-center justify-between">
                <span className="text-sm text-text-secondary">{city}</span>
                <div className="flex items-center gap-2">
                  <span className="text-sm font-bold text-text-primary">{count}</span>
                  <div className="w-20 h-1.5 bg-bg-hover rounded-full overflow-hidden">
                    <div
                      className="h-full rounded-full bg-purple"
                      style={{ width: `${totalLeads > 0 ? (count / totalLeads) * 100 : 0}%` }}
                    ></div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="card">
        <h2 className="text-sm font-bold text-text-primary font-mono mb-4 uppercase tracking-wider">Quick Actions</h2>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          <a href="/pipeline" className="btn btn-ghost text-sm flex items-center gap-2 justify-center">
            <span>🎯</span> View Pipeline
          </a>
          <a href="/outreach" className="btn btn-ghost text-sm flex items-center gap-2 justify-center">
            <span>📧</span> Outreach
          </a>
          <a href="/tasks" className="btn btn-ghost text-sm flex items-center gap-2 justify-center">
            <span>✅</span> Tasks
          </a>
          <a href="/research" className="btn btn-ghost text-sm flex items-center gap-2 justify-center">
            <span>🔬</span> Research
          </a>
        </div>
      </div>
    </div>
  );
}
