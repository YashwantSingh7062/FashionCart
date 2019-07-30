const jwt = require('jsonwebtoken');

module.exports = (req,res,next) => {
    try{
        let token = req.headers.authorization.split(" ")[1];
        let decodedValue = jwt.verify(token,process.env.SECRET_KEY);
        req.user = decodedValue;
        next();
    }
    catch(error){
        return res.status(401).json({
            message : "Access Denied"
        })
    }
}