const jwt = require("jsonwebtoken");
const auth = async (req, res, next) => {
    try{
        const token = req.cookies.token;
        if (!token)  res.status(401).json({ message: "No Token Found" });
      
        
        const user = await jwt.verify(token, process.env.JWT_SECRET, async (err, decode) => { 
          if (decode) return decode;
      
          if (err.message === "jwt expired") { 
             res.status(401).json({ message: "Token has expired" });
          }
        })
        next()
    }catch(err){
       res.status(500).json({message:err.message})
    }
        
      
}

module.exports = auth;