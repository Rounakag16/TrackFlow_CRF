const pool = require('../db/db');

exports.createOrder = async (req, res) => {
    try {
        const { lead_id, status, dispatch_date, courier, tracking_info } = req.body;

        const lead = await pool.query('SELECT * FROM leads WHERE id = $1', [lead_id]);
        if (lead.rows.length === 0) {
            return res.status(400).json({ error: 'Invalid lead ID' });
        }

        const result = await pool.query(
            `INSERT INTO orders (lead_id, status, dispatch_date, courier, tracking_info)
       VALUES ($1, $2, $3, $4, $5) RETURNING *`,
            [lead_id, status || 'Order Received', dispatch_date, courier, tracking_info]
        );
        res.status(201).json(result.rows[0]);
    } catch (err) {
        if (err.code === '23505') {
            res.status(400).json({ error: 'Duplicate tracking info for this lead.' });
        } else if (err.code === '23514') {
            res.status(400).json({
                error: "Invalid status value. Must be one of: 'Order Received', 'In Development', 'Ready to Dispatch', 'Dispatched'"
            });
        } else {
            res.status(500).json({ error: 'Failed to create order' });
        }
    }
};

exports.updateOrderStatus = async (req, res) => {
    try {
        const { id } = req.params;
        const { status, dispatch_date, courier, tracking_info } = req.body;

        const result = await pool.query(
            `UPDATE orders SET status = $1, dispatch_date = $2, courier = $3, tracking_info = $4
       WHERE id = $5 RETURNING *`,
            [status, dispatch_date, courier, tracking_info, id]
        );

        if (result.rows.length === 0) return res.status(404).json({ error: 'Order not found' });

        res.json(result.rows[0]);
    } catch (err) {
        if (err.code === '23514') {
            res.status(400).json({
                error: "Invalid status value. Must be one of: 'Order Received', 'In Development', 'Ready to Dispatch', 'Dispatched'"
            });
        } else {
            res.status(500).json({ error: 'Failed to update order' });
        }
    }
};

exports.getOrders = async (req, res) => {
    try {
        const { lead_id, status } = req.query;
        let query = 'SELECT * FROM orders WHERE 1=1';
        const params = [];

        if (lead_id) {
            params.push(lead_id);
            query += ` AND lead_id = $${params.length}`;
        }

        if (status) {
            params.push(status);
            query += ` AND status = $${params.length}`;
        }

        const result = await pool.query(query, params);
        res.json(result.rows);
    } catch (err) {
        res.status(500).json({ error: 'Failed to fetch orders' });
    }
};