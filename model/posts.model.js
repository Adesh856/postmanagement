const mongoose=require("mongoose");
const postsschema=mongoose.Schema
({
    title: String,
 body : String,
 device: String, 
 no_of_comments : Number,
 userid:String
},{
    versionKey:false
})

const postsModel=mongoose.model("posts",postsschema)


module.exports={postsModel}