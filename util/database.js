// const mysql = require('mysql2');

// //Config connect mysql

// const pool = mysql.createPool({
//     host:'localhost',
//     user:'root',
//     password:'',
//     database:'workshop_node-complete'
// });

// module.exports = pool.promise();


// การใช้ sequelize

const Sequelize = require('sequelize');
// Option 3: Passing parameters separately (other dialects)
const sequelize = new Sequelize('workshop_node-complete','root','', {
    host:'localhost',
    dialect:'mysql',
});
module.exports = sequelize;