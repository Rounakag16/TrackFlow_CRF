const API = 'http://localhost:3000/api/leads';

function toggleForm() {
    hideAllSections();
    document.getElementById('add-lead').classList.toggle('hidden');
}

function toggleView(view) {
    hideAllSections();
    if (view === 'list') {
        document.getElementById('list-view').classList.remove('hidden');
        loadLeadsTable();
    } else if (view === 'kanban') {
        document.getElementById('kanban-view').classList.remove('hidden');
        loadLeadsKanban();
    }
}

function hideAllSections() {
    document.getElementById('add-lead').classList.add('hidden');
    document.getElementById('list-view').classList.add('hidden');
    document.getElementById('kanban-view').classList.add('hidden');
}

//Submit Form
document.getElementById('leadForm').addEventListener('submit', async (e) => {
    e.preventDefault();
    const form = e.target;
    const data = Object.fromEntries(new FormData(form).entries());

    // Basic validation
    if (!data.name || !data.contact || !data.stage) {
        document.getElementById('formMessage').textContent = "Please fill all required fields.";
        return;
    }

    try {
        const res = await fetch(API, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data)
        });
        const result = await res.json();
        if (res.ok) {
            form.reset();
            document.getElementById('formMessage').style.color = 'green';
            document.getElementById('formMessage').textContent = 'Lead added successfully!';
        } else {
            document.getElementById('formMessage').style.color = 'red';
            document.getElementById('formMessage').textContent = result.error || 'Error occurred.';
        }
    } catch (err) {
        document.getElementById('formMessage').textContent = 'Server error.';
    }
});


async function loadLeadsTable(stage = '') {
    const url = stage ? `${API}?stage=${encodeURIComponent(stage)}` : API;
    const res = await fetch(url);
    const leads = await res.json();
    const tbody = document.getElementById('leadTableBody');
    tbody.innerHTML = '';

    leads.forEach(lead => {
        const row = document.createElement('tr');
        row.innerHTML = `
      <td>${lead.name}</td>
      <td>${lead.contact}</td>
      <td>${lead.company || '-'}</td>
      <td>${lead.stage}</td>
      <td>${lead.follow_up_date || '-'}</td>
      <td>${new Date(lead.created_at).toLocaleDateString()}</td>
      <td><button onclick="editLead(${lead.id})">✏️</button></td>
    `;
        tbody.appendChild(row);
    });
}

function filterLeadsByStage(stage) {
    loadLeadsTable(stage);
}

async function loadLeadsKanban() {
    const res = await fetch(API);
    const leads = await res.json();
    const board = document.getElementById('kanbanBoard');
    board.innerHTML = '';

    const stages = ['New', 'Contacted', 'Qualified', 'Proposal', 'Won', 'Lost'];
    stages.forEach(stage => {
        const column = document.createElement('div');
        column.className = 'kanban-column';
        column.innerHTML = `<h3>${stage}</h3>`;
        leads.filter(l => l.stage === stage).forEach(lead => {
            const card = document.createElement('div');
            card.className = 'kanban-card';
            card.innerHTML = `<strong>${lead.name}</strong><br/>${lead.company || ''}`;
            column.appendChild(card);
        });
        board.appendChild(column);
    });
}

function editLead(id) {
    window.location.href = `../edit-lead/edit-lead.html?id=${id}`;
}
