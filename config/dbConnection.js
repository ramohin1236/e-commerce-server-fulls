const {default: mongoose} = require('mongoose');

const dbConnection =()=>{
  try{
    const connection = mongoose.connect(process.env.DB_URL)
    console.log("dbConnection successfully connected")
  }
  catch(error){
   console.log("DAta baase error");
  }
}


module.exports = dbConnection;