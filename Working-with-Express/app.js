const express = require('express');
const app = express();
const port = process.env.port || 3000;
const path = require('path')
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
 *  import router
 */
const adminRoute = require('./routes/admin').RouteAdmin;
const shopRoute = require('./routes/shop').RouteShop;

app.use('/admin',adminRoute);
app.use(shopRoute);

app.use((req, res, next) => {
//    return res.status(404).send('<h1>404 Page not found</h1>');
    res.status(404).sendFile(path.join(__dirname,'./','views','404.html'));
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
