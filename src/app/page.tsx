import { getDb } from '@/lib/db';
import { seedDemoData } from '@/lib/seed';

// Force dynamic since we read from SQLite
export const dynamic = 'force-dynamic';

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

export default function DashboardPage() {
  seedDemoData();
  const db = getDb();

  // Get stats
  const totalLeads = (db.prepare('SELECT COUNT(*) as count FROM leads').get() as { count: number }).count;
  const activeDeals = (db.prepare("SELECT COUNT(*) as count FROM deals WHERE status = 'active'").get() as { count: number }).count;
  const totalRevenue = (db.prepare("SELECT COALESCE(SUM(value), 0) as total FROM deals WHERE status = 'completed'").get() as { total: number }).total;
  const pendingTasks = (db.prepare("SELECT COUNT(*) as count FROM tasks WHERE status != 'completed'").get() as { count: number }).count;

  // Pipeline breakdown
  const pipelineStages = db.prepare(`
    SELECT status, COUNT(*) as count FROM leads GROUP BY status ORDER BY 
      CASE status
        WHEN 'new' THEN 1
        WHEN 'researched' THEN 2
        WHEN 'outreach' THEN 3
        WHEN 'proposal' THEN 4
        WHEN 'active_deal' THEN 5
        WHEN 'closed_won' THEN 6
        WHEN 'closed_lost' THEN 7
      END
  `).all() as { status: string; count: number }[];

  // Recent activity
  const recentActivity = db.prepare(`
    SELECT * FROM activity_log ORDER BY created_at DESC LIMIT 8
  `).all() as { id: string; entity_type: string; entity_id: string; action: string; details: string; created_at: string }[];

  // Recent leads
  const recentLeads = db.prepare(`
    SELECT * FROM leads ORDER BY created_at DESC LIMIT 5
  `).all() as { id: string; name: string; company: string; status: string; score: number }[];

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
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-text-primary glow-text-cyan">Dashboard</h1>
          <p className="text-sm text-text-secondary mt-1">LNM Command Center — Overview</p>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-xs text-text-muted font-mono">SOETech LLC</span>
          <div className="w-2 h-2 bg-neon-green rounded-full pulse-glow"></div>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard label="Total Leads" value={totalLeads} change="+3 this week" color="cyan" />
        <StatCard label="Active Deals" value={activeDeals} change="1 closing soon" color="purple" />
        <StatCard label="Revenue" value={formatCurrency(totalRevenue)} change="+12% vs last month" color="green" />
        <StatCard label="Tasks Pending" value={pendingTasks} change="2 high priority" color="amber" />
      </div>

      {/* Main Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Pipeline Summary */}
        <div className="lg:col-span-2 card">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-bold text-text-primary font-mono">Pipeline Summary</h2>
            <a href="/pipeline" className="text-xs text-cyan hover:underline">View All →</a>
          </div>
          <div className="space-y-3">
            {pipelineStages.map((stage) => {
              const total = pipelineStages.reduce((acc, s) => acc + s.count, 0);
              const pct = total > 0 ? (stage.count / total) * 100 : 0;
              return (
                <div key={stage.status} className="flex items-center gap-3">
                  <span className="w-28 text-xs text-text-secondary">
                    {statusLabels[stage.status] || stage.status}
                  </span>
                  <div className="flex-1 h-2 bg-bg-secondary rounded-full overflow-hidden">
                    <div
                      className="h-full bg-gradient-to-r from-cyan to-purple rounded-full transition-all duration-500"
                      style={{ width: `${pct}%` }}
                    />
                  </div>
                  <span className="w-8 text-xs text-text-muted text-right font-mono">{stage.count}</span>
                </div>
              );
            })}
          </div>
        </div>

        {/* Recent Activity */}
        <div className="card">
          <h2 className="text-lg font-bold text-text-primary font-mono mb-4">Recent Activity</h2>
          <div className="space-y-3">
            {recentActivity.map((activity) => (
              <div key={activity.id} className="flex items-start gap-3 py-2 border-b border-border last:border-0">
                <div className="w-6 h-6 rounded-full bg-bg-secondary flex items-center justify-center text-xs flex-shrink-0 mt-0.5">
                  {activity.entity_type === 'lead' ? '👤' : activity.entity_type === 'deal' ? '💰' : activity.entity_type === 'task' ? '✅' : '📝'}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-xs text-text-primary leading-relaxed">{activity.details}</p>
                  <p className="text-[10px] text-text-muted mt-1">{getRelativeTime(activity.created_at)}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Recent Leads */}
      <div className="card">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-bold text-text-primary font-mono">Recent Leads</h2>
          <a href="/pipeline" className="text-xs text-cyan hover:underline">View Pipeline →</a>
        </div>
        <div className="table-container">
          <table>
            <thead>
              <tr>
                <th>Name</th>
                <th>Company</th>
                <th>Status</th>
                <th>Score</th>
              </tr>
            </thead>
            <tbody>
              {recentLeads.map((lead) => (
                <tr key={lead.id}>
                  <td className="font-medium text-text-primary">{lead.name}</td>
                  <td className="text-text-secondary">{lead.company}</td>
                  <td>
                    <span className={`badge badge-${lead.status}`}>
                      {statusLabels[lead.status] || lead.status}
                    </span>
                  </td>
                  <td>
                    <span className="font-mono text-sm text-text-secondary">{lead.score}</span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
