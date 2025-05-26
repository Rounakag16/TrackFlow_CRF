const API = 'http://localhost:3000/api/leads';
const params = new URLSearchParams(window.location.search);
const leadId = params.get('id');

let originalLead = {};

async function loadLead() {
    const res = await fetch(`${API}/${leadId}`);
    originalLead = await res.json(); // store original values
    const form = document.getElementById('leadEditForm');

    for (const key in originalLead) {
        if (form[key]) {
            if (key === 'follow_up_date' && originalLead[key]) {
                // Format to YYYY-MM-DD
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

        // If value has changed, include it in the update
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
        alert('Lead updated!');
        window.location.href = '../leads/leads.html';
    } else {
        alert('Failed to update lead.');
    }
});

loadLead();
