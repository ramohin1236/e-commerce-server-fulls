const express = require('express');
const dbConnection = require('./config/dbConnection');
const router = require('./routes/authRoutes');

const app = express();
const dotenv = require("dotenv").config()
const PORT = process.env.PORT || 5000;
dbConnection()
app.get('/', (req,res)=>{
    res.send('E-commerse is running')
})


app.use('/api/user', router)

app.listen(PORT, () => {
    console.log(`E-commerse site is listening on port ${PORT}`)
  })