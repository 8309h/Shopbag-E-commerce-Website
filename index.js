const express = require("express")
require('dotenv').config()
const { connection } = require("./config/db")
const { userRouter } = require("./routes/User.routes")
const { productRouter } = require("./routes/Products.routes")
const {UserModel} = require("./models/User.models")
const { authonticate } = require("./middlewares/authonticate.middlewares")
const cors = require("cors")



const app = express()
app.use(express.json())
app.use(cors())

app.get("/", (req, res) => {
    res.send("Home-Page of EasyShop_the shopping hub")

})

app.get("/alluserdata", (req, res) => {

    const users = UserModel.find();
    res.send("heloo");

  //   res.status(500).send({ "msg": "Cannot get the User", "error": err.message });
  
});
app.use("/users", userRouter)
app.use("/products", productRouter)
app.use(authonticate)





app.listen(process.env.port, async () => {
    try {
        await connection
        console.log("Connected Succesfully to DB")

    } catch (err) {
        console.log("Not Connected to DB")
    }
    console.log(`Server runs at ${process.env.port}`)
})