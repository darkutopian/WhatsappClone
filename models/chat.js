const mongoose = require('mongoose');
let Schema = mongoose.Schema
const Chat = mongoose.Schema({
    message: {
        type: String,
        required: true
    },
    senderId: {
        type: Schema.Types.ObjectId, 
        ref: 'User',
        required: true 
    },
    receiverId: {
        type: Schema.Types.ObjectId, 
        ref: 'User' ,
        required: true
    }

});

module.exports = mongoose.model('chat', Chat);