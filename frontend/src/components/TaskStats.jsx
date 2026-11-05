import React from 'react';

const TaskStats = ({ todos }) => {
  const total = todos.length;
  const completed = todos.filter(t => t.completed).length;
  const pending = total - completed;
  const highPriority = todos.filter(t => !t.completed && t.priority === 'high').length;
  const completionRate = total > 0 ? Math.round((completed / total) * 100) : 0;

  return (
    <div className="stats-grid">
      <div className="stat-card">
        <span className="stat-label">Total Tasks</span>
        <span className="stat-value">{total}</span>
      </div>
      <div className="stat-card">
        <span className="stat-label">Pending</span>
        <span className="stat-value text-amber">{pending}</span>
      </div>
      <div className="stat-card">
        <span className="stat-label">Completed</span>
        <span className="stat-value text-emerald">{completed}</span>
      </div>
      <div className="stat-card">
        <span className="stat-label">High Priority</span>
        <span className="stat-value text-rose">{highPriority}</span>
      </div>
      <div className="stat-card">
        <span className="stat-label">Progress</span>
        <div className="progress-wrapper">
          <span className="stat-value">{completionRate}%</span>
          <div className="progress-bar-bg">
            <div 
              className="progress-bar-fill" 
              style={{ width: `${completionRate}%` }}
            ></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TaskStats;
