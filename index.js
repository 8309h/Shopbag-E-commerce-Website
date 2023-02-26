const express =  require("express")
require('dotenv').config()
const { connection } = require("./config/db")
const { userRouter } = require("./routes/User.routes")
const { productRouter } = require("./routes/Products.routes")
const {UserModel} = require("./models/User.models")



const {authonticate} =require("./middlewares/authonticate.middlewares")
const cors = require("cors")



const app = express()
app.use(express.json())

app.use(cors())

app.get("/",(req,res) => {
    res.send("Home-Page of ShopBag")
    
})


app.get("/usersdata",async(req,res) => {
    let query = req.query
    console.log(query)
    try{
        const users = await UserModel.find(query)
       res.send(users)
  
    }catch(err){ 
        res.send({"msg":"cannot get the User","error":err.message})
      
    }
   
    
})

app.use("/users",userRouter)
app.use("/products",productRouter)
app.use(authonticate)


app.listen(process.env.port, async () => {
    try{
        await connection
        console.log("Connected Succesfully to DB")

    }catch(err){
        console.log("Not Connected to DB")
    }
   console.log(`Server runs at ${process.env.port}`)
})