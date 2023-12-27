const {default: mongoose} = require('mongoose');

const dbConnection =()=>{
  try{
   const connection = mongoose.connect(process.env.MONGODB_URL)
    console.log("dbConnection successfully connected")
  
  }
  catch(error){
   console.log("Data baase error");
  }
}


module.exports = dbConnection;