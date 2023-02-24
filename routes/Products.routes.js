const express = require("express");
const {ProductModel} = require("../models/Post.model")

const productRouter = express.Router()

productRouter.get("/", async (req,res) => {
    let query = res.query

    const products = await ProductModel.find(query)
    res.send(products)
})
productRouter.post("/create", async (req,res) => {
    const payload = req.body
    const note  = new ProductModel(payload)
     await note.save()
     res.send("product Created")
   
})
// productRouter.patch("/update/:id", async (req,res) => {
//     const noteID = req.params.id
//     await ProductModel.findByIdAndUpdate({_id:noteID})
//     res.send({"msg":"Note with id has been updated"})
// })

// productRouter.delete("/delete/:id", async (req,res) => {
//     const noteID = req.params.id
//     await ProductModel.findByIdAndDelete({_id:noteID})
//     res.send({"msg":`Note with id  ${noteID} has been delted`})
// })
// module.exports = {
//     productRouter
// }