import React, { useState, useEffect } from 'react';

const TaskForm = ({ onAddTask, onUpdateTask, editingTask, onCancelEdit }) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [priority, setPriority] = useState('medium');
  const [dueDate, setDueDate] = useState('');
  const [formError, setFormError] = useState('');

  useEffect(() => {
    if (editingTask) {
      setTitle(editingTask.title || '');
      setDescription(editingTask.description || '');
      setPriority(editingTask.priority || 'medium');
      setDueDate(editingTask.dueDate ? editingTask.dueDate.substring(0, 10) : '');
      setFormError('');
    } else {
      setTitle('');
      setDescription('');
      setPriority('medium');
      setDueDate('');
      setFormError('');
    }
  }, [editingTask]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!title.trim()) {
      setFormError('Task title cannot be empty');
      return;
    }

    const payload = {
      title: title.trim(),
      description: description.trim(),
      priority,
      dueDate: dueDate || null
    };

    if (editingTask) {
      onUpdateTask(editingTask._id, payload);
    } else {
      onAddTask(payload);
      setTitle('');
      setDescription('');
      setPriority('medium');
      setDueDate('');
    }
    setFormError('');
  };

  return (
    <div className={`form-card ${editingTask ? 'editing-active' : ''}`}>
      <div className="form-header">
        <h2 className="form-heading">
          {editingTask ? 'Edit Task' : 'Create New Task'}
        </h2>
        {editingTask && (
          <button type="button" className="btn-cancel" onClick={onCancelEdit}>
            Cancel Edit
          </button>
        )}
      </div>

      {formError && <div className="error-alert">{formError}</div>}

      <form onSubmit={handleSubmit} className="task-form">
        <div className="form-group">
          <label htmlFor="task-title" className="form-label">
            Title <span className="text-rose">*</span>
          </label>
          <input
            id="task-title"
            type="text"
            className="form-input"
            placeholder="What needs to be accomplished?"
            value={title}
            onChange={(e) => {
              setTitle(e.target.value);
              if (formError) setFormError('');
            }}
            maxLength={120}
          />
        </div>

        <div className="form-group">
          <label htmlFor="task-desc" className="form-label">
            Description
          </label>
          <textarea
            id="task-desc"
            className="form-textarea"
            rows="2"
            placeholder="Add relevant context or sub-tasks..."
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          ></textarea>
        </div>

        <div className="form-row">
          <div className="form-group flex-1">
            <label htmlFor="task-priority" className="form-label">
              Priority
            </label>
            <select
              id="task-priority"
              className="form-select"
              value={priority}
              onChange={(e) => setPriority(e.target.value)}
            >
              <option value="low">Low Priority</option>
              <option value="medium">Medium Priority</option>
              <option value="high">High Priority</option>
            </select>
          </div>

          <div className="form-group flex-1">
            <label htmlFor="task-due" className="form-label">
              Target Deadline
            </label>
            <input
              id="task-due"
              type="date"
              className="form-input"
              value={dueDate}
              onChange={(e) => setDueDate(e.target.value)}
            />
          </div>
        </div>

        <div className="form-actions">
          <button type="submit" className="btn-submit">
            {editingTask ? 'Save Changes' : '+ Add Task'}
          </button>
        </div>
      </form>
    </div>
  );
};

export default TaskForm;
