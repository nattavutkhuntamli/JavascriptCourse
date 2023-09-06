const fs = require('fs')

const requestHandler = (req, res) => {
    //Routing Request
    res.setHeader('Content-Type', 'text/html');
    const url = req.url; //เช็ค url path ที่ถูกส่ง
    const method = req.method; //ดึง method ว่าเป็นอะไร
    if (method === 'GET') {
        if (url === '/') {
           // หรือ 'application/json' ตามที่คุณต้องการ
            res.write('<html>')
            res.write('<head><title>Enter Message</title></head>')
            res.write('<body>')
            res.write('<h1>Welcom from  to Node.js crouse</h1>')
            res.write('</body>')
            res.write('</html>')
            res.end()
        }
        if (url === '/from') {
            res.write('<html>')
            res.write('<head><title>Enter Message</title></head>')
            res.write('<body>')
            res.write('<form action="/message" method="POST"><input type="text" name="message"><button type="submit">Send</button></form>')
            res.write('</body>')
            res.write('</html>')
            res.end()
        }
    } else if (method == 'POST') {
        if (url === '/message') {
            const body = [];
            req.on('data', (chunk) => {
                //   console.log(chunk);
                body.push(chunk)
            });
            req.on('end', () => {
                const parsedBody = Buffer.concat(body).toString();
                const message = parsedBody.split('=')[1];
                // fs.writeFileSync('message.txt', message); //สร้างไฟล์ชื่อ message.txt และใส่ข้อมูล DUMMY
                // fs.writeFileSync('message.txt', message); // ไม่ใช้
                const promisess = new Promise((resolve, reject) => {
                    setTimeout(() => {
                        fs.writeFile('message.txt', message, (err) => {
                            if (err) {
                                // console.error('เกิดข้อผิดพลาด:', err);
                                reject('บันทึกข้อมูลไม่สำเร็จ');
                            } else {
                                // console.log('บันทึกข้อมูลเรียบร้อย');
                                resolve('บันทึกข้อมูลเรียบร้อย');
                            }
                        });
                    }, 1500);
                });
                promisess.then((result) => {
                    console.log(result);
                    // ต้องเรียก res.end() ที่นี่หลังจากที่ Promise สิ้นสุด
                    res.statusCode = 302;
                    res.setHeader('Location', '/');
                    res.end();
                }).catch((error) => {
                    console.error(error);
                    // ต้องเรียก res.end() ที่นี่หลังจากที่ Promise สิ้นสุด
                    res.statusCode = 302;
                    res.setHeader('Location', '/');
                    res.end();
                })
            })
        }
    }
};

module.exports = { handler: requestHandler, somText:'Some hard coded text'}