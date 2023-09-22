const mongodb = require('mongodb')
const { getDb } = require('../util/database')

class Product {
  constructor(title, price, description, imageUrl ,id) {
    this.title = title;
    this.price = price;
    this.description = description;
    this.imageUrl = imageUrl;
    this.id = id ? mongodb.ObjectId(id) : null;
  }

  save() {
   const db = getDb()
   let dbOp ;
   if(this.id){
      dbOp = db.collection('products').updateOne({_id : this.id }, {$set:this })
   }else{
      dbOp = db.collection('products').insertOne(this) 
    }
    return dbOp
      .then(result => {
        console.log(result);
      })
      .catch(err => {
        console.log(err);
        throw new err
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
      throw new err
    })
  }

  static findById(prodId) {
    const  db = getDb()
    return db
    .collection('products')
    .find({ _id: new mongodb.ObjectId(prodId) })
    .next()
    .then(products => {
        if(!products){
          throw new Error('Product not found')
        }
        return products;
    }).catch(err => {
      throw new err;
    })
  }

  static deleteById(prodId) {
    const db=getDb();
    return db.collection('products').deleteOne({ _id: new mongodb.ObjectId(prodId) })
    .then(product => {
       if(!product){
         throw new Error('DELETE PRODUCT FALSE')
       }
       return product
    }).catch(err => {
       throw new err
       console.log(err);
    })
  }
}


module.exports = Product