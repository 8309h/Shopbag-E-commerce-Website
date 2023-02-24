const mongoose = require("mongoose");

const productSchema = mongoose.Schema({
    image: String,
title:String,
discription:String,
brand:String,
price: String,
},
{
    versionKey : false
})

const ProductModel  = mongoose.model("product", productSchema)

module.exports = {
    ProductModel
}
