const Sequelize = require('sequelize')

const sequelize = require('../util/database')

// โครงสร้างฐานข้อมูลแบบ sequelize
const Product = sequelize.define('product', {
    id:{
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    title: Sequelize.STRING,
    price:{
        type: Sequelize.DOUBLE,
        allowNull: false
    },
    imageUrl: {
        type: Sequelize.STRING,
        allowNull: false
    },
    description: {
        type: Sequelize.TEXT,
        allowNull: false
    },
    userId: {
        type: Sequelize.INTEGER,
        allowNull : false
    }
});

module.exports = Product