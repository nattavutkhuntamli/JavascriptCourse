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
/**
 * 
    Product.belongsTo(User, { constraints: true, onDelete: 'CASCADE' });: ความสัมพันธ์ของตาราง Product และ User คือ "ManyToOne" โดยแต่ละสินค้า (Product) จะเป็นของผู้ใช้งาน (User) และถูกตั้งค่าให้มี constraints และการลบแบบ "CASCADE" ซึ่งหมายถึงถ้าผู้ใช้ถูกลบแล้ว สินค้าที่เกี่ยวข้องจะถูกลบทั้งหมดด้วย.

    User.hasMany(Product);: ผู้ใช้งาน (User) สามารถมีหลายสินค้า (Product) โดยเรากำหนดความสัมพันธ์ให้ผู้ใช้สามารถมีหลายสินค้า.

    User.hasOne(Cart);: ผู้ใช้งาน (User) สามารถมีตะกร้า (Cart) ได้เพียงตะกร้าเดียว ความสัมพันธ์นี้แสดงว่าแต่ละผู้ใช้จะมีตะกร้าเดียว.

    Cart.belongsTo(User);: ตะกร้า (Cart) เป็นของผู้ใช้งาน (User) และความสัมพันธ์นี้เป็นแบบ "OneToOne" คือตะกร้าเชื่อมโยงกับผู้ใช้งานเพียงคนเดียว.

    Cart.belongsToMany(Product, { through: CartItem });: ตะกร้า (Cart) สามารถเก็บหลายสินค้า (Product) ผ่านตารางกลางที่ชื่อว่า CartItem และสร้างความสัมพันธ์ระหว่างตะกร้าและสินค้า โดยสามารถเพิ่มหรือลบสินค้าออกจากตะกร้าได้.

    Product.belongsToMany(Cart, { through: CartItem });: สินค้า (Product) สามารถถูกเพิ่มในตะกร้า (Cart) ของผู้ใช้ได้ โดยใช้ตารางกลาง CartItem เช่นกัน.

    Order.belongsTo(User): คำสั่งนี้เป็นการบอกว่าคำสั่ง (Order) เป็นของผู้ใช้งาน (User) ซึ่งหมายถึงคำสั่งจะถูกผูกกับผู้ใช้งานที่สร้างคำสั่งนั้น.

    User.hasMany(Order): ผู้ใช้งาน (User) สามารถมีหลายคำสั่ง (Order) ได้.

    Order.belongsToMany(Product, {through: OrderItem});: คำสั่ง (Order) สามารถมีหลายสินค้า (Product) ผ่านตารางกลางที่ชื่อว่า OrderItem โดยคำสั่งสามารถรวมหลายรายการสินค้าได้.

 */
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
   