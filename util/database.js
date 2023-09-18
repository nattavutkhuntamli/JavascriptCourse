const mysql = require('mysql2');

//Config connect mysql

const pool = mysql.createPool({
    host:'localhost',
    user:'root',
    password:'',
    database:'workshop_node-complete'
});

module.exports = pool.promise();