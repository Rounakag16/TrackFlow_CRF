const ORDER_API = 'https://trackflow-crf.onrender.com/api/orders';
const params = new URLSearchParams(window.location.search);
const orderId = params.get('id');

let originalOrder = {};

async function loadOrder() {
    const res = await fetch(`${ORDER_API}?id=${orderId}`);
    const orders = await res.json();
    originalOrder = orders[0];

    const form = document.getElementById('orderEditForm');
    for (const key in originalOrder) {
        if (form[key]) {
            if (key === 'dispatch_date' && originalOrder[key]) {
                const date = new Date(originalOrder[key]);
                form[key].value = date.toISOString().split('T')[0];
            } else {
                form[key].value = originalOrder[key] || '';
            }
        }
    }
}

document.getElementById('orderEditForm').addEventListener('submit', async (e) => {
    e.preventDefault();
    const form = e.target;
    const data = Object.fromEntries(new FormData(form).entries());

    const res = await fetch(`${ORDER_API}/${orderId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
    });

    if (res.ok) {
        alert('Order updated!');
        window.location.href = '../orders/orders.html';
    } else {
        const result = await res.json();
        alert(result.error || 'Failed to update order.');
    }
});

loadOrder();
