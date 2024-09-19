const mysql = require('mysql2/promise');

const pool = mysql.createPool({
    host: "localhost",
    user: "root",
    password: "aluno",
    database: "cadastrodb",
});

module.exports = pool;