'use client';

import { useState, useMemo, useEffect } from 'react';
import {
  getTasks,
  getLeads,
  addTask,
  updateTask,
  deleteTask,
  loadRealDataFromJSON,
} from '@/lib/client-db';
import type { Task, Lead } from '@/lib/client-db';

type TaskFilter = 'all' | 'pending' | 'in_progress' | 'completed';
type PriorityFilter = 'all' | 'high' | 'medium' | 'low';

const STATUS_TABS: { key: TaskFilter; label: string; icon: string }[] = [
  { key: 'all', label: 'All', icon: '📋' },
  { key: 'pending', label: 'Pending', icon: '⏳' },
  { key: 'in_progress', label: 'In Progress', icon: '🔄' },
  { key: 'completed', label: 'Completed', icon: '✅' },
];

const PRIORITY_OPTIONS = [
  { key: 'high', label: 'High', color: 'text-neon-red', bg: 'bg-neon-red/10 border-neon-red/20' },
  { key: 'medium', label: 'Medium', color: 'text-neon-amber', bg: 'bg-neon-amber/10 border-neon-amber/20' },
  { key: 'low', label: 'Low', color: 'text-text-secondary', bg: 'bg-bg-hover border-border' },
];

function getStatusBadge(status: string) {
  const styles: Record<string, string> = {
    pending: 'bg-neon-amber/10 text-neon-amber border-neon-amber/20',
    in_progress: 'bg-cyan/10 text-cyan border-cyan/20',
    completed: 'bg-neon-green/10 text-neon-green border-neon-green/20',
  };
  const labels: Record<string, string> = {
    pending: 'Pending',
    in_progress: 'In Progress',
    completed: 'Completed',
  };
  return { style: styles[status] || 'bg-bg-hover text-text-secondary border-border', label: labels[status] || status };
}

function getPriorityBadge(priority: string) {
  const p = PRIORITY_OPTIONS.find(o => o.key === priority);
  return p || PRIORITY_OPTIONS[2];
}

