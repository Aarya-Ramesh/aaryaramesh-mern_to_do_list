import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Navbar from './components/Navbar';
import TaskStats from './components/TaskStats';
import TaskForm from './components/TaskForm';
import TaskFilter from './components/TaskFilter';
import TaskItem from './components/TaskItem';
import './App.css';

const API_BASE_URL = 'http://localhost:5000/api/todos';

const initialMockTodos = [
  {
    _id: '1',
    title: 'Design MERN stack schema for TaskFlow',
    description: 'Establish MongoDB Mongoose model with priority, timestamps, and validation.',
    completed: true,
    priority: 'high',
    dueDate: '2026-11-10',
    createdAt: new Date().toISOString()
  },
  {
    _id: '2',
    title: 'Implement Express REST API routes',
    description: 'Build GET, POST, PUT, PATCH, and DELETE controllers with error handling.',
    completed: true,
    priority: 'high',
    dueDate: '2026-11-12',
    createdAt: new Date().toISOString()
  },
  {
    _id: '3',
    title: 'Connect React client with Axios',
    description: 'Wire up form inputs, real-time filters, and telemetry statistics.',
    completed: false,
    priority: 'medium',
    dueDate: '2026-11-15',
    createdAt: new Date().toISOString()
  }
];

function App() {
  const [todos, setTodos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isBackendOnline, setIsBackendOnline] = useState(false);
  const [notification, setNotification] = useState(null);
  const [editingTask, setEditingTask] = useState(null);

  const [filterStatus, setFilterStatus] = useState('all');
  const [priorityFilter, setPriorityFilter] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');

  const showNotification = (msg, type = 'success') => {
    setNotification({ msg, type });
    setTimeout(() => {
      setNotification(null);
    }, 3500);
  };

  const fetchTodos = async () => {
    setLoading(true);
    try {
      const res = await axios.get(API_BASE_URL, { timeout: 1500 });
      if (res.data && res.data.data) {
        setTodos(res.data.data);
        setIsBackendOnline(true);
      }
    } catch (err) {
      setIsBackendOnline(false);
      const cached = localStorage.getItem('taskflow_app_todos');
      if (cached) {
        setTodos(JSON.parse(cached));
      } else {
        setTodos(initialMockTodos);
        localStorage.setItem('taskflow_app_todos', JSON.stringify(initialMockTodos));
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTodos();
  }, []);

  const saveLocalFallback = (updated) => {
    setTodos(updated);
    localStorage.setItem('taskflow_app_todos', JSON.stringify(updated));
  };

  const handleAddTask = async (taskPayload) => {
    if (isBackendOnline) {
      try {
        const res = await axios.post(API_BASE_URL, taskPayload);
        if (res.data && res.data.data) {
          setTodos([res.data.data, ...todos]);
          showNotification('Task added to MongoDB!');
          return;
        }
      } catch (err) {}
    }

    const newLocalTask = {
      ...taskPayload,
      _id: Date.now().toString(),
      completed: false,
      createdAt: new Date().toISOString()
    };
    saveLocalFallback([newLocalTask, ...todos]);
    showNotification('Task created successfully!');
  };

  const handleUpdateTask = async (id, updatedPayload) => {
    if (isBackendOnline) {
      try {
        const res = await axios.put(`${API_BASE_URL}/${id}`, updatedPayload);
        if (res.data && res.data.data) {
          setTodos(todos.map(t => (t._id === id ? res.data.data : t)));
          setEditingTask(null);
          showNotification('Task updated in MongoDB!');
          return;
        }
      } catch (err) {}
    }

    const updated = todos.map(t => (t._id === id ? { ...t, ...updatedPayload } : t));
    saveLocalFallback(updated);
    setEditingTask(null);
    showNotification('Task updated successfully!');
  };

  const handleToggleComplete = async (id) => {
    if (isBackendOnline) {
      try {
        const res = await axios.patch(`${API_BASE_URL}/${id}/toggle`);
        if (res.data && res.data.data) {
          setTodos(todos.map(t => (t._id === id ? res.data.data : t)));
          return;
        }
      } catch (err) {}
    }

    const updated = todos.map(t => (t._id === id ? { ...t, completed: !t.completed } : t));
    saveLocalFallback(updated);
  };

  const handleDeleteTask = async (id) => {
    if (!window.confirm('Are you sure you want to delete this task?')) return;

    if (isBackendOnline) {
      try {
        await axios.delete(`${API_BASE_URL}/${id}`);
      } catch (err) {}
    }

    const updated = todos.filter(t => t._id !== id);
    saveLocalFallback(updated);
    if (editingTask && editingTask._id === id) {
      setEditingTask(null);
    }
    showNotification('Task deleted successfully!');
  };

  const handleClearCompleted = async () => {
    if (!window.confirm('Delete all completed tasks?')) return;

    if (isBackendOnline) {
      try {
        await axios.delete(`${API_BASE_URL}/clear-completed`);
      } catch (err) {}
    }

    const updated = todos.filter(t => !t.completed);
    saveLocalFallback(updated);
    showNotification('Completed tasks cleared!');
  };

  const filteredTodos = todos.filter((todo) => {
    const matchesStatus =
      filterStatus === 'all'
        ? true
        : filterStatus === 'completed'
        ? todo.completed
        : !todo.completed;

    const matchesPriority =
      priorityFilter === 'all' ? true : todo.priority === priorityFilter;

    const matchesSearch =
      searchTerm === '' ||
      todo.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (todo.description &&
        todo.description.toLowerCase().includes(searchTerm.toLowerCase()));

    return matchesStatus && matchesPriority && matchesSearch;
  });

  return (
    <div className="app-wrapper">
      <Navbar isOnline={isBackendOnline} />

      <main className="main-content">
        {notification && (
          <div className={`toast-alert toast-${notification.type}`}>
            {notification.msg}
          </div>
        )}

        <TaskStats todos={todos} />

        <div className="dashboard-grid">
          <aside className="sidebar-column">
            <TaskForm
              onAddTask={handleAddTask}
              onUpdateTask={handleUpdateTask}
              editingTask={editingTask}
              onCancelEdit={() => setEditingTask(null)}
            />
          </aside>

          <section className="feed-column">
            <TaskFilter
              filterStatus={filterStatus}
              setFilterStatus={setFilterStatus}
              priorityFilter={priorityFilter}
              setPriorityFilter={setPriorityFilter}
              searchTerm={searchTerm}
              setSearchTerm={setSearchTerm}
              onClearCompleted={handleClearCompleted}
              hasCompletedTasks={todos.some(t => t.completed)}
            />

            <div className="tasks-container">
              {loading ? (
                <div className="loading-state">
                  <div className="spinner"></div>
                  <p>Loading tasks...</p>
                </div>
              ) : filteredTodos.length === 0 ? (
                <div className="empty-state">
                  <div className="empty-icon">📝</div>
                  <h3 className="empty-title">No tasks found</h3>
                  <p className="empty-desc">
                    {searchTerm || filterStatus !== 'all' || priorityFilter !== 'all'
                      ? 'No tasks match the active filters. Try resetting search or filter criteria.'
                      : 'Your task list is empty. Create your first task using the form on the left!'}
                  </p>
                </div>
              ) : (
                <div className="tasks-list">
                  {filteredTodos.map((todo) => (
                    <TaskItem
                      key={todo._id}
                      todo={todo}
                      onToggleComplete={handleToggleComplete}
                      onEditTask={(task) => {
                        setEditingTask(task);
                        window.scrollTo({ top: 0, behavior: 'smooth' });
                      }}
                      onDeleteTask={handleDeleteTask}
                    />
                  ))}
                </div>
              )}
            </div>
          </section>
        </div>
      </main>
    </div>
  );
}

export default App;
