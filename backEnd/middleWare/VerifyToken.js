import jwt from "jsonwebtoken";
export const verifyToken = (req,res,next)=>{

    let token = req.headers.authorization;

  
        token = token.slice(6,token.length).trimLeft();
    

        console.log(token,'hehehe')
     

    if(!token) return res.status(401).send({auth: false, message:'No token provided'});

    jwt.verify(token, process.env.SecretKey, (err,user)=>{
        if(err) return res.status(401).send({auth: false, message:'Token is not vaild'});
        
        req.user= user;
        
        next();
        
    })

}