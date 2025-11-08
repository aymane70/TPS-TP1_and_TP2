import React from 'react';

export default function TaskFilter({ value, onChange }) {
  return (
    <div className="filter">
      <button className={value === 'all' ? 'active' : ''} onClick={() => onChange('all')}>All</button>
      <button className={value === 'active' ? 'active' : ''} onClick={() => onChange('active')}>Active</button>
      <button className={value === 'done' ? 'active' : ''} onClick={() => onChange('done')}>Done</button>
    </div>
  );
}
