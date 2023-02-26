const express =  require("express")
const {UserModel} = require("../models/User.models")
const jwt = require("jsonwebtoken")
const bcrypt = require("bcrypt")

const userRouter = express.Router();


userRouter.post("/register", async (req, res) => {
    const { name, email, password,city } = req.body
    const findemail = await UserModel.find({"email":email})

   if(findemail.length > 0){
      res.send({"msg":"User already exist please login"})
     
   }else{
    try {
        bcrypt.hash(password, 5, async (err, hash) => {
            if (err) {
                res.send({ "msg": "Something went wring", "error": err.message })
            } else {
                const user = new UserModel({ name, email, password: hash,city})
                await user.save();
                res.send({ "msg": " New User register" })

            }
            // Store hash in your password Data Base.
        });

    } catch (err) {
        res.send({ "msg": "Something went wrong", "error": err.message })
        console.log(err)
    }
}

})
userRouter.post("/login", async (req, res) => {
    const { email,password } = (req.body)
    try {
        const user = await UserModel.find({ email })
        console.log(user)
        if (user.length > 0) {
            bcrypt.compare(password, user[0].password, (err, result) => {
                if (result) {

                   const token = jwt.sign({userID:user[0]._id}, 'masai');
                    res.send({ "msg": "Login sucess", "token": token })

                } else {
                    res.send({"msg":"Wrong Credentilas"})
                }
            
            });

        } else {
            res.send({"msg":"Credentilas not found"})
        }
    }
    catch (err) {

        res.send({ "msg": "Something went wrong", "error": err.message })
        console.log(err)

    }
})


module.exports = {
    userRouter
}


