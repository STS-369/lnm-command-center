export default function TasksPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-text-primary glow-text-cyan">Tasks</h1>
        <p className="text-sm text-text-secondary mt-1">Task management and scheduling</p>
      </div>
      <div className="card text-center py-16">
        <div className="text-5xl mb-4">✅</div>
        <h2 className="text-lg font-bold text-text-primary font-mono mb-2">Coming in Phase 1</h2>
        <p className="text-sm text-text-secondary max-w-md mx-auto">
          Task queue management, priority-based scheduling, 
          and automated task assignment for AI agents.
        </p>
      </div>
    </div>
  );
}
