const jwt=require("jsonwebtoken")

const auth=(req,res,next)=>{
    const token=req.headers.authorization.split(" ")[1]
    if(token){
        jwt.verify(token, 'Postapp', function(err, decoded) {
            if(decoded){
                console.log
                req.body.userid=decoded.userid
                next()
            }
            else{
          res.status(400).send({"msg":"Inavlid password"})
            }
          })
        }else{
            res.status(400).send({"msg":"Inavlid password"})
        }
        
    }

module.exports={auth}