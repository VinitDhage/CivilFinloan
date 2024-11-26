const mongoose = require("mongoose");

const requestsSchema = mongoose.Schema({
    mobile:{
        type:Number,
        required:[true,"Request must have mobile Number."],
    },
    email:{
        type:String,
        required:[true,"Request must have email."],
    },
    amt:{
        type:Number,
        required:[true,"Request must have amount."],
    },
    type:{
        type:String,
        required:[true,"Request must have type."],
    },
    msg:{
        type:String,
        required:[true,"Request must have message."],
    },
    code:{
        type:String,
        required:[true,"Request must have code."],
    }
}
);

module.exports = mongoose.model("requests",requestsSchema);