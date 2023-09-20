const express  = require('express')
const app = express()
const path = require('path')

/**
 *  Workshop nodejs connect mysql
 *  EP11 การใช้ Understanding Sequelize
 */
// Setting template ejs
app.set('view engine','ejs')
app.set('views','views')

/**
 *  Setting express 
 */
app.use(express.urlencoded({extended:false,  limit:"500mb"})) //แปลงข้อมูลที่ถูกส่งมาในรูปแบบ url
app.use(express.json()) //แปลข้อความเป็น json
app.use(express.static(path.join(__dirname,'public'))) // set path เข้าถึง public
const PORT = process.env.PORT || 3030; //ตั้งค่า port

/**
 *  controller
 */
const errorController = require('./controllers/error');
const sequelize = require('./util/database');


/**
 *  module
 */
const Product = require('./models/product')
const User = require('./models/user')
const Cart = require('./models/cart')
const CartItem = require('./models/cart-item')
const Order = require('./models/order')
const OrderItem = require('./models/order-item')
// const db = require('./util/database');
// db.execute('SELECT * FROM `products`').then(result => {
//     console.log(result[0])
// }).catch(err => {
//     console.log(err)
// });

/**
 *  import router
 */

const adminRoutes = require('./routes/admin')
const shopRoutes = require('./routes/shop')




app.use(( req, res, next) => {
    User.findByPk(1).then(user => {
        req.user = user;
        next()
    })
    .catch(err => {
        console.error(err);
    })
})
app.use('/admin',adminRoutes)
app.use(shopRoutes)


app.use(errorController.get404);

Product.belongsTo(User, { constraints: true, onDelete: 'CASCADE' });
User.hasMany(Product);
User.hasOne(Cart);
Cart.belongsTo(User);
Cart.belongsToMany(Product, { through: CartItem });
Product.belongsToMany(Cart, { through: CartItem });
Order.belongsTo(User)
User.hasMany(Order)
Order.belongsToMany(Product,{through : OrderItem});

sequelize
.sync({ focus:false})
// .sync()
.then(rs => {
    return User.findByPk(1)
})
.then(user => {
    if(!user){
        return User.create({ name:'Max',email:'Max@gmail.com' });
    }
    return user;
})
.then(user => {
    return user.createCart();
})
.then(cart => {
    app.listen(PORT , () => { console.log(`RUN SERVER  ON PORT ${PORT}`); } )
})
.catch(err => {
    console.error(err);
});
   