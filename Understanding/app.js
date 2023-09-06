const http = require('http');
const routes = require('./routes')

//สร้าง server
const server = http.createServer(routes.handler);
server.listen(3000); //กำหนด port ใน server เป็น 3000