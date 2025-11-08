import React, { useEffect, useState } from 'react';
import TaskForm from './components/TaskForm';
import TaskList from './components/TaskList';
import TaskFilter from './components/TaskFilter';
import SearchBar from './components/SearchBar';
import Pagination from './components/Pagination';

const PAGE_SIZE = 5;
const FILTER_KEY = 'tp4-filter';

export default function App() {
  const [tasks, setTasks] = useState([]);
  const [filter, setFilter] = useState(localStorage.getItem(FILTER_KEY) || 'all');
  const [search, setSearch] = useState('');
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    loadTasks();
  }, []);

  useEffect(() => {
    localStorage.setItem(FILTER_KEY, filter);
    setPage(1);
  }, [filter]);

  async function loadTasks() {
    setLoading(true);
    setError('');
    try {
      const res = await fetch('/api/tasks');
      if (!res.ok) throw new Error('Failed to load');
      const data = await res.json();
      setTasks(data);
    } catch (err) {
      setError('Unable to load tasks');
    } finally {
      setLoading(false);
    }
  }

  async function addTask(text) {
    setError('');
    try {
      const res = await fetch('/api/tasks', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ text })
      });
      if (!res.ok) throw new Error('Add failed');
      const newTask = await res.json();
      setTasks(prev => [newTask, ...prev]);
      setPage(1);
    } catch {
      setError('Unable to add task');
    }
  }

  async function toggleDone(id, done) {
    setError('');
    try {
      const res = await fetch(`/api/tasks/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ done })
      });
      if (!res.ok) throw new Error('Update failed');
      const updated = await res.json();
      setTasks(prev => prev.map(t => t._id === id ? updated : t));
    } catch {
      setError('Unable to update task');
    }
  }

  async function removeTask(id) {
    setError('');
    try {
      const res = await fetch(`/api/tasks/${id}`, { method: 'DELETE' });
      if (!res.ok) throw new Error('Delete failed');
      setTasks(prev => prev.filter(t => t._id !== id));
    } catch {
      setError('Unable to delete task');
    }
  }

  // client-side filter + search
  const filtered = tasks.filter(t => {
    if (filter === 'active') return !t.done;
    if (filter === 'done') return t.done;
    return true;
  }).filter(t => t.text.toLowerCase().includes(search.toLowerCase()));

  const total = tasks.length;
  const totalDone = tasks.filter(t => t.done).length;

  // pagination
  const start = (page - 1) * PAGE_SIZE;
  const visible = filtered.slice(start, start + PAGE_SIZE);
  const totalPages = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE));

  return (
    <div className="container">
      <h1>Tasks</h1>

      <div className="top-row">
        <TaskForm onAdd={addTask} />
        <div className="controls">
          <SearchBar value={search} onChange={v => { setSearch(v); setPage(1); }} />
          <TaskFilter value={filter} onChange={v => setFilter(v)} />
        </div>
      </div>

      <div className="meta">
        <span>Total: {total}</span>
        <span>Done: {totalDone}</span>
      </div>

      {error && <div className="alert">{error}</div>}
      {loading && <div className="loader">Loading...</div>}

      <TaskList tasks={visible} onToggle={toggleDone} onRemove={removeTask} />

      <Pagination page={page} totalPages={totalPages} onChange={p => setPage(p)} />

    </div>
  );
}
