const mongoose=require("mongoose")

const Userschema=mongoose.Schema({
    name : {type:String,unique:true},
  email : {type:String,unique:true},
 gender : String,
  password : String,
age : Number,
city : String,
is_married : Boolean
},{
    versionKey:false
})

const UserModel=mongoose.model("User",Userschema)
module.exports={UserModel}
