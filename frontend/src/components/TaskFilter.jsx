import React from 'react';

const TaskFilter = ({
  filterStatus,
  setFilterStatus,
  priorityFilter,
  setPriorityFilter,
  searchTerm,
  setSearchTerm,
  onClearCompleted,
  hasCompletedTasks
}) => {
  return (
    <div className="filter-panel">
      <div className="search-bar">
        <span className="search-icon">🔍</span>
        <input
          type="text"
          className="search-input"
          placeholder="Search by task title or description..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        {searchTerm && (
          <button
            type="button"
            className="clear-search-btn"
            onClick={() => setSearchTerm('')}
          >
            ✕
          </button>
        )}
      </div>

      <div className="filter-controls-row">
        <div className="status-tabs">
          <button
            type="button"
            className={`tab-btn ${filterStatus === 'all' ? 'active' : ''}`}
            onClick={() => setFilterStatus('all')}
          >
            All Tasks
          </button>
          <button
            type="button"
            className={`tab-btn ${filterStatus === 'active' ? 'active' : ''}`}
            onClick={() => setFilterStatus('active')}
          >
            Active
          </button>
          <button
            type="button"
            className={`tab-btn ${filterStatus === 'completed' ? 'active' : ''}`}
            onClick={() => setFilterStatus('completed')}
          >
            Completed
          </button>
        </div>

        <div className="secondary-filters">
          <select
            className="priority-select"
            value={priorityFilter}
            onChange={(e) => setPriorityFilter(e.target.value)}
          >
            <option value="all">All Priorities</option>
            <option value="high">High Priority</option>
            <option value="medium">Medium Priority</option>
            <option value="low">Low Priority</option>
          </select>

          {hasCompletedTasks && (
            <button
              type="button"
              className="btn-clear-completed"
              onClick={onClearCompleted}
            >
              Clear Completed
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default TaskFilter;
