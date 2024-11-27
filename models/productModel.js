const { type } = require('express/lib/response');

const mongoose = require('mongoose');

productSchema = mongoose.Schema({
        name:{
            type:String,
            required:[true,"Please enter a name"]
        },
        quantity:{
            type:Number,
            required:true,
            default:0
        },
        price:{
            type:Number,
            required:[true,"Price is required"],
        },
        image:{
            type:String,
            required:false
        }
    },{

        timestamp:true
    }
)

const Product = mongoose.model('Product',productSchema);

module.exports = Product;