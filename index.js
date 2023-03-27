const express=require("express")
const app=express()
require("dotenv").config()
const {connection}=require("./db")
const {userRouter}=require("./routes/user.routes.js")
const {postsRouter}=require("./routes/posts.routes")
const {auth}=require("./middleware/auth.middleware")
const cors=require("cors")
app.use(cors())
app.use(express.json())




app.use("/users",userRouter)
app.use(auth)
app.use("/posts",postsRouter)


app.listen(process.env.port,async()=>{
    try {
        await connection
        console.log("Server is connected with mongodb")
    } catch (error) {
        console.log("Server is not connected with mongodb")
    }
    console.log(`Server is connected at ${process.env.port} port`)
})

