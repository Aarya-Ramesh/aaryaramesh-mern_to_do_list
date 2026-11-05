import React from 'react';

const TaskItem = ({ todo, onToggleComplete, onEditTask, onDeleteTask }) => {
  const formattedDate = todo.dueDate
    ? new Date(todo.dueDate).toLocaleDateString('en-US', {
        month: 'short',
        day: 'numeric',
        year: 'numeric'
      })
    : null;

  return (
    <div className={`task-item ${todo.completed ? 'completed' : ''}`}>
      <div className="task-main-row">
        <label className="checkbox-container">
          <input
            type="checkbox"
            checked={todo.completed}
            onChange={() => onToggleComplete(todo._id)}
          />
          <span className="checkmark"></span>
        </label>

        <div className="task-details">
          <div className="task-header">
            <h3 className="task-title">{todo.title}</h3>
            <span className={`priority-tag priority-${todo.priority}`}>
              {todo.priority}
            </span>
          </div>

          {todo.description && (
            <p className="task-desc">{todo.description}</p>
          )}

          <div className="task-meta">
            {formattedDate && (
              <span className="due-date-badge">
                📅 Due: {formattedDate}
              </span>
            )}
            <span className="created-date">
              Created: {new Date(todo.createdAt).toLocaleDateString()}
            </span>
          </div>
        </div>

        <div className="task-actions">
          <button
            type="button"
            className="btn-icon btn-edit"
            title="Edit Task"
            onClick={() => onEditTask(todo)}
          >
            ✏️
          </button>
          <button
            type="button"
            className="btn-icon btn-delete"
            title="Delete Task"
            onClick={() => onDeleteTask(todo._id)}
          >
            🗑️
          </button>
        </div>
      </div>
    </div>
  );
};

export default TaskItem;
