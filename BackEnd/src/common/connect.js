var mysql = require('mysql');

var pool = mysql.createPool({
    host: 'localhost',
    user: 'root',
    password: '',
    port: '3306',
    database: 'capdb'
});
pool.query('select 1 + 1', (err, rows) => { /* */ });

module.exports = pool;