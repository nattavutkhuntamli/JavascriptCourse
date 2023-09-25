const Product = require('../models/product');
exports.getAddProduct = (req, res, next) => {
  res.render('admin/edit-product', {
    pageTitle: 'Add Product',
    path: '/admin/add-product',
    editing: false
  });
};

exports.postAddProduct = (req, res, next) => {
  const title = req.body.title;
  const imageUrl = req.body.imageUrl;
  const price = req.body.price;
  const description = req.body.description;
  const product = new Product(title, price, description, imageUrl , null ,req.user.id);
  product.save()
  .then(result => {
    res.redirect('/admin/products')
  })
  .catch(err => {
    throw err
  });
  
};

exports.getEditProduct = (req, res, next) => {
  console.log(req.params);
  console.log(req.query);
  const editMode = req.query.edit;
  if (!editMode) {
    return res.redirect('/');
  }
  const prodId = req.params.productId;
  Product.findById(prodId)
  .then(product => {
    res.render('admin/edit-product', {
      pageTitle: 'Edit Product',
      path: '/admin/edit-product',
      editing: editMode,
      product: product
    });
  }).catch(err => {
    console.log(err);
    throw err
  })
};

exports.postEditProduct = (req, res, next) => {
  const prodId = req.body.productId;
  const updatedTitle = req.body.title;
  const updatedPrice = req.body.price;
  const updatedImageUrl = req.body.imageUrl;
  const updatedDesc = req.body.description;

  Product.findById(prodId)
  .then(productData => {
      const product =  new Product( 
        updatedTitle,
        updatedPrice,
        updatedDesc,
        updatedImageUrl,
        prodId
      )
      product.save()
      .then(rs => {
        console.log(`Update Success!`);
        res.redirect('/admin/products')
      }).catch(err => {
         console.log(`Update fasle`);
         console.log(err);
      })
  }).catch(err => {
    console.log(err);
  })
};

exports.getProducts = (req, res, next) => {
  Product.fetchAll()
  .then(products =>{
    res.render('admin/products', {
          prods: products,
          pageTitle: 'Admin Products',
          path: '/admin/products'
    });
  }).catch(err => {
     console.log(err);
  })
};

exports.postDeleteProduct = (req, res, next) => {
  const prodId = req.body.productId;
  Product.deleteById(prodId)
    .then(() => {
      console.log('DESTROYED PRODUCT');
      res.redirect('/admin/products');
    })
    .catch(err => console.log(err));
};
