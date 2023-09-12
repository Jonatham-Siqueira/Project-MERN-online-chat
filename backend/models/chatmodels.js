const mongoose = require('mongoose');

const chatModels = mongoose.Schema(
    {
        chatName:{String,trim:true},
        IsGroupChat:{type:Boolean,default:false},
        Users: [{
            type:mongoose.Schema.Types.ObjectId,
            ref: "User"
        },
    ],
    latestMessage:{
        type:mongoose.Schema.Types.ObjectId,
ref:"message"
    },
GroupAdmin: {
     type:mongoose.Schema.Types.ObjectId,
    ref: "User"
}
    }
    ,{
        timestamps: true,
    }
)


const chat = mongoose.model("chat", chatModel);

module.exports = chat;
