// functionality for admin 

const bcrypt = require('bcrypt')
const  jwt = require('jsonwebtoken')
const User = require('../models/admin')
require('dotenv').config()

const registerController =async (req, res) => {
    console.log("called")

    // getting user name and password from user 
    const {email, password} = req.body;
    try{
        // check for existing user 

        const existingUser = await User.findOne({email});
        console.log(existingUser)
        if (existingUser){
            return res.status(400).json({message:'email already exists'})

        }
            // hash the password
            const hashedPassword =  await bcrypt.hash(password, 10)
            // now create a new user 
            const newUser = new User({
                email: email,
                password: hashedPassword, 
                
             })

        await newUser.save();
        // now create the token 
        const token = jwt.sign({ id: newUser._id ,email: newUser.email}, process.env.JWT_SECRET, { expiresIn: '1h' });
        res.status(200).json({ token, User_id: newUser._id, email: newUser.email });

    }
    catch(error){
        console.error("Error during registration:", error);
        res.status(500).json({ message: 'Internal server error' });

    }
    
}

const longinController =  async (req, res)=>{
    const {email, password} = req.body;
   
    try{
        const user = await User.findOne({email});
        // console.log(user.password)

        if (!user){
            return res.status(404).json({message: "invalid email of password"})
        }

        // now check if the password matches
        const ismatch = await bcrypt.compare(password, user.password);
        console.log("is match ", ismatch)
        if (!ismatch){
            return res.status(400).json({messsage: "Invalid Credentials"})
        }
        // creating  token 
        const token = jwt.sign({id : user._id,email: user.email}, process.env.JWT_SECRET, {expiresIn:"1h"})
        res.status(200).json({token, userId: user._id, email: user.email})

    }
    catch(eror){
        console.error("Error during login:", error);
        res.status(500).json({ message: 'Internal server error' });
    }

}


module.exports= {
    registerController,
    longinController

}