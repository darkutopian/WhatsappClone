const authRouter = require('express').Router();
const User = require('../models/User');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const verify = require('./verifyToken');


authRouter.post('/register', async (req, res) => {
   let email=req.body.email
   let password=req.body.password
   let user = await User.find({email: email})
   console.log(user);
   if(user.length){
    res.status(403).send('That email exists,Try a new email');
   }
   else{
        //hash the pasword
         const salt = await bcrypt.genSalt(10);
         const hashedPassword = await bcrypt.hash(req.body.password, salt);
         
         //create new user
       const newuser=new User({
           email:email,
           password:hashedPassword
       });
    const saveUser = await newuser.save();

    res.status(200).send(saveUser);
   }
    
});

//login
authRouter.post('/login', async(req, res) => {
    let email=req.body.email

    //checking if email exists
    const user = await User.find({email:email});
    console.log(user)
    if(user.length==0) return res.status(403).send('email is wrong');

    let password=req.body.password
    // console.log(user[0].email)
    //check is if password is correct
    const validPass = await bcrypt.compare(password, user[0].password);
    if(!validPass) return res.status(403).send('invalid password');

    //create and assign a token
    const token = jwt.sign({_id: user._id}, 'secret');
    res.status(200).send({"authenticated":true,"token":token,"user":{"userid":user[0]._id,"email":user[0].email}});
    // print({"authenticated":true,"token":token,"user":{"userid":user._id,"email":user.email}})/
    // res.header('auth-token', token).send(token);


    // res.send('logged in');

});

authRouter.get('/getusers',async(req, res) => {
    const users = await User.find();
    res.status(200).send(users);

});



module.exports = authRouter;