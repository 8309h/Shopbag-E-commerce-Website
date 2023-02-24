const express = require("express");
const {ProductModel} = require("../models/Post.model")

const productRouter = express.Router()

productRouter.get("/", async (req,res) => {
    try{
       const products = await ProductModel.find()
       res.send(products)

    }catch(err){
        res.send({"msg":"Coanot get products"})
    }
    

    
})
productRouter.post("/create", async (req,res) => {
    const payload = req.body
    try{
        const prdt  = new ProductModel(payload)
     await prdt.save()
     res.send({"msg":"product Register on site"})
   
    }catch(err){
        res.send({"msg":"NOt able to add","error":err.message})
    }
    
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
module.exports = {
    productRouter
}