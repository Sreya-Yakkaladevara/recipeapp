const { default: mongoose } = require("mongoose");
const  Mongoose  = require("mongoose");

const recipeschema =  Mongoose.Schema({
    title:{required:true,type:String},
    instructions:{required:true,type:String},
    ingredients:{required:true,type:String},
    time:{type:Number},
    file : {type:String},
    createdBy:{type:mongoose.Schema.Types.ObjectId,ref:"data"},
    user:{type:mongoose.Schema.Types.String,ref:"data"}
},{
    versionKey: false 
}, { timestamps: true });
const recipemodel = Mongoose.model("Recipe",recipeschema);

module.exports={
    recipemodel
}