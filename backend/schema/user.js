const  Mongoose  = require("mongoose");

const userschema =  Mongoose.Schema({
    email:{required:true,type:String},
    password:{required:true,type:String},
    
},{
    versionKey: false 
}, { timestamps: true });
const usermodel = Mongoose.model("Userdetails",userschema);

module.exports={
    usermodel
}