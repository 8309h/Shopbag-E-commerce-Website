const express =  require("express")
const {UserModel} = require("../models/User.models")
const jwt = require("jsonwebtoken")
const bcrypt = require("bcrypt")

const userRouter = express.Router();

  userRouter.post("/register", async (req, res) => {
    const { name, email,password,address} = req.body
    const findemail = await UserModel.find({"email":email})

   if(findemail.length > 0){
      res.send({"msg":"User already exist please login"})
     
   }else{
    try {
        bcrypt.hash(password, 5, async (err, hash) => {
            if (err) {
                res.send({ "msg": "Something went wring", "error": err.message })
            } else {
                const user = new UserModel({ name, email, password: hash,address})
                await user.save();
                res.send({ "msg": "New User register" })

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
        const user = await UserModel.find({email})
        console.log(user)
        if (user.length > 0) {
            bcrypt.compare(password, user[0].password, (err, result) => {
                if (result) {

                   const token = jwt.sign({userID:user[0]._id}, 'masai');
                    res.send({ "msg": "Login sucess", "token": token })

                } else {
                    res.send({"msg":"Incorrect password"})
                }
            
            });

        } else {
            res.send({"msg":" Email not found"})
        }
    }
    catch (err) {

        res.send({ "msg": "Something went wrong", "error": err.message })
        console.log(err)

    }
})
userRouter.put("/updateprofile", async (req, res) => {
    const { userID, name, email, password, address } = req.body;
  
    try {
      // Check if the user exists
      const user = await UserModel.findById(userID);
  
      if (!user) {
        return res.status(404).send({ "msg": "User not found" });
      }
  
      // Update user data
      user.name = name || user.name;
      user.email = email || user.email;
      user.city = address || user.address;
  
      if (password) {
       
        bcrypt.hash(password, 5, async (err, hash) => {
          if (err) {
            return res.status(500).send({ "msg": "Something went wrong", "error": err.message });
          }
          user.password = hash;
          await user.save();
          return res.send({ "msg": "User profile updated successfully" });
        });
      } else {
        // If no password provided, save without updating the password
        await user.save();
        return res.send({ "msg": "User profile updated successfully" });
      }
    } catch (err) {
      return res.status(500).send({ "msg": "Something went wrong", "error": err.message });
    }
  });
  
  // implementation of logout route

  userRouter.post("/refresh-token", async (req, res) => {
    const { refreshToken } = req.body;
  
  
    const newToken = jwt.sign({ userID: "someUserID" }, 'masai', { expiresIn: '1h' });
  
    res.send({ "token": newToken });
  });
  
  
  userRouter.post("/logout", async (req, res) => {
    const { token } = req.body;
  
    try {
    
      const isTokenBlacklisted = await BlacklistTokenModel.exists({ token });
  
      if (isTokenBlacklisted) {
        return res.status(401).send({ "msg": "Token is already blacklisted" });
      }
  
      // Blacklist the token
      await new BlacklistTokenModel({ token }).save();
      res.send({ "msg": "Logout successful" });
    } catch (err) {
      console.error(err);
      res.status(500).send({ "msg": "Something went wrong" });
    }
  });

module.exports = {
    userRouter
}


