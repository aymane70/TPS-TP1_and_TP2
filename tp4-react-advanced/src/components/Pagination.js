import React from 'react';

export default function Pagination({ page, totalPages, onChange }) {
  return (
    <div className="pagination">
      <button onClick={() => onChange(Math.max(1, page - 1))} disabled={page <= 1}>Previous</button>
      <span>Page {page} / {totalPages}</span>
      <button onClick={() => onChange(Math.min(totalPages, page + 1))} disabled={page >= totalPages}>Next</button>
    </div>
  );
}
