const express = require("express");
const { MenProductModel, WomenProductModel } = require("../models/Post.model");

const productRouter = express.Router();

productRouter.post("/create", async (req, res) => {
  const payload = req.body;

  try {
    const category = payload.Catogory ? payload.Catogory.toLowerCase() : null;

    if (!category || (category !== "men's clothing" && category !== "women's clothing")) {
      return res.status(400).json({ msg: "Invalid category" });
    }

    let product;

    if (category === "men's clothing") {
      product = new MenProductModel({
        Title: payload.Title,
        Image: payload.Image,
        Description: payload.Description,
        Price: payload.Price,
        // Add other fields specific to men's products
      });
    } else {
      product = new WomenProductModel({
        Title: payload.Title,
        Image: payload.Image,
        Description: payload.Description,
        Price: payload.Price,
        // Add other fields specific to women's products
      });
    }

    await product.save();

    res.json({ msg: "Product registered on site", product });
  } catch (err) {
    res.status(500).json({ msg: "Not able to add", error: err.message });
  }
});

productRouter.get("/allmenproducts", async (req, res) => {
    try {
      const menProducts = await MenProductModel.find();
      res.json(menProducts);
    } catch (err) {
      console.error(err);
      res.status(500).json({ msg: "Error fetching men's products" });
    }
  });
  productRouter.get("/allwomenproducts", async (req, res) => {
    try {
      const womenProducts = await WomenProductModel.find();
      res.json(womenProducts);
    } catch (err) {
      console.error(err);
      res.status(500).json({ msg: "Error fetching women's products" });
    }
  });

productRouter.patch("/update/:id", async (req, res) => {
  const productId = req.params.id;

  try {
    const category = req.body.Catogory ? req.body.Catogory.toLowerCase() : null;

    let updatedProduct;

    if (category === "men's clothing") {
      updatedProduct = await MenProductModel.findByIdAndUpdate(
        { _id: productId },
        { $set: req.body },
        { new: true }
      );
    } else if (category === "women's clothing") {
      updatedProduct = await WomenProductModel.findByIdAndUpdate(
        { _id: productId },
        { $set: req.body },
        { new: true }
      );
    } else {
      return res.status(400).json({ msg: "Invalid category" });
    }

    res.json({ msg: "Product updated successfully", product: updatedProduct });
  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: "Error updating product" });
  }
});

productRouter.delete("/delete/:id", async (req, res) => {
  const productId = req.params.id;

  try {
    const category = req.body.Catogory ? req.body.Catogory.toLowerCase() : null;

    let deletedProduct;

    if (category === "men's clothing") {
      deletedProduct = await MenProductModel.findByIdAndDelete(productId);
    } else if (category === "women's clothing") {
      deletedProduct = await WomenProductModel.findByIdAndDelete(productId);
    } else {
      return res.status(400).json({ msg: "Invalid category" });
    }

    if (deletedProduct) {
      res.json({ msg: "Product deleted successfully", product: deletedProduct });
    } else {
      res.status(404).json({ msg: "Product not found" });
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: "Error deleting product" });
  }
});

module.exports = {
  productRouter
};
