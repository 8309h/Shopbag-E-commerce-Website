const mongoose = require("mongoose");

const productSchema = mongoose.Schema({
    Title: String,
    Catogory: String,
    Image: String,
    Description: String,
    Price: Number

},
{
    versionKey : false
})

const ProductModel  = mongoose.model("product", productSchema)

module.exports = {
    ProductModel
}
