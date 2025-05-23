const express = require('express');
const cors = require('cors');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

const leadRoutes = require('./routes/leads');
app.use('/api/leads', leadRoutes);

app.get('/', (req, res) => {
    res.send('TrackFlow CRM Backend - Lead Management API');
});

app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
});
