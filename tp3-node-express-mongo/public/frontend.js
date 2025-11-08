async function loadTasks() {
  const res = await fetch('/api/tasks');
  const tasks = await res.json();

  const list = document.getElementById('taskList');
  list.innerHTML = '';

  tasks.forEach(task => {
    const li = document.createElement('li');
    li.className = task.done ? 'done' : '';

    li.innerHTML = `
      <span>${task.text}</span>
      <div>
        <button onclick="toggleDone('${task._id}', ${!task.done})">
          ${task.done ? '❌' : '✅'}
        </button>
        <button onclick="deleteTask('${task._id}')">🗑️</button>
      </div>
    `;
    list.appendChild(li);
  });
}

async function addTask() {
  const text = document.getElementById('taskText').value.trim();
  if (!text) return alert('Veuillez saisir une tâche');

  await fetch('/api/tasks', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ text }),
  });

  document.getElementById('taskText').value = '';
  loadTasks();
}

async function toggleDone(id, done) {
  await fetch(`/api/tasks/${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ done }),
  });
  loadTasks();
}

async function deleteTask(id) {
  if (!confirm('Supprimer cette tâche ?')) return;
  await fetch(`/api/tasks/${id}`, { method: 'DELETE' });
  loadTasks();
}

window.onload = loadTasks;
