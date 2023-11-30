const { MongoClient } = require('mongodb');

const uri = 'mongodb+srv://harshal:harshalxyz@cluster0.q32myeh.mongodb.net/EasyShopAPI?retryWrites=true&w=majority';
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });

async function insertMenCollection() {
  try {
    await client.connect();

    const database = client.db('EasyShopAPI');
    const collection = database.collection('womenproducts');

    const menProducts = [
        {
            "Title": "PLAGG",
            "Catogory": "women's clothing",
            "Image": "https://m.media-amazon.com/images/I/61L4LBm2jZL._AC_UL320_.jpg",
            "Description": "Women Cotton Round Neck Full Sleeve Regular Fit Tshirt",
            "Price": 2199
          },
          {
            "Title": "Amazon Brand - Symbol",
            "Catogory": "women's clothing",
            "Image": "https://m.media-amazon.com/images/I/71fRSdThqxL._AC_UL320_.jpg",
            "Description": "Women T-Shirt",
            "Price": 576
          },
          {
            "Title": "The Monkey Castle",
            "Catogory": "women's clothing",
            "Image": "https://m.media-amazon.com/images/I/31M-kCxCteL._AC_UL320_.jpg",
            "Description": "T-Shirt Black Round Neck Pure Cotton for Women Regular Fit",
            "Price": 564
          },
          {
            "Title": "Amazon Brand - Symbol",
            "Catogory": "women's clothing",
            "Image": "https://m.media-amazon.com/images/I/815TSD8oPvL._AC_UL320_.jpg",
            "Description": "Women's Regular T-Shirt",
            "Price": 786
          },
          {
            "Title": "Ap'pulse",
            "Catogory": "women's clothing",
            "Image": "https://m.media-amazon.com/images/I/61eb5QQFvmL._AC_UL320_.jpg",
            "Description": "Women's Long Sleeve Thumbopen Hoodie",
            "Price": 4556
          },
          {
            "Title": "Stories.Label",
            "Catogory": "women's clothing",
            "Image": "https://m.media-amazon.com/images/I/61QDgoj4UyL._AC_UL320_.jpg",
            "Description": "Women Printed Cotton T-Shirt in Regular Fit and Half Sleeves, Casual Tops",
            "Price": 1245
          },
          {
            "Title": "Ap'pulse",
            "Catogory": "women's clothing",
            "Image": "https://m.media-amazon.com/images/I/71IWYzZfUqL._AC_UL320_.jpg",
            "Description": "Women's T-Shirt (Pack of 2)",
            "Price": 1057
          },
          {
            "Title": "PLAGG",
            "Catogory": "women's clothing",
            "Image": "https://m.media-amazon.com/images/I/61L4LBm2jZL._AC_UL320_.jpg",
            "Description": "Women Cotton Round Neck Full Sleeve Regular Fit Tshirt",
            "Price": 2145
          },
          {
            "Title": "JUNEBERRY",
            "Catogory": "women's clothing",
            "Image": "https://m.media-amazon.com/images/I/61K1AMOSdFL._AC_UL320_.jpg",
            "Description": "Cotton Regular Fit Printed Half Sleeves T-Shirt for Women",
            "Price": 1199
          },
          {
            "Title": "JUNEBERRY",
            "Catogory": "women's clothing",
            "Image": "https://m.media-amazon.com/images/I/519XEWOmXHL._AC_UL320_.jpg",
            "Description": "Women's Regular Fit T-Shirt",
            "Price": 2194
          }
    ];

    const result = await collection.insertMany(menProducts);
    console.log(`${result.insertedCount} documents inserted.`);
  } finally {
    await client.close();
  }
}

insertMenCollection();
