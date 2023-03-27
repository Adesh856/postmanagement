const { query } = require("express")
const express=require("express")
const postsRouter=express.Router()
const {postsModel}=require("../model/posts.model")
postsRouter.post("/add",async(req,res)=>{
    try {
        const posts=new postsModel(req.body)
        await posts.save()
        res.status(200).send({"msg":"Posts has been added "}) 
    } catch (error) {
        res.status(400).send({"msg":error.message})
    }
})
postsRouter.get("/",async(req,res)=>{
    let{page,limit,id,mincomments,maxcomments}=req.query
    mincomments=+mincomments;maxcomments=+maxcomments
    const {userid}=req.body
    console.log(req.query)
    try {
        console.log(userid)
        const Page=+page||1
        const perpage=+(limit)||3
        const skip=(Page-1)*perpage
        const Limit=perpage
        if(id){
       const posts=await postsModel.find({_id:id,userid:req.body.userid}).skip(skip).limit(Limit) 
       res.status(200).send(posts)
        }else if(mincomments&&maxcomments){
        const posts=await postsModel.find(
            {$and:[{no_of_comments:{$lte:maxcomments,$te:mincomments}},{userid:req.body.userid}]}
            ).skip(skip).limit(Limit) 
        res.status(200).send(posts)
        }else{
            const posts =  await postsModel.find(req.query).skip(skip).limit(Limit) 
            res.status(200).send(posts)
        }
    } catch (error) {
        res.status(400).send({"msg":error.message})
    }
})

postsRouter.get("/top",async (req,res)=>{
    let{page,limit}=req.query
    try {
        const Page=+page||1
        const perpage=+(limit)||3
        const skip=(Page-1)*perpage
        const Limit=perpage
        const posts =  await postsModel.aggregate([{
            $project:{
                _id:1,
                title:1,
                body:1,
                no_of_comments:{$size:$no_of_comments}
            }
        },{
            $sort:{no_of_comments:-1}
        },{
            $limit:1
        }
        ]).skip(skip).limit(Limit) 
        res.status(200).send(posts)
    } catch (error) {
        res.status(400).send({"msg":error.message})
    }
})
postsRouter.patch("/update/:id",async(req,res)=>{
    const {id}=req.params
    
    try {
        await postsModel.findByIdAndUpdate({_id:id,userid:req.body.userid},req.body)
        res.status(200).send({"msg":"User has been updated"})
    } catch (error) {
        res.status(400).send({"msg":error.message})
    }
})
postsRouter.delete("/delete/:id",async(req,res)=>{
    const {id}=req.params
    try {
        await postsModel.findByIdAndDelete({_id:id,userid:req.body.userid}) 
        res.status(200).send({"msg":"User has been updated"})
    } catch (error) {
        res.status(400).send({"msg":error.message})
    }
})

module.exports={postsRouter}

