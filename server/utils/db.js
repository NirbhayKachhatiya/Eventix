const mongoose = require('mongoose')

connectDB = async () => {
    try{
        await mongoose.connect(process.env.MONGO_URI);
        console.log("Database connnected succesfully");
    }
    catch(error){
        console.log("Error in connecting to databse : ",error);
    }
}

module.exports = connectDB