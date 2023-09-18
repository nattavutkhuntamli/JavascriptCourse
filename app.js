const express  = require('express')
const app = express()
const path = require('path')

/**
 *  Workshop nodejs connect mysql
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
app.use('/admin',adminRoutes)
app.use(shopRoutes)


app.use(errorController.get404);

app.listen(PORT,() => { console.log(`Server run is http://localhost:${PORT}`); })