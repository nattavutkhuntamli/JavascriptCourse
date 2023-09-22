const User   = require('../controllers/user')
const router = require('express').Router() 

router.get('/',User.getUser);

router.get('/users',User.getUser);

router.get('/add-users',User.getAddUser);

router.post('/add-users',User.PostAddUser);

router.get('/edit-user/:userId',User.getEditUser)

router.post('/edit-user',User.postEditUser);

router.post('/delete-user',User.postDeleteUser)

module.exports = router;