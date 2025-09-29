const { default: mongoose } = require("mongoose");

const connectDB = async()=>{
    await mongoose.connect(process.env.url).then(()=>console.log("connected..."));
}

module.exports={
 connectDB
}