export default function TasksPage() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [leads, setLeads] = useState<Lead[]>([]);
  const [loading, setLoading] = useState(true);
  const [statusFilter, setStatusFilter] = useState<TaskFilter>('all');
  const [priorityFilter, setPriorityFilter] = useState<PriorityFilter>('all');
  const [search, setSearch] = useState('');
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [editingTask, setEditingTask] = useState<Task | null>(null);

  // Form state
  const [formTitle, setFormTitle] = useState('');
  const [formDescription, setFormDescription] = useState('');
  const [formPriority, setFormPriority] = useState<'high' | 'medium' | 'low'>('medium');
  const [formStatus, setFormStatus] = useState<'pending' | 'in_progress' | 'completed'>('pending');
  const [formDeadline, setFormDeadline] = useState('');
  const [formLeadId, setFormLeadId] = useState('');

  useEffect(() => {
    async function load() {
      try {
        await loadRealDataFromJSON();
        const [t, l] = await Promise.all([getTasks(), getLeads()]);
        setTasks(t);
        setLeads(l);
      } catch (err) {
        console.error('Failed to load tasks:', err);
      } finally {
        setLoading(false);
      }
    }
    load();
  }, []);

  const filteredTasks = useMemo(() => {
    return tasks
      .filter(t => {
        const matchesStatus = statusFilter === 'all' || t.status === statusFilter;
        const matchesPriority = priorityFilter === 'all' || t.priority === priorityFilter;
        const matchesSearch =
          !search ||
          t.title.toLowerCase().includes(search.toLowerCase()) ||
          t.description.toLowerCase().includes(search.toLowerCase());
        return matchesStatus && matchesPriority && matchesSearch;
      })
      .sort((a, b) => {
        const statusOrder: Record<string, number> = { in_progress: 0, pending: 1, completed: 2 };
        const sa = statusOrder[a.status] ?? 1;
        const sb = statusOrder[b.status] ?? 1;
        if (sa !== sb) return sa - sb;
        const prioOrder: Record<string, number> = { high: 0, medium: 1, low: 2 };
        const pa = prioOrder[a.priority] ?? 1;
        const pb = prioOrder[b.priority] ?? 1;
        return pa - pb;
      });
  }, [tasks, statusFilter, priorityFilter, search]);

  const statusCounts = useMemo(() => {
    const counts: Record<string, number> = { all: tasks.length };
    for (const t of tasks) {
      counts[t.status] = (counts[t.status] || 0) + 1;
    }
    return counts;
  }, [tasks]);

  const resetForm = () => {
    setFormTitle('');
    setFormDescription('');
    setFormPriority('medium');
    setFormStatus('pending');
    setFormDeadline('');
    setFormLeadId('');
    setEditingTask(null);
  };

  const openCreateModal = () => {
    resetForm();
    setShowCreateModal(true);
  };

  const openEditModal = (task: Task) => {
    setEditingTask(task);
    setFormTitle(task.title);
    setFormDescription(task.description);
    setFormPriority(task.priority as 'high' | 'medium' | 'low');
    setFormStatus(task.status as 'pending' | 'in_progress' | 'completed');
    setFormDeadline(task.deadline || '');
    setFormLeadId(task.lead_id || '');
    setShowCreateModal(true);
  };

  const refreshData = async () => {
    const [t, l] = await Promise.all([getTasks(), getLeads()]);
    setTasks(t);
    setLeads(l);
  };

  const handleSubmit = async () => {
    if (!formTitle.trim()) return;

    if (editingTask) {
      await updateTask(editingTask.id, {
        title: formTitle.trim(),
        description: formDescription.trim(),
        priority: formPriority,
        status: formStatus,
        deadline: formDeadline || '',
        lead_id: formLeadId,
      });
    } else {
      await addTask({
        title: formTitle.trim(),
        description: formDescription.trim(),
        priority: formPriority,
        status: formStatus,
        deadline: formDeadline || '',
        lead_id: formLeadId,
        owner_type: '',
        owner_id: '',
      });
    }

    await refreshData();
    setShowCreateModal(false);
    resetForm();
  };

  const handleStatusToggle = async (task: Task) => {
    const nextStatus = task.status === 'completed' ? 'pending' : task.status === 'pending' ? 'in_progress' : 'completed';
    await updateTask(task.id, { status: nextStatus });
    await refreshData();
  };

  const handleDelete = async (task: Task) => {
    if (confirm(`Delete task "${task.title}"?`)) {
      await deleteTask(task.id);
      await refreshData();
    }
  };

  const getLeadName = (leadId: string) => {
    const lead = leads.find(l => l.id === leadId);
    return lead ? lead.name : null;
  };

  const pendingCount = statusCounts['pending'] || 0;
  const inProgressCount = statusCounts['in_progress'] || 0;
  const completedCount = statusCounts['completed'] || 0;

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-center">
          <span className="animate-spin text-2xl">⏳</span>
          <p className="text-sm text-text-muted mt-2">Loading tasks...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-text-primary glow-text-cyan">Tasks</h1>
          <p className="text-sm text-text-secondary mt-1">
            {tasks.length} total • {inProgressCount} active • {pendingCount} pending
          </p>
        </div>
        <button onClick={openCreateModal} className="btn btn-primary text-sm">
          + New Task
        </button>
      </div>

      {/* Stats Row */}
      <div className="grid grid-cols-3 gap-4">
        <div className="stat-card">
          <div className="flex items-center gap-2 mb-1">
            <span className="text-neon-amber">⏳</span>
            <span className="text-xs text-text-muted uppercase tracking-wider">Pending</span>
          </div>
          <p className="stat-value text-neon-amber">{pendingCount}</p>
        </div>
        <div className="stat-card">
          <div className="flex items-center gap-2 mb-1">
            <span className="text-cyan">🔄</span>
            <span className="text-xs text-text-muted uppercase tracking-wider">In Progress</span>
          </div>
          <p className="stat-value text-cyan">{inProgressCount}</p>
        </div>
        <div className="stat-card">
          <div className="flex items-center gap-2 mb-1">
            <span className="text-neon-green">✅</span>
            <span className="text-xs text-text-muted uppercase tracking-wider">Completed</span>
          </div>
          <p className="stat-value text-neon-green">{completedCount}</p>
        </div>
      </div>

      {/* Search */}
      <div className="relative">
        <input
          type="text"
          placeholder="Search tasks..."
          value={search}
          onChange={e => setSearch(e.target.value)}
          className="input pl-10"
        />
        <span className="absolute left-3 top-1/2 -translate-y-1/2 text-text-muted">🔍</span>
      </div>

      {/* Filters */}
      <div className="flex flex-wrap gap-3 items-center">
        <div className="flex gap-1 bg-bg-secondary rounded-lg p-1 border border-border">
          {STATUS_TABS.map(tab => (
            <button
              key={tab.key}
              onClick={() => setStatusFilter(tab.key)}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-md text-xs font-medium transition-all ${
                statusFilter === tab.key
                  ? 'bg-cyan/10 text-cyan border border-cyan/30'
                  : 'text-text-secondary hover:text-text-primary hover:bg-bg-hover'
              }`}
            >
              <span>{tab.icon}</span>
              <span>{tab.label}</span>
              <span className={`text-[10px] ${statusFilter === tab.key ? 'text-cyan/70' : 'text-text-muted'}`}>
                {statusCounts[tab.key] || 0}
              </span>
            </button>
          ))}
        </div>

        <div className="flex gap-1 bg-bg-secondary rounded-lg p-1 border border-border">
          <button
            onClick={() => setPriorityFilter('all')}
            className={`px-3 py-1.5 rounded-md text-xs font-medium transition-all ${
              priorityFilter === 'all'
                ? 'bg-purple/10 text-purple border border-purple/30'
                : 'text-text-secondary hover:text-text-primary hover:bg-bg-hover'
            }`}
          >
            All Priority
          </button>
          {PRIORITY_OPTIONS.map(p => (
            <button
              key={p.key}
              onClick={() => setPriorityFilter(p.key as PriorityFilter)}
              className={`px-3 py-1.5 rounded-md text-xs font-medium transition-all ${
                priorityFilter === p.key
                  ? `${p.bg} ${p.color} border`
                  : 'text-text-secondary hover:text-text-primary hover:bg-bg-hover'
              }`}
            >
              {p.label}
            </button>
          ))}
        </div>
      </div>

      {/* Task List */}
      <div className="space-y-2">
        {filteredTasks.length === 0 && (
          <div className="card text-center py-12">
            <p className="text-text-muted">No tasks found.</p>
          </div>
        )}

        {filteredTasks.map(task => {
          const statusBadge = getStatusBadge(task.status);
          const priorityBadge = getPriorityBadge(task.priority);
          const leadName = getLeadName(task.lead_id);

          return (
            <div
              key={task.id}
              className={`card p-4 flex items-start gap-4 transition-all ${
                task.status === 'completed' ? 'opacity-60' : ''
              }`}
            >
              <button
                onClick={() => handleStatusToggle(task)}
                className={`mt-0.5 w-6 h-6 rounded-full border-2 flex items-center justify-center flex-shrink-0 transition-all ${
                  task.status === 'completed'
                    ? 'bg-neon-green/20 border-neon-green text-neon-green'
                    : task.status === 'in_progress'
                    ? 'bg-cyan/20 border-cyan text-cyan'
                    : 'border-border-light hover:border-text-muted'
                }`}
                title={`Status: ${task.status}. Click to advance.`}
              >
                {task.status === 'completed' && <span className="text-xs">✓</span>}
                {task.status === 'in_progress' && <span className="text-xs">⟳</span>}
              </button>

              <div className="flex-1 min-w-0">
                <div className="flex items-start justify-between gap-3">
                  <div className="min-w-0">
                    <h3 className={`text-sm font-medium ${
                      task.status === 'completed' ? 'text-text-muted line-through' : 'text-text-primary'
                    }`}>
                      {task.title}
                    </h3>
                    {task.description && (
                      <p className="text-xs text-text-secondary mt-0.5 line-clamp-2">{task.description}</p>
                    )}
                  </div>
                  <div className="flex items-center gap-2 flex-shrink-0">
                    <span className={`px-2 py-0.5 rounded-full text-[10px] font-medium border ${statusBadge.style}`}>
                      {statusBadge.label}
                    </span>
                    <span className={`px-2 py-0.5 rounded-full text-[10px] font-medium border ${priorityBadge.bg} ${priorityBadge.color}`}>
                      {priorityBadge.label}
                    </span>
                  </div>
                </div>

                <div className="flex items-center gap-3 mt-2 text-[11px] text-text-muted">
                  {leadName && (
                    <span className="flex items-center gap-1">
                      <span>👤</span>
                      <span>{leadName}</span>
                    </span>
                  )}
                  {task.deadline && (
                    <span className="flex items-center gap-1">
                      <span>📅</span>
                      <span>{task.deadline}</span>
                    </span>
                  )}
                  <span className="flex items-center gap-1">
                    <span>🕐</span>
                    <span>{new Date(task.created_at).toLocaleDateString()}</span>
                  </span>
                </div>
              </div>

              <div className="flex items-center gap-1 flex-shrink-0">
                <button
                  onClick={() => openEditModal(task)}
                  className="p-1.5 rounded text-text-muted hover:text-text-primary hover:bg-bg-hover transition-colors"
                  title="Edit task"
                >
                  ✏️
                </button>
                <button
                  onClick={() => handleDelete(task)}
                  className="p-1.5 rounded text-text-muted hover:text-neon-red hover:bg-neon-red/10 transition-colors"
                  title="Delete task"
                >
                  🗑️
                </button>
              </div>
            </div>
          );
        })}
      </div>

      {/* Create/Edit Modal */}
      {showCreateModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm">
          <div className="card w-full max-w-lg mx-4 p-6 space-y-4 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-bold text-text-primary font-mono">
                {editingTask ? 'Edit Task' : 'New Task'}
              </h2>
              <button
                onClick={() => { setShowCreateModal(false); resetForm(); }}
                className="text-text-muted hover:text-text-primary transition-colors"
              >
                ✕
              </button>
            </div>

            <div className="space-y-3">
              <div>
                <label htmlFor="task-title" className="block text-xs text-text-muted mb-1">Title *</label>
                <input
                  id="task-title"
                  type="text"
                  value={formTitle}
                  onChange={e => setFormTitle(e.target.value)}
                  placeholder="Task title"
                  className="input w-full"
                  autoFocus
                />
              </div>

              <div>
                <label htmlFor="task-desc" className="block text-xs text-text-muted mb-1">Description</label>
                <textarea
                  id="task-desc"
                  value={formDescription}
                  onChange={e => setFormDescription(e.target.value)}
                  placeholder="Task details..."
                  className="input w-full h-20 resize-none"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label htmlFor="task-priority" className="block text-xs text-text-muted mb-1">Priority</label>
                  <select
                    id="task-priority"
                    value={formPriority}
                    onChange={e => setFormPriority(e.target.value as 'high' | 'medium' | 'low')}
                    className="input w-full"
                  >
                    <option value="high">High</option>
                    <option value="medium">Medium</option>
                    <option value="low">Low</option>
                  </select>
                </div>
                <div>
                  <label htmlFor="task-status" className="block text-xs text-text-muted mb-1">Status</label>
                  <select
                    id="task-status"
                    value={formStatus}
                    onChange={e => setFormStatus(e.target.value as 'pending' | 'in_progress' | 'completed')}
                    className="input w-full"
                  >
                    <option value="pending">Pending</option>
                    <option value="in_progress">In Progress</option>
                    <option value="completed">Completed</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label htmlFor="task-deadline" className="block text-xs text-text-muted mb-1">Deadline</label>
                  <input
                    id="task-deadline"
                    type="date"
                    value={formDeadline}
                    onChange={e => setFormDeadline(e.target.value)}
                    className="input w-full"
                  />
                </div>
                <div>
                  <label htmlFor="task-lead" className="block text-xs text-text-muted mb-1">Related Lead</label>
                  <select
                    id="task-lead"
                    value={formLeadId}
                    onChange={e => setFormLeadId(e.target.value)}
                    className="input w-full"
                  >
                    <option value="">None</option>
                    {leads.map(l => (
                      <option key={l.id} value={l.id}>{l.name} — {l.company}</option>
                    ))}
                  </select>
                </div>
              </div>
            </div>

            <div className="flex justify-end gap-3 pt-2">
              <button
                onClick={() => { setShowCreateModal(false); resetForm(); }}
                className="btn btn-secondary text-sm"
              >
                Cancel
              </button>
              <button
                onClick={handleSubmit}
                disabled={!formTitle.trim()}
                className="btn btn-primary text-sm disabled:opacity-50"
              >
                {editingTask ? 'Save Changes' : 'Create Task'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
