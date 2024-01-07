

const whenNotFound = (req,res,next)=>{
    console.log(req)
   const error = new Error(`Not Found: ${req. originalUrl}`)
   res.status(404)
   next(error)
}

const errorHandlerr =(err,req,res,next)=>{
    const statusCode = res.statusCode == 200? 500 : res.statusCode;
    res.status(statusCode)
    res.json({
        message: err?.message,
        stack: err?.stack
    })
}
module.exports={errorHandlerr,whenNotFound}