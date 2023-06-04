var mysql = require('mysql');

var pool = mysql.createPool({
    host: 'sql312.infinityfree.com',
    user: 'if0_34353692',
    password: '92AbmuNpAWyYqxQ',
    database: 'if0_34353692_caps_project'
});
pool.query('select 1 + 1', (err, rows) => { /* */ });

module.exports = pool;