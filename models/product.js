const { getDb } = require('../util/database')

class Product {
  constructor(title, price, description, imageUrl) {
    this.title = title,
    this.price = price,
    this.description = description,
    this.imageUrl = imageUrl
  }

  save() {
   const db = getDb()
   return db.collection('products').insertOne(this)
    .then(result => {
      //  console.log(result);
      console.log('INSERT SUCCESS');
    })
    .catch(err => {
      console.log(err);
      throw err
    })
  }

  static fetchAll() {
   const db = getDb()

    return db
    .collection('products').find()
    .toArray()
    .then(products => {
      console.log(products);
      return products
    })
    .catch(err =>{
      console.log(err);
      throw err
    })
  }

  static findById() {
    
  }
}


module.exports = Product