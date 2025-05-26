const pool = require('../db/db');

exports.createLead = async (req, res) => {
    try {
        const { name, contact, company, product_interest, stage, follow_up_date, notes } = req.body;
        const result = await pool.query(
            `INSERT INTO leads (name, contact, company, product_interest, stage, follow_up_date, notes)
       VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING *`,
            [name, contact, company, product_interest, stage, follow_up_date, notes]
        );
        res.status(201).json(result.rows[0]);
    } catch (err) {
        if (err.code === '23505') {
            res.status(400).json({ error: 'Lead with this contact already exists.' });
        } else if (err.code === '23514') {
            res.status(400).json({ error: 'Invalid stage value.' });
        } else {
            res.status(500).json({ error: 'Failed to create lead' });
        }
    }
};

exports.updateLeadStage = async (req, res) => {
    try {
        const { id } = req.params;
        const { stage } = req.body;
        const result = await pool.query(
            `UPDATE leads SET stage = $1 WHERE id = $2 RETURNING *`,
            [stage, id]
        );
        if (result.rows.length === 0) return res.status(404).json({ error: 'Lead not found' });
        res.json(result.rows[0]);
    } catch (err) {
        if (err.code === '23514') {
            res.status(400).json({ error: 'Invalid stage value.' });
        } else {
            res.status(500).json({ error: 'Failed to update lead stage' });
        }
    }
};

exports.getLeads = async (req, res) => {
    try {
        const { stage, follow_up_date } = req.query;
        let query = 'SELECT * FROM leads WHERE 1=1';
        const params = [];

        if (stage) {
            params.push(stage);
            query += ` AND stage = $${params.length}`;
        }

        if (follow_up_date) {
            params.push(follow_up_date);
            query += ` AND follow_up_date = $${params.length}`;
        }

        const result = await pool.query(query, params);
        res.json(result.rows);
    } catch (err) {
        res.status(500).json({ error: 'Failed to retrieve leads' });
    }
};

exports.getLeadById = async (req, res) => {
    try {
        const { id } = req.params;
        const result = await pool.query('SELECT * FROM leads WHERE id = $1', [id]);
        if (result.rows.length === 0) return res.status(404).json({ error: 'Lead not found' });
        res.json(result.rows[0]);
    } catch (err) {
        res.status(500).json({ error: 'Failed to fetch lead' });
    }
};

exports.updateLead = async (req, res) => {
    try {
        const { id } = req.params;
        const fields = req.body;

        if (Object.keys(fields).length === 0) {
            return res.status(400).json({ error: 'No fields provided for update' });
        }

        // Build SET clause dynamically
        const setClause = Object.keys(fields)
            .map((key, index) => `${key} = $${index + 1}`)
            .join(', ');

        const values = Object.values(fields);

        const result = await pool.query(
            `UPDATE leads SET ${setClause} WHERE id = $${values.length + 1} RETURNING *`,
            [...values, id]
        );

        if (result.rows.length === 0) return res.status(404).json({ error: 'Lead not found' });

        res.json(result.rows[0]);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Failed to update lead' });
    }
};
