const API = 'http://localhost:3000/api/dashboard';

async function renderFollowUpCalendar(events) {
    const calendarEl = document.getElementById('calendar');
    const calendar = new FullCalendar.Calendar(calendarEl, {
        initialView: 'dayGridMonth',
        height: 500,
        headerToolbar: {
            left: 'title',
            center: '',
            right: 'prev,next today'
        },
        events: events.map(lead => ({
            title: `${lead.name} (${lead.stage})`,
            start: lead.follow_up_date,
            allDay: true
        }))
    });
    calendar.render();
}

async function loadDashboard() {
    try {
        const res = await fetch(API);
        const data = await res.json();

        if (res.ok) {
            // Metrics
            const metrics = document.getElementById('metrics');
            metrics.innerHTML = `
    <p><strong>Total Leads:</strong> ${data.totalLeads}</p>
    <p><strong>Leads by Stage:</strong></p>
    <ul>${data.leadsByStage.map(s => `<li>${s.stage}: ${s.count}</li>`).join('')}</ul>
    <p><strong>Orders by Status:</strong></p>
    <ul>${data.ordersByStatus.map(s => `<li>${s.status}: ${s.count}</li>`).join('')}</ul>
  `;
            // Upcoming Follow-ups
            const upcomingList = document.getElementById('upcoming');
            upcomingList.innerHTML = data.upcomingFollowUps.length
                ? data.upcomingFollowUps.map(l =>
                    `<li>${l.name} (${l.stage}) - ${new Date(l.follow_up_date).toLocaleDateString()}</li>`).join('')
                : '<li>✅ No follow-ups due this week</li>';

            // Overdue Follow-ups
            const overdueList = document.getElementById('overdue');
            overdueList.innerHTML = data.overdueFollowUps.length
                ? data.overdueFollowUps.map(l =>
                    `<li style="color:red;">${l.name} (${l.stage}) - ${new Date(l.follow_up_date).toLocaleDateString()}</li>`).join('')
                : '<li>✅ No overdue follow-ups</li>';

            renderFollowUpCalendar([
                ...data.upcomingFollowUps,
                ...data.overdueFollowUps
            ]);
        }
    } catch (err) {
        console.error('Dashboard Error:', err);
    }
}

loadDashboard();
