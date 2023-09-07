const router = require('express').Router();
const path = require('path');
const rootDir = require('../util/path');

const adminData = require('./admin')

router.get('/', (req, res, next) => {
    // return res.send('<h1>Hello from  Express!</h1>');
    // res.sendFile('/views/shop.html');
    // console.log('shop.js',adminData.products);
    // res.sendFile(path.join(rootDir,  'views', 'shop.html'))
    const products = adminData.products;
    console.log(products);
    res.render('shop', {
        prods: products,
        pageTitle: 'Shop',
        path: "/",
        hasProducts: products.length > 0,
        activeShop:true,
        productCSS:true
    })
});


module.exports = { RouteShop: router };