const express =  require("express")
const {UserModel} = require("../models/User.models")
const jwt = require("jsonwebtoken")
const bcrypt = require("bcrypt")

const userRouter = express.Router();

// userRouter.post("/register", async (req, res) => {
//     const { name, email, pass } = req.body
//     try {
//         bcrypt.hash(pass, 5, async (err, hash) => {
//             if (err) {
//                 res.send({ "msg": "Something went wrong", "error": err.message })
//             } else {
//                 const user = new UserModel({ name, email, pass: hash })
//                 await user.save();
//                 res.send({ "msg": " New User register" })

//             }
//             // Store hash in your password Data Base.
//         });

//     } catch (err) {
//         res.send({ "msg": "Something went wrong", "error": err.message })
//         console.log(err)
//     }
// })
// userRouter.post("/login", async (req, res) => {
//     const { email,pass } = (req.body)
//     try {
//         const user = await UserModel.find({ email })
//         console.log(user)
//         if (user.length > 0) {
//             bcrypt.compare(pass, user[0].pass, (err, result) => {
//                 if (result) {

//                    const token = jwt.sign({userID:user[0]._id}, 'masai');
//                     res.send({ "msg": "Login sucess", "token": token })

//                 } else {
//                     res.send("Wrong Credentilas")
//                 }
//                 // result == true
//             });

//         } else {
//             res.send("Credentilas not found")
//         }
//     }
//     catch (err) {

//         res.send({ "msg": "Somethung went wrong", "error": err.message })
//         console.log(err)

//     }
// })


// module.exports = {
//     userRouter
// }


userRouter.post("/register",async(req,res)=>{
    const { name,email,password,city} = req.body;
   // console.log(email)

  const findemail = await UserModel.find({"email":email})
 // console.log(findemail.length)
   if(findemail.length > 0){
      res.send({"msg":"User already exist please login"})
     
   }else{
      
       try {
          bcrypt.hash(password,5, async(err,hash)=>{
             if(err){
                res.send({"msg":"something gone wrong",err:err.message})
             }else{
                const user= new UserModel({name,email,password:hash,city})
                console.log(user)
                await user.save()
                res.send({"msg":"User registerd suceesfully"})
               
             }
          })
       } catch (err) {
            console.log(err)
            res.send({"msg":"somthing went wrong",error:err.message})
       }
   
  }
})
userRouter.post("/login",async(req,res)=>{
            const{email,password}=req.body
           // console.log(email,password)
     try {
        const user =await UserModel.find({email})
            //console.log(user)
         if(user.length>0){
            bcrypt.compare(password,user[0].password,(err,result)=>{

                 if(result){
                    let token= jwt.sign({userID:user[0]._id},"masai")
                    res.send({"msg":"User Successfully Logged in","token":token})
                    localStorage.setItem("loginuser",user)
                 }else{
                     res.send("Wrong Credentials")
                 }
            })
         }
     } catch (error) {


      
        
        res.send({"msg":"something went wrong",error:error.message})
     }


})


module.exports = {
     userRouter
    }
