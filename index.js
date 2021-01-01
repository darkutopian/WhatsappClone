const express = require('express');
const app = express();
const mongoose = require('mongoose');
const bodyparser = require('body-parser');

//import routes
const schema = require('./models/chat');
const authRoute = require('./routes/auth');
const postRoute = require('./routes/posts');
const textRoute = require('./routes/chatRoute');

//middleware
app.use(bodyparser.json());

//connect to db
mongoose.connect(
    'mongodb+srv://hadi:7dark7robot7@cluster0.qrre8.mongodb.net/<dbname>?retryWrites=true&w=majority').then(()=>{
    console.log("db connection successfulsss");
}).catch((errr)=>{
    console.log(errr);;
})

//routes
app.get('/', (req, res)  => {
        res.send('its working');
});

//route niddleware

app.use('/api/user/', authRoute);
app.use('/api/posts', postRoute);
app.use('/api/', textRoute);



//server up
app.listen(7000);