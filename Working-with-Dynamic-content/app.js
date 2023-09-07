const express = require('express');
const app = express();
const port = process.env.port || 3000;
const path = require('path')
const expressHbs = require('express-handlebars')
/**
 *  template  ejs pug  handlebars
 *  ejs <p><%= name %></p>
 *  pug p #{name}
 *  handlebars {{name}}
 */
/** ตั้งค่า settimeplate เป็น pug */
// app.set('view engine','pug') //อันนี้ของ pug
// app.set('views', 'views');

// การ set template ของ hbs หรือ handlebars
// app.engine('hbs',expressHbs({
//     layoutsDir:'views/layouts/',
//     defaultLayout:'main-layout',
//     extname: 'hbs'
// })); //อันนี้ของ handlebars
// app.set('view engine','hbs');
// app.set('views', 'views');

// การ settemplate ของ ejs
app.set('view engine','ejs')
app.set('views','views')

// const bodyParser = require('body-parser');
/**
 *  ใช้สำหรับการประมวลผลข้อมูลแบบ URL-encoded โดยเปิดใช้งานการแปลงข้อมูลที่ซับซ้อนและกำหนดขีดจำกัดขนาดไฟล์ที่ส่งเข้ามาที่ 500MB.
 */

app.use(express.urlencoded({ extended: true, limit: '500MB' }));

/**
 * ใช้สำหรับการแปลงข้อมูล JSON.
 */
app.use(express.json());
/**
 *  bodyParser ใช้สำหรับประมวลข้อมูลแบบ URL-encoded แต่ปัจจุบันไม่ใช้แล้วเพราะ 
 * Express ตั้งแต่ version 4.16 สามารถใช้ app.use(express.urlencoded())
 * ได้แล้ว
 */
// app.use(bodyParser.urlencoded());

/**
 * : ปิดการใช้งานฮีดเดอร์ "X-Powered-By" เพื่อเพิ่มความปลอดภัยของแอปพลิเคชัน.
 */
app.disable("x-powered-by");
/**
 * ตั้งค่า path ให้อ่าน public
 */
app.use(express.static(path.join(__dirname, 'public')))

/**
 *  import router
 */
const adminRoute = require('./routes/admin').RouteAdmin;
const shopRoute = require('./routes/shop').RouteShop;

app.use('/admin',adminRoute);
app.use(shopRoute);

app.use((req, res, next) => {
//    return res.status(404).send('<h1>404 Page not found</h1>');
    // res.status(404).sendFile(path.join(__dirname,'./','views','404.html'));
    res.status(404).render('404',{pageTitle:"404 Page Not Found"})
})


/**
 *  การทำ middleware ดัก
 */
// app.use('/', (req, res, next) => {
//     console.log('this always run!');
//     next();
// })
app.listen(port, () => {
    console.log(`Server is Start on http://localhost:${port}`);
});
