const API = '/api';

async function checkHealth() {
  const statusEl = document.getElementById('status');
  try {
    const res = await fetch(`${API}/health`);
    const data = await res.json();
    statusEl.textContent = `Backend: ${data.status} | DB: ${data.db}`;
    statusEl.className = data.db === 'connected' ? 'status ok' : 'status warn';
  } catch (err) {
    statusEl.textContent = 'Backend unreachable';
    statusEl.className = 'status error';
  }
}

async function loadNotes() {
  const res = await fetch(`${API}/notes`);
  const notes = await res.json();
  const list = document.getElementById('notes-list');
  list.innerHTML = '';
  notes.forEach((note) => {
    const li = document.createElement('li');
    li.innerHTML = `
      <strong>${note.title}</strong>
      <p>${note.body || ''}</p>
      <button data-id="${note._id}">Delete</button>
    `;
    li.querySelector('button').addEventListener('click', () => deleteNote(note._id));
    list.appendChild(li);
  });
}

async function deleteNote(id) {
  await fetch(`${API}/notes/${id}`, { method: 'DELETE' });
  loadNotes();
}

document.getElementById('note-form').addEventListener('submit', async (e) => {
  e.preventDefault();
  const title = document.getElementById('title').value;
  const body = document.getElementById('body').value;
  await fetch(`${API}/notes`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ title, body }),
  });
  e.target.reset();
  loadNotes();
});

checkHealth();
loadNotes();
