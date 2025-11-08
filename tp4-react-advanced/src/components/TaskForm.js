import React, { useState } from 'react';

export default function TaskForm({ onAdd }) {
  const [text, setText] = useState('');

  function handleSubmit(e) {
    e.preventDefault();
    const v = text.trim();
    if (!v) return;
    onAdd(v);
    setText('');
  }

  return (
    <form className="task-form" onSubmit={handleSubmit}>
      <input
        value={text}
        onChange={e => setText(e.target.value)}
        placeholder="New task..."
        aria-label="New task"
      />
      <button type="submit">Add</button>
    </form>
  );
}
