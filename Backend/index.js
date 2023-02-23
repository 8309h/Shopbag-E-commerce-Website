const express =  require("express")
require('dotenv').config()
const { connection } =  require("./config/db")


const app = express()
app.use(express.json())

app.listen(process.env.port, async () => {
    try{
        await connection
        console.log("Connected Succesfully to DB")

    }catch(err){
        console.log("Not Connected to DB")
    }
   console.log(`Server runs at ${process.env.port}`)
})