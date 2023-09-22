const User = require('../models/user')

exports.getUser = (req,res,next) =>{
   User.fetchAll()
   .then(users => {
      res.render('users/users',{
        pageTitle:"User",
        path:'/user/users',
        users:users
      })
   })
}

exports.getAddUser = (req, res ,next) => {
    res.render('users/edit-user',{
        pageTitle:"Add User",
        path:'/user/add-users',
        editing: false
    })
}

exports.getEditUser = (req, res , next) => {
  const id= req.params.userId;
  User.findById(id)
  .then(users => {
    res.render('users/edit-user',{
      pageTitle:"Edit User",
      path:'/user/edit-users',
      editing:true,
      users:users
    })
  })
  .catch(err => {
    console.log(err);
  })
}

exports.PostAddUser = (req,res,next) => {
  const username = req.body.username;
  const ImageUrl = req.body.imageUrl;
  const email = req.body.email;
  const users  = new User(username,ImageUrl,email)
  users.save()
  .then(rs => {
    res.redirect('/user')
  })
  .catch(err => {
    console.log(err);
  })
}

exports.postEditUser = (req, res, next) => {
  console.log(req.body);
  const updatedusername = req.body.username;
  const updatedImageUrl = req.body.imageUrl;
  const updatedemail = req.body.email;
  const userId = req.body.userId;
  User.findById(userId)
  .then(rs => {
    const users = new User(updatedusername, updatedImageUrl, updatedemail, userId)
    users.save()
    .then(user => {
       res.redirect('/user')
    })
    .catch(err => {
       console.log(err);
    })
  })
  .catch(err => {
     console.log(err);
  })  
}

exports.postDeleteUser = (req, res, next) => {
  const UserId = req.body.UserId;
  User.findById(UserId)
  .then(product => {
    User.deleteById(UserId)
     .then(rs => {
      res.redirect('/user')
     })
     .catch(err => {
       console.log(err);
     })
  }).catch(err => {
     console.log(err);
  })
};