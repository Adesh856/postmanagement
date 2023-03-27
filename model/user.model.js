const mongoose=require("mongoose")

const Userschema=mongoose.Schema({
    name : {type:String,unique:true},
  email : {type:String,unique:true},
 gender : String,
  password : {type:String,unique:true},
age : {type:Number,unique:true},
city : {type:String,unique:true},
is_married : Boolean
},{
    versionKey:false
})

const UserModel=mongoose.model("User",Userschema)
module.exports={UserModel}
