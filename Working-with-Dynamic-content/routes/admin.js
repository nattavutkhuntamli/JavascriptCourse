const router = require('express').Router();
const path = require('path');
const rootDir = require('../util/path');
const products = [];

// /admin/add-product
router.get('/add-product', (req, res, next) => {
    res.sendFile(path.join(rootDir, 'views', 'add-product.html'))
});
// /admin/add-product
router.post('/add-product', (req, res, next) => {
    // return res.send(`<h1>${req.body.title}</h1>`);
    // console.log(req.body);
    products.push({title:req.body.title})
    return res.redirect('/');
})

module.exports = { 
    RouteAdmin: router,
    products: products
};