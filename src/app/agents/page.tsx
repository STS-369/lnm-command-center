'use client';

import { useState, useEffect } from 'react';
import { getLeads, getTasks, getActivities } from '@/lib/client-db';

interface Agent {
  id: string;
  name: string;
  role: string;
  icon: string;
  gradient: string;
  status: 'online' | 'idle' | 'offline';
  capabilities: string[];
  description: string;
  stats: {
    tasksCompleted: number;
    tasksPending: number;
    uptime: string;
  };
  selectedBg: string;
  capBg: string;
  capText: string;
  capBorder: string;
}

const AGENTS: Agent[] = [
  {
    id: 'alice',
    name: 'Alice',
    role: 'Sales Orchestrator',
    icon: '🧠',
    gradient: 'from-cyan to-cyan/50',
    status: 'online',
    capabilities: [
      'Lead pipeline management',
      'Email sequence generation',
      'CRM data coordination',
      'Handoff detection',
      'Cron job scheduling',
    ],
    description:
      'Master orchestrator. Observes, decides, and delegates across the SOETech sales pipeline. Manages lead processing, email outreach, and coordinates with other agents.',
    stats: { tasksCompleted: 142, tasksPending: 8, uptime: '99.7%' },
    selectedBg: 'border-cyan/30 bg-cyan/5',
    capBg: 'bg-cyan/10',
    capText: 'text-cyan',
    capBorder: 'border-cyan/20',
  },
  {
    id: 'cypher',
    name: 'Cypher',
    role: 'Code Review & Debug Agent',
    icon: '🔍',
    gradient: 'from-purple to-purple/50',
    status: 'idle',
    capabilities: [
      'Website code review',
      'Bug detection & debugging',
      'Performance analysis',
      'Security hardening',
      'Mobile responsive audit',
    ],
    description:
      'Specialized code reviewer. Analyzes client websites for bugs, security issues, and performance problems. Runs first-pass and second-pass reviews.',
    stats: { tasksCompleted: 87, tasksPending: 3, uptime: '98.2%' },
    selectedBg: 'border-purple/30 bg-purple/5',
    capBg: 'bg-purple/10',
    capText: 'text-purple',
    capBorder: 'border-purple/20',
  },
  {
    id: 'clippy',
    name: 'Clippy',
    role: 'Code Builder Agent',
    icon: '🔧',
    gradient: 'from-neon-green to-neon-green/50',
    status: 'idle',
    capabilities: [
      'First-pass code generation',
      'Second-pass refinement',
      'Full-stack development',
      'AI integration',
      'Component architecture',
    ],
    description:
      'Primary code builder. Takes specifications and builds websites, dashboards, and AI integrations. Works in two passes: initial build then refined polish.',
    stats: { tasksCompleted: 64, tasksPending: 2, uptime: '97.8%' },
    selectedBg: 'border-neon-green/30 bg-neon-green/5',
    capBg: 'bg-neon-green/10',
    capText: 'text-neon-green',
    capBorder: 'border-neon-green/20',
  },
];

const STATUS_STYLES: Record<string, { dot: string; label: string; badge: string }> = {
  online: { dot: 'bg-neon-green', label: 'Online', badge: 'bg-neon-green/10 text-neon-green border-neon-green/20' },
  idle: { dot: 'bg-neon-amber', label: 'Idle', badge: 'bg-neon-amber/10 text-neon-amber border-neon-amber/20' },
  offline: { dot: 'bg-neon-red', label: 'Offline', badge: 'bg-neon-red/10 text-neon-red border-neon-red/20' },
};

