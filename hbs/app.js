const express = require('express')
const app = express();
const expressHbs = require('express-handlebars');


app.use(express.urlencoded({extended:true, limit:'500mb'}))
app.use(express.json());

app.disable('x-powered-by');
app.engine('hbs', expressHbs({ defaultLayout: 'main-layout', extname: 'hbs' }));

app.set('view engine', 'hbs');
app.set('views', 'views');

const users = []
app.get('/', (req, res, next) => {
    res.render('index', {
        pageTitle: "Add User"
    });
});
app.get('/users', (req, res, next) => {
    res.render('users', { pageTitle: 'User', users: users ,hasUser:users.length > 0});
});
app.post('/add-user', (req, res, next) => {
    users.push({name:req.body.username})
    res.redirect('/users')
});

app.listen(3000, () => {
    console.log(`Run Server Success`);
})