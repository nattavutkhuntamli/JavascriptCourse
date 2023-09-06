const router = require('express').Router();
const path = require('path');
const rootDir = require('../util/path');

router.get('/', (req, res, next) => {
    // return res.send('<h1>Hello from  Express!</h1>');
    // res.sendFile('/views/shop.html');
    res.sendFile(path.join(rootDir,  'views', 'shop.html'))
});


module.exports = { RouteShop: router };