const { redirect } = require('express/lib/response');
const Product = require('../models/product');
const db =require('../util/database')

/**
 *  findById() เป็นฟังชันใน Sequelize ใช้ในการค้นหาข้อมูล โดยใช้ค่า ID แต่จะถูกเลิกใช้แล้ว
 *  findByPk()  แทน findById ซึ่งมีการใช้งานที่คล้ายกันกับ findById() และใช้ค่า Primary Key (PK) เพื่อค้นหาข้อมูลแถวเดียวในตารางข้อมูลเช่นกัน
 * 
 */
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
  req.user.createProduct({
    title: title,
    price: price,
    imageUrl:imageUrl,
    description:description
  }).then(result => {
    res.redirect('/admin/products');
  }).catch(err => {
    console.log(err)
  })
  
};

exports.getEditProduct = (req, res, next) => {

  const editMode = req.query.edit;
  if (!editMode) {
    return res.redirect('/admin/add-product');
  }
  const prodId = req.params.productId;
  req.user.getProducts({where: {id:prodId}})
  .then(products => {
    const product = products[0];

    if(!product) {
      return res.redirect('/admin/add-product');
    }
    res.render('admin/edit-product', {
          pageTitle: 'Edit Product',
          path: '/admin/edit-product',
          editing: editMode,
          product: product
    });

  })
  .catch(err => {
    console.error(`เกิดข้อผิดพลาดในการค้นหาข้อมูล ${error}`)
  })

};

exports.postEditProduct = (req, res, next) => {
  const prodId = req.body.productId;
  const updatedTitle = req.body.title;
  const updatedPrice = req.body.price;
  const updatedImageUrl = req.body.imageUrl;
  const updatedDesc = req.body.description;
    Product.findByPk(prodId)
    .then(product => {
        product.title = updatedTitle;
        product.price = updatedPrice;
        product.imageUrl = updatedImageUrl;
        product.description = updatedDesc;
        return product.save();
    })
    .then((result) => {
      console.log('UPDATED PRODUCT!');
      res.redirect('/admin/products');
    })
    .catch(err => {
      console.error('เกิดข้อผิดพลาดในการอัพเดทข้อมูล', error);
    })
};

exports.getProducts = (req, res, next) => {
  req.user.getProducts()
  .then(products => {
    res.render('admin/products', {
      prods: products,
      pageTitle: 'Admin Products',
      path: '/admin/products'
    });
  })
  .catch(err => {
    console.log(err)
  })
};

exports.postDeleteProduct = (req, res, next) => {
  const prodId = req.body.productId;
  // ลบแแบที่ 1
  // Product.destroy({where: {id:prodId}})
  // .then((result) => {
  //   res.redirect('/admin/products');
  // }).catch(error => {
  //   console.error('เกิดข้อผิดพลาดในการลบข้อมูล' , error)
  // })

  Product.findByPk(prodId)
  .then(product => {
     return product.destroy()
  })
  .then(result => {
    console.log('DELETE SUCCESS');
    res.redirect('/admin/products');
  })
  .catch(err => {
    console.error('เกิดข้อผิดพลาดในการลบข้อมูล' , error)
  })
};
