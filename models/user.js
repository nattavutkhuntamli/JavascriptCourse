const mongodb = require('mongodb')
const { getDb } = require('../util/database')
class User {
    constructor(username, imageUrl, email, cart ,id ) {
        this.username = username;
        this.imageUrl = imageUrl;
        this.email = email;
        this.cart = cart; // {items: []}
        this.id = id ? mongodb.ObjectId(id) : null;
    }

    save(){
        const db = getDb()
        let dbOp ;
        if(this.id){
           //update
         dbOp = db.collection('users').updateOne({_id : this.id }, {$set:this })
        }else{
           //create
           dbOp = db.collection('users').insertOne(this)
        }
        return dbOp
        .then(rs => {
           console.log(rs);
            // return result;
        })
        .catch(err => {
            throw new Error('Error => ' , err)
           console.log(err);
        })
    }

    addToCart(product) {
      const cartProductIndex = this.cart.items.findIndex(cp => {
         return cp.productId.toString() === product._id.toString();
       });
       let newQuantity = 1;
       const updatedCartItems = [...this.cart.items];
   
       if (cartProductIndex >= 0) {
         newQuantity = this.cart.items[cartProductIndex].quantity + 1;
         updatedCartItems[cartProductIndex].quantity = newQuantity;
       } else {
         updatedCartItems.push({
           productId: new ObjectId(product._id),
           quantity: newQuantity
         });
       }
       const updatedCart = {
         items: updatedCartItems
       };
       const db = getDb();
       return db
         .collection('users')
         .updateOne(
           { _id: new ObjectId(this._id) },
           { $set: { cart: updatedCart } }
         );
    }

    //ดึงข้อมูลยูสทั้งหมด
    static fetchAll() {
       const db = getDb()
       return db.collection('users')
       .find()
       .toArray()
       .then(users => {
          return users;
       })
       .catch(err => {
         console.log(err);
         throw new Error('Error => ' ,err)
       })
    }

    //ค้นหายูส
    static findById(userId) {
       const db = getDb()
       return db.collection('users').findOne({_id:new mongodb.ObjectId(userId)})
       .then(users => {
          console.log(users);
          return users;
       })
       .catch(err => {
         throw new Error(err)
       })
    }

    //ลบ
    static deleteById(userId){
        const db=getDb();
        return db.collection('users').deleteOne({ _id: new mongodb.ObjectId(userId) })
        .then(users => {
           if(!users){
             throw new Error('DELETE PRODUCT FALSE')
           }
           return users
        }).catch(err => {
           throw new err
           console.log(err);
        })
    }
}
module.exports = User;