const router = require('express').Router();
const path = require('path');
const rootDir = require('../util/path');
// /admin/add-product
router.get('/add-product', (req, res, next) => {
    res.sendFile(path.join(rootDir,'views','add-product.html'))
});
// /admin/add-product
router.post('/add-product', (req, res, next) => {
    // return res.send(`<h1>${req.body.title}</h1>`);
    console.log(req.body);
    return res.redirect('/');
})

module.exports = { RouteAdmin: router };