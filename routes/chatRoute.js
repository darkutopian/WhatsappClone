const router = require('express').Router();
const { where } = require('../models/chat');
const chat = require('../models/chat');
const verify = require('../routes/verifyToken');

router.post('/texting',verify, async(req, res) => {
    console.log("goahead")
    console.log( req.body.message,
     req.body.senderId,
        req.body.receiverId)
    const textmsg = new chat({
        message: req.body.message,
        senderId: req.body.senderId,
        receiverId: req.body.receiverId
    });
    try{
        savedchat = await textmsg.save();
        res.status(200).send(savedchat);
    }
    catch(err){
        res.status(200).send(err);
    }
});

router.get('/message', async(req, res) => {
    // const text = new chat({
    //     message: req.body.message,
    //     senderId: req.body.senderId,
    //     receiverId: req.body.receiverId
    // });
    console.log("test")
    const text = await chat.find( {$or:[{senderId: "5fd21e10cfca5c58309c4354",receiverId:"5fc4eed235f5e7aaa5b1502f"},{senderId: "5fc4eed235f5e7aaa5b1502f",receiverId:"5fd21e10cfca5c58309c4354"}]});
    res.status(200).send(text);
});




module.exports = router;