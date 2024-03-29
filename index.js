const express = require('express');
const app = express();
const dotenv = require("dotenv").config()
const cors = require('cors')
const dbConnection = require('./config/dbConnection');
const router = require('./routes/authRoutes');
const productRouter = require('./routes/productRoute')
const uploadRoute = require('./routes/uploadRoute')
const blogRouter = require('./routes/blogRoutes')
const categoryRouter = require('./routes/categoryRoute')
const blogCategory = require('./routes/blogCatRoutes')
const brand = require('./routes/brandRoutes.js')
const coupon = require('./routes/couponRoutes.js')
const colorRouter = require("./routes/colorRoute");
const enqRouter = require("./routes/enqRoute.js");
const bodyParser = require('body-parser');
const { whenNotFound, errorHandlerr, } = require('./middlewears/erroHandler.js');
const cookieParser = require('cookie-parser')
const morgan = require('morgan')




const PORT = process.env.PORT || 5000;

dbConnection() 
app.use(morgan("dev"))
app.use(cors())
app.use(bodyParser.json())
app.use(cookieParser())
app.use(bodyParser.urlencoded({extended:false}))
app.use(express.json())



app.get('/', (req,res)=>{
    res.send('E-commerse is running')
})

 app.use('/api/user', router)
 app.use('/api/products', productRouter)
 app.use('/api/blog', blogRouter)
 app.use('/api/category', categoryRouter)
 app.use('/api/blog-category', blogCategory)
 app.use('/api/brand', brand)
 app.use('/api/coupon', coupon)
 app.use("/api/color", colorRouter);
 app.use("/api/enquiry", enqRouter);
 app.use("/api/upload", uploadRoute);



// // middleware
app.use(whenNotFound)
app.use(errorHandlerr)

 app.listen(PORT, () => {
    console.log(`E-commerse site is listening on port ${PORT}`)
  })