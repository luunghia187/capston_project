var mysql = require('mysql');

var pool = mysql.createPool({
    host: 'sql12.freesqldatabase.com',
    user: 'sql12620705',
    password: 'hY6H25PJjn',
    database: 'sql12620705'
});
pool.query('select 1 + 1', (err, rows) => { /* */ });

module.exports = pool;