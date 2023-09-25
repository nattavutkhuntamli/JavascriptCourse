const mongodb = require('mongodb')
const { getDb } = require('../util/database')
class User {
    constructor(username, imageUrl, email, id, cart) {
        this.username = username;
        this.imageUrl = imageUrl;
        this.email = email;
        this.id = id ? mongodb.ObjectId(id) : null;
        this.cart = cart; // {items: []}
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
      // const cartProduct= this.cart.items.findIndex(cp => {
      //    return cp._id === product._id
      // });
      const updatedcart = {items:[{...product,quantity:1}]};
      const db = getDb();
      return db
      .collection('users')
      .insertOne(
         {_id: this.id},
         {$set:{cart:updatedcart}}
      )
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