export default function AgentsPage() {
  const [selectedAgent, setSelectedAgent] = useState<Agent | null>(null);
  const [leads, setLeads] = useState<any[]>([]);
  const [tasks, setTasks] = useState<any[]>([]);
  const [activities, setActivities] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [pulse, setPulse] = useState(true);

  useEffect(() => {
    async function load() {
      try {
        const [l, t, a] = await Promise.all([getLeads(), getTasks(), getActivities()]);
        setLeads(l);
        setTasks(t);
        setActivities(a);
      } catch (err) {
        console.error('Failed to load agent data:', err);
      } finally {
        setLoading(false);
      }
    }
    load();

    const interval = setInterval(() => setPulse(p => !p), 2000);
    return () => clearInterval(interval);
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-center">
          <span className="animate-spin text-2xl">⏳</span>
          <p className="text-sm text-text-muted mt-2">Loading agents...</p>
        </div>
      </div>
    );
  }

  const onlineCount = AGENTS.filter(a => a.status === 'online').length;
  const totalTasksCompleted = AGENTS.reduce((s, a) => s + a.stats.tasksCompleted, 0);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-text-primary glow-text-cyan">AI Agents</h1>
        <p className="text-sm text-text-secondary mt-1">
          {onlineCount} agents online • {totalTasksCompleted} tasks completed total
        </p>
      </div>

      {/* System Status */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="stat-card">
          <div className="flex items-center gap-2 mb-1">
            <span className={`w-2 h-2 rounded-full ${pulse ? 'bg-neon-green' : 'bg-neon-green/50'} transition-opacity`} />
            <span className="text-xs text-text-muted uppercase tracking-wider">Agents Online</span>
          </div>
          <p className="stat-value text-neon-green">{onlineCount}/{AGENTS.length}</p>
        </div>
        <div className="stat-card">
          <div className="flex items-center gap-2 mb-1">
            <span className="text-cyan">📊</span>
            <span className="text-xs text-text-muted uppercase tracking-wider">Leads Managed</span>
          </div>
          <p className="stat-value text-cyan">{leads.length}</p>
        </div>
        <div className="stat-card">
          <div className="flex items-center gap-2 mb-1">
            <span className="text-purple">⚡</span>
            <span className="text-xs text-text-muted uppercase tracking-wider">Tasks Completed</span>
          </div>
          <p className="stat-value text-purple">{totalTasksCompleted}</p>
        </div>
      </div>

      {/* Agent Cards */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        {AGENTS.map(agent => {
          const statusStyle = STATUS_STYLES[agent.status];
          const isSelected = selectedAgent?.id === agent.id;

          return (
            <button
              key={agent.id}
              onClick={() => setSelectedAgent(isSelected ? null : agent)}
              className={`text-left card p-5 transition-all hover:border-border-light ${
                isSelected ? agent.selectedBg : ''
              }`}
            >
              <div className="flex items-start justify-between mb-3">
                <div className="flex items-center gap-3">
                  <div
                    className={`w-12 h-12 rounded-xl bg-gradient-to-br ${agent.gradient} flex items-center justify-center text-2xl`}
                  >
                    {agent.icon}
                  </div>
                  <div>
                    <h3 className="text-base font-bold text-text-primary font-mono">{agent.name}</h3>
                    <p className="text-xs text-text-secondary">{agent.role}</p>
                  </div>
                </div>
                <span className={`flex items-center gap-1.5 px-2 py-1 rounded-full text-[10px] font-medium border ${statusStyle.badge}`}>
                  <span className={`w-1.5 h-1.5 rounded-full ${statusStyle.dot}`} />
                  {statusStyle.label}
                </span>
              </div>

              <p className="text-xs text-text-secondary leading-relaxed mb-4 line-clamp-3">
                {agent.description}
              </p>

              <div className="grid grid-cols-3 gap-2 mb-4">
                <div className="text-center p-2 rounded-lg bg-bg-secondary border border-border">
                  <p className="text-sm font-bold text-neon-green font-mono">{agent.stats.tasksCompleted}</p>
                  <p className="text-[10px] text-text-muted">Completed</p>
                </div>
                <div className="text-center p-2 rounded-lg bg-bg-secondary border border-border">
                  <p className="text-sm font-bold text-neon-amber font-mono">{agent.stats.tasksPending}</p>
                  <p className="text-[10px] text-text-muted">Pending</p>
                </div>
                <div className="text-center p-2 rounded-lg bg-bg-secondary border border-border">
                  <p className="text-sm font-bold text-cyan font-mono">{agent.stats.uptime}</p>
                  <p className="text-[10px] text-text-muted">Uptime</p>
                </div>
              </div>

              <div className="flex flex-wrap gap-1">
                {agent.capabilities.slice(0, 3).map(cap => (
                  <span
                    key={cap}
                    className="px-2 py-0.5 rounded text-[10px] bg-bg-secondary text-text-muted border border-border"
                  >
                    {cap}
                  </span>
                ))}
                {agent.capabilities.length > 3 && (
                  <span className="px-2 py-0.5 rounded text-[10px] bg-bg-secondary text-text-muted border border-border">
                    +{agent.capabilities.length - 3} more
                  </span>
                )}
              </div>
            </button>
          );
        })}
      </div>

      {/* Selected Agent Detail */}
      {selectedAgent && (
        <div className="card p-6 space-y-4 animate-fade-in">
          <div className="flex items-center gap-3">
            <div
              className={`w-10 h-10 rounded-xl bg-gradient-to-br ${selectedAgent.gradient} flex items-center justify-center text-xl`}
            >
              {selectedAgent.icon}
            </div>
            <div>
              <h2 className="text-lg font-bold text-text-primary font-mono">{selectedAgent.name} — Full Profile</h2>
              <p className="text-xs text-text-secondary">{selectedAgent.role}</p>
            </div>
          </div>

          <p className="text-sm text-text-secondary leading-relaxed">{selectedAgent.description}</p>

          <div>
            <h4 className="text-xs text-text-muted uppercase tracking-wider mb-2">Capabilities</h4>
            <div className="flex flex-wrap gap-2">
              {selectedAgent.capabilities.map(cap => (
                <span
                  key={cap}
                  className={`px-3 py-1.5 rounded-lg text-xs font-medium ${selectedAgent.capBg} ${selectedAgent.capText} border ${selectedAgent.capBorder}`}
                >
                  {cap}
                </span>
              ))}
            </div>
          </div>

          <div>
            <h4 className="text-xs text-text-muted uppercase tracking-wider mb-2">Recent Activity</h4>
            <div className="space-y-2 max-h-48 overflow-y-auto">
              {activities.slice(0, 8).map((act: any) => (
                <div
                  key={act.id}
                  className="flex items-center gap-3 p-2 rounded-lg bg-bg-secondary border border-border text-xs"
                >
                  <span className="text-text-muted">{new Date(act.created_at).toLocaleTimeString()}</span>
                  <span className="text-text-secondary flex-1">{act.details}</span>
                  <span className="px-1.5 py-0.5 rounded text-[10px] bg-bg-hover text-text-muted border border-border capitalize">
                    {act.entity_type}
                  </span>
                </div>
              ))}
              {activities.length === 0 && (
                <p className="text-text-muted text-xs">No recent activity.</p>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
