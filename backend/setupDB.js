const fs = require('fs');
const pool = require('./db/db');

const schema = fs.readFileSync(__dirname + '/db/schema.sql', 'utf8');
pool.query(schema)
    .then(() => {
        console.log('Database schema initialized.');
        process.exit();
    })
    .catch(err => {
        console.error('Failed to initialize schema:', err);
        process.exit(1);
    });
