const express  = require('express')
const app = express()
const path = require('path')

// Setting template ejs
app.set('view engine','ejs')
app.set('views','views')

/**
 *  Setting express
 */
app.use(express.urlencoded({extended:false,  limit:"500mb"}))
app.use(express.json())
app.use(express.static(path.join(__dirname,'public')))
const PORT = process.env.PORT || 3030;

/**
 *  controller
 */
const errorController = require('./controllers/error');

/**
 *  import router
 */

const adminRoutes = require('./routes/admin')
const shopRoutes = require('./routes/shop')
app.use('/admin',adminRoutes)
app.use(shopRoutes)


app.use(errorController.get404);

app.listen(PORT,() => { console.log(`Server run is http://localhost:${PORT}`); })