const express = require('express');
const cors = require('cors');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

const leadRoutes = require('./routes/leads');
const orderRoutes = require('./routes/orders');
const dashboardRoutes = require('./routes/dashboard');

app.use('/api/dashboard', dashboardRoutes);
app.use('/api/leads', leadRoutes);
app.use('/api/orders', orderRoutes);

app.get('/', (req, res) => {
    res.send('TrackFlow CRM Backend running 🚀');
});

app.listen(PORT, () => {
    console.log(`✅ Server running at http://localhost:${PORT}`);
});
