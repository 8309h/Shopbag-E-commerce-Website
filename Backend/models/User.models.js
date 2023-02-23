const mongoose = require("mongoose");

const userSchema = mongoose.Schema({
"name":{type:String,require:true},
"email":{type:String,require:true},
"pass": {type:String,require:true},
},
{
    versionKey : false
})

const UserModel  = mongoose.model("user",userSchema)

module.exports = {
    UserModel
}
