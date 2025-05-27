const API = 'https://trackflow-crf.onrender.com/api/leads';
const params = new URLSearchParams(window.location.search);
const leadId = params.get('id');

let originalLead = {};

async function loadLead() {
    const res = await fetch(`${API}/${leadId}`);
    originalLead = await res.json();
    const form = document.getElementById('leadEditForm');

    for (const key in originalLead) {
        if (form[key]) {
            if (key === 'follow_up_date' && originalLead[key]) {
                const date = new Date(originalLead[key]);
                form[key].value = date.toISOString().split('T')[0];
            } else {
                form[key].value = originalLead[key] || '';
            }
        }
    }
}


document.getElementById('leadEditForm').addEventListener('submit', async (e) => {
    e.preventDefault();
    const form = e.target;
    const inputs = form.querySelectorAll('input, textarea, select');
    const updatedData = {};

    inputs.forEach(input => {
        const name = input.name;
        const newValue = input.value.trim();
        const originalValue = (originalLead[name] || '').toString().trim();
        if (newValue !== originalValue) {
            updatedData[name] = newValue;
        }
    });

    if (Object.keys(updatedData).length === 0) {
        alert('No changes made.');
        return;
    }

    const res = await fetch(`${API}/${leadId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(updatedData)
    });

    if (res.ok) {
        document.getElementById('formMessage').style.color = 'green';
        document.getElementById('formMessage').textContent = 'Lead edited successfully!';
        setTimeout(() => {
            window.location.href = '../leads/leads.html';
        }, 1000);
    } else {
        document.getElementById('formMessage').style.color = 'red';
        document.getElementById('formMessage').textContent = result.error || 'Error occurred.';
    }
});

loadLead();
