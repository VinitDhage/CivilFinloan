const mongoose = require("mongoose");

const membersSchema = mongoose.Schema({
    mobile:{
        type:Number,
        required:[true,"Member must have mobile Number."],
    },
    email:{
        type:String,
        required:[true,"Member must have email."],
    },
    occupation:{
        type:String,
        required:[true,"Member must have occupation."],
    },
    createpassword:{
        type:String,
        required:[true,"Member must have password."],
    }
}
);

module.exports = mongoose.model("members",membersSchema);