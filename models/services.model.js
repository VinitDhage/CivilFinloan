const mongoose = require("mongoose");

const servicesSchema = mongoose.Schema({
    type:{
        type:String,
        required:[true,"Service must have type."],
    },
    code:{
        type:String,
        required:[true,"Service must have code."],
    },
    description:{
        type:String,
        required:[true,"Service must have description."],
    },
    imgUrl:{
        type:String,
        required:[true,"Service must have image."],
    },
    detail:{
        type:Array,
        required:[true,"Service must have detail."],
    }
}
);

module.exports = mongoose.model("services",servicesSchema);