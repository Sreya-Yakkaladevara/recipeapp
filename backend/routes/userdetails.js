const express = require('express');
const userroute = express.Router();
const {usermodel} = require("../schema/user");
const bcrypt = require('bcrypt');
let jwt = require('jsonwebtoken');

/**
 * @swagger
 * tags:
 *   name: user details
 *   description : user credentials
 */

/**
 * @swagger
 * /register:
 *    post:
 *         summary: register to login
 *         tags : [user details]
 *         parameters:
 *             - name : email
 *               in : email
 *               required : true
 *             - name : password
 *               in : password
 *               required : true
 *         responses :
 *           200:
 *             description : token and data
 *             content :
 *                application/json:
 *                  schema:
 *                     type : string
 *           400 : 
 *             description: Invalid credentials
 *                  
 * 
 */

userroute.post('/register',async (req,res)=>{
    const {email,password} = req.body;
    if(!email || !password){
        res.status(400).send({error:"email and password is required"})
    }
    let user = await usermodel.findOne({email})
    if(user){
        res.status(400).send({error:"user is already exist"})
    }else{

        bcrypt.hash(password, 5,async function(err, hash) {
        const data =  usermodel({email,password:hash});
        let token = jwt.sign({ email,id:data.id }, 'shhhhh');
        await data.save()
        res.send({message:data,token})
    });
    }
   
});

/**
 * @swagger
 * /login:
 *   post:
 *      summary : login details
 *      tags : [user details]
 *      parameters:
 *          - name : email
 *            in : email 
 *            required : true
 *          - name : password 
 *            in : password
 *            required : true
 *      responses :
 *        200:
 *          description : token and data
 *          content :
 *             application/json:
 *                 schema:
 *                     type : string
 *        400 : 
 *           description: Invalid credentials
 *                  
 */

userroute.post('/login',async(req,res)=>{
     const {email,password} = req.body;
     if(!email || !password){
        res.status(400).send({error:"email and password is required"})
    }
    let user = await usermodel.findOne({email})
    if(!user){
        res.status(400).send({error:"create an account"})
    }else{
        const data = await usermodel.findOne({email})
        bcrypt.compare(password, data.password, function(err, result) {
        if(result){
        let token = jwt.sign({ email,id:data.id }, 'shhhhh');
        res.status(200).send({message:data,token})

        }
        else{
            res.status(400).send({error:"Invalid credentials"});
        }
});
    }
    
});


module.exports={
    userroute
}