const mongoose = require("mongoose");

const MenProductSchema = new mongoose.Schema({
    Title: { type: String, required: true },
    Category: String, // Adjusted spelling to match the provided data
    Image: { type: String, required: true },
    Description: { type: String, required: true },
    Price: { type: Number, required: true },
});

const WomenProductSchema = new mongoose.Schema({
  Title: { type: String, required: true },
  Catogory: String, // Make sure Catogory is spelled correctly
  Image: { type: String, required: true },
  Description: { type: String, required: true },
  Price: { type: Number, required: true },
  // Add other fields specific to women's products
});

const MenProductModel = mongoose.model("MenProduct", MenProductSchema);
const WomenProductModel = mongoose.model("WomenProduct", WomenProductSchema);

module.exports = {
  MenProductModel,
  WomenProductModel,
};
