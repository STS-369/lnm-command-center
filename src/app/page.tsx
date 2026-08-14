'use client';

import { useState } from 'react';
import { seedDemoData, getLeads, getDeals, getTasks, getActivities } from '@/lib/client-db';
import type { Lead, Deal, Task, Activity } from '@/lib/client-db';

interface StatCardProps {
  label: string;
  value: string | number;
  change?: string;
  color: 'cyan' | 'purple' | 'green' | 'amber';
}

function StatCard({ label, value, change, color }: StatCardProps) {
  const colorMap = {
    cyan: 'text-cyan',
    purple: 'text-purple',
    green: 'text-neon-green',
    amber: 'text-neon-amber',
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
  };
}

export default function DashboardPage() {
  const [data] = useState(initializeData);
  const { leads, deals, tasks, activities } = data;

  // Compute stats from client-side data
  const totalLeads = leads.length;
  const activeDeals = deals.filter(d => d.status === 'active').length;
  const totalRevenue = deals.filter(d => d.status === 'completed').reduce((sum, d) => sum + d.value, 0);
  const pendingTasks = tasks.filter(t => t.status !== 'completed').length;

  // Pipeline breakdown
  const statusOrder = ['new', 'researched', 'outreach', 'proposal', 'active_deal', 'closed_won', 'closed_lost'];
  const pipelineStages = statusOrder
    .map(status => ({
      status,
      count: leads.filter(l => l.status === status).length,
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

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div>
        <h1 className="text-2xl font-bold text-text-primary glow-text-cyan">Dashboard</h1>
        <p className="text-sm text-text-secondary mt-1">Welcome back, Admin</p>
      </div>

      {/* Stat Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard label="Total Leads" value={totalLeads} change="+3 this week" color="cyan" />
        <StatCard label="Active Deals" value={activeDeals} color="green" />
        <StatCard label="Revenue" value={formatCurrency(totalRevenue)} change="+$24k this month" color="purple" />
        <StatCard label="Pending Tasks" value={pendingTasks} color="amber" />
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
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Recent Activity */}
        <div className="card lg:col-span-2">
          <h2 className="text-sm font-bold text-text-primary font-mono mb-4 uppercase tracking-wider">Recent Activity</h2>
          <div className="space-y-3">
            {activities.slice(0, 6).map((activity) => (
              <div key={activity.id} className="flex items-start gap-3 p-2 rounded-lg hover:bg-bg-hover transition-colors">
                <div className="w-8 h-8 rounded-full bg-bg-hover flex items-center justify-center text-sm mt-0.5">
                  {activity.action === 'created' ? '➕' : activity.action === 'completed' ? '✅' : activity.action === 'scored' ? '📊' : '🔄'}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm text-text-primary truncate">{activity.details}</p>
                  <p className="text-xs text-text-muted">{getRelativeTime(activity.created_at)}</p>
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
          <button className="btn btn-ghost text-sm flex items-center gap-2 justify-center">
            <span>➕</span> Add Lead
          </button>
          <button className="btn btn-ghost text-sm flex items-center gap-2 justify-center">
            <span>📧</span> Send Email
          </button>
          <button className="btn btn-ghost text-sm flex items-center gap-2 justify-center">
            <span>📋</span> New Task
          </button>
          <button className="btn btn-ghost text-sm flex items-center gap-2 justify-center">
            <span>📊</span> Reports
          </button>
        </div>
      </div>
    </div>
  );
}
