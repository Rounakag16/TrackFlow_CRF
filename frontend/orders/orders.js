const ORDER_API = 'http://localhost:3000/api/orders';
const LEAD_API = 'http://localhost:3000/api/leads';

function toggleOrderForm() {
    document.getElementById('order-form-section').classList.toggle('hidden');
    loadLeadDropdown();
}

async function loadLeadDropdown() {
    const res = await fetch(LEAD_API);
    const leads = await res.json();
    const dropdown = document.getElementById('leadDropdown');
    dropdown.innerHTML = '';
    leads.forEach(lead => {
        const option = document.createElement('option');
        option.value = lead.id;
        option.textContent = `${lead.name} (${lead.id})`;
        dropdown.appendChild(option);
    });
}

document.getElementById('orderForm').addEventListener('submit', async (e) => {
    e.preventDefault();
    const form = e.target;
    const data = Object.fromEntries(new FormData(form).entries());

    const res = await fetch(ORDER_API, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
    });
    const result = await res.json();
    if (res.ok) {
        form.reset();
        alert('Order saved!');
        loadOrdersList();
    } else {
        alert(result.error);
    }
});

async function loadOrdersList(status = '') {
    document.getElementById('order-list').classList.remove('hidden');
    document.getElementById('order-kanban').classList.add('hidden');

    const url = status ? `${ORDER_API}?status=${encodeURIComponent(status)}` : ORDER_API;
    const res = await fetch(url);
    const orders = await res.json();
    const tbody = document.getElementById('orderTableBody');
    tbody.innerHTML = '';

    orders.forEach(o => {
        const row = document.createElement('tr');
        row.innerHTML = `
      <td>${o.id}</td><td>${o.lead_id}</td><td>${o.status}</td>
      <td>${o.dispatch_date || '-'}</td><td>${o.courier || '-'}</td><td>${o.tracking_info || '-'}</td>
      <td><button onclick="editOrder(${o.id})">✏️</button></td>
    `;
        tbody.appendChild(row);
    });
}

function filterOrdersByStatus(status) {
    loadOrdersList(status);
}

async function loadOrdersKanban() {
    document.getElementById('order-list').classList.add('hidden');
    document.getElementById('order-kanban').classList.remove('hidden');

    const res = await fetch(ORDER_API);
    const orders = await res.json();
    const board = document.getElementById('orderKanbanBoard');
    board.innerHTML = '';

    const stages = ['Order Received', 'In Development', 'Ready to Dispatch', 'Dispatched'];
    stages.forEach(status => {
        const column = document.createElement('div');
        column.className = 'kanban-column';
        column.innerHTML = `<h3>${status}</h3>`;
        orders.filter(o => o.status === status).forEach(o => {
            const card = document.createElement('div');
            card.className = 'kanban-card';
            card.innerHTML = `
        <strong>Order #${o.id}</strong><br/>Lead: ${o.lead_id}<br/>${o.tracking_info || ''}`;
            column.appendChild(card);
        });
        board.appendChild(column);
    });
}

function editOrder(id) {
    window.location.href = `../edit-order/edit-order.html?id=${id}`;
}
