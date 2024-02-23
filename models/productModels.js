// !mdbg 
const mongoose = require('mongoose'); // Erase if already required

// Declare the Schema of the Mongo model
var productSchema = new mongoose.Schema({
    title:{
        type: String,
         required:true,
         trim: true
    },
    slug:{
        type:String,
        required:true,
        unique: true,
        lowercase: true
    },
    description:{
        type:String,
        required:true,
        
    },
    price:{
        type: Number,
        required:true,
    },
    category:{ 
        type: String,
        required: true
    },
    brand: { 
        type: String,
        required: true
    },
    quantity:{
        type: Number,
        required: true,

    },
    sold: {
        type: Number,
        default: 0,
        required: true,
        // select: false 
    },
    images: [{
 
        public_id: String,
        url: String

    }],
    color: [],
    tags: {
        type: String,
        default: "",
        required: true,
        // select: false 
    },
    ratings: [{
        star: Number,
        comment: String,
        posteby: {type: mongoose.Schema.Types.ObjectId, ref: "User"}
    }],
    totalrating: {
        type: String,
        default: 0
    }

},
{
    timestamps: true
}
);

//Export the model
module.exports = mongoose.model('Product', productSchema);