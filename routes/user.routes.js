const express=require("express")
const userRouter=express.Router()
const {UserModel}=require("../model/user.model")
const bcrypt=require("bcrypt")
const jwt=require("jsonwebtoken")

//Registration route
userRouter.post("/register",async(req,res)=>{
    const {name,email,gender,password,age,city,is_married}=req.body
   try {
    bcrypt.hash(password, 5, async function(err, hash) {
        if(hash){
        const user=new UserModel({
            name,email,gender,password:hash,age,city,is_married
        })
        await user.save()
        res.status(200).send({"msg":"User has been added"})
    }
        // Store hash in your password DB.
    })
   } catch (error) {
    res.status(400).send({"msg":error.message})
   }
})

///Login route
userRouter.post("/login",async(req,res)=>{
    const{email,password}=req.body
    try {
        const user=await UserModel.findOne({email})
        if(user){
        bcrypt.compare(password, user.password, function(err, result) {
            if(result){
                console.log(user._id)
                res.status(200).send({"msg":"Login Successfully","token":jwt.sign({ userid: user._id }, 'Postapp')})
            }
        });
    } else{
        res.status(400).send({"msg":"Invalid Credentials"})
    }
    } catch (error) {
        res.status(400).send({"msg":error.message})
    }
})

module.exports={userRouter}