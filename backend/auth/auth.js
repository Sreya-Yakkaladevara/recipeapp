const jwt =require('jsonwebtoken');
const Auth = async(req,res,next) =>{
    const token = req.headers.authorization.split(" ")[1];
    jwt.verify(token, 'shhhhh', function(err, decoded) {
        req.data = decoded
        if(decoded){
            req.user=decoded
            next()
        }
        else{
            res.status(400).send("login again")
        }
});
}

module.exports={
    Auth
}