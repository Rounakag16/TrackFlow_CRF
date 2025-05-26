const pool = require('../db/db');

exports.getDashboardStats = async (req, res) => {
    try {
        const totalLeadsRes = await pool.query('SELECT COUNT(*) FROM leads');
        const leadsByStageRes = await pool.query('SELECT stage, COUNT(*) FROM leads GROUP BY stage');
        const ordersByStatusRes = await pool.query('SELECT status, COUNT(*) FROM orders GROUP BY status');

        const upcomingFollowUpsRes = await pool.query(`
      SELECT * FROM leads 
      WHERE follow_up_date BETWEEN CURRENT_DATE AND CURRENT_DATE + INTERVAL '7 days'
      ORDER BY follow_up_date ASC
    `);

        const overdueFollowUpsRes = await pool.query(`
      SELECT * FROM leads 
      WHERE follow_up_date < CURRENT_DATE
      ORDER BY follow_up_date ASC
    `);

        res.json({
            totalLeads: parseInt(totalLeadsRes.rows[0].count),
            leadsByStage: leadsByStageRes.rows,
            ordersByStatus: ordersByStatusRes.rows,
            upcomingFollowUps: upcomingFollowUpsRes.rows,
            overdueFollowUps: overdueFollowUpsRes.rows
        });
    } catch (err) {
        console.error('Dashboard Error:', err);
        res.status(500).json({ error: 'Failed to load dashboard' });
    }
};
