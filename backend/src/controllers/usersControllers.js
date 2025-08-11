import User from "../models/user.js";
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'

export const register = async(req,res)=>{
    try {
        const {name,email,password,role,phone,address} = req.body;

        const existingUser = await User.findOne({email});
        if(existingUser){
            return res.status(400).json({message:"Email already registered"});
        }
        const hashedPassword = await bcrypt.hash(password,10);

        const user = new User({
            name,
            email,
            password:hashedPassword,
            role:role || "user",
            phone,
            address,
        });

        await user.save();

        const token = jwt.sign(
            {userId: user._id, role:user.role},
            process.env.JWT_SECRET,
            {expiresIn:"3h"}
        );
        res.status(201).json({
            message:"User registered successfully",
            token,
            user: {
                id:user._id,
                name:user.name,
                email:user.email,
                role:user.role,
            },
        });
    } catch (error) {
        console.error("Registration error: ",error);
        res.status(500).json({message:"Server error during registration"});
    }
}

export const login = async (req,res)=>{
    try {
        const{email,password}=req.body;

        const user = await User.findOne({email});
        if(!user){
            return res.status(401).json({message:"Invalid email or password"});
        }

        const isMatch = await bcrypt.compare(password,user.password);
        if(!isMatch){
            return res.status(401).json({message:"Invalid email or password"});
        }

        const token = jwt.sign({
            userId:user.id, role:user.role},
            process.env.JWT_SECRET,
            {expiresIn:"3h"}
        );

        res.status(200).json({
            message:"Login successfull",
            token,
            user:{
                id:user._id,
                name:user.name,
                email:user.email,
                role:user.role,
            },
        })
    } catch (error) {
        console.error("Login Error: ",error);
        res.status(500).json({message:"Server error during login"});
    }
} 

export const deleteUser = async(req,res)=>{
    try {
        const deletedUser = await User.findByIdAndDelete(req.params.id);
        if(!deletedUser){
            return res.status(404).json({message:"User not found"});
        }
        res.status(200).json({message:"User deleted successfully"})
    } catch (error) {
        console.error("Error in deleting user controller",error);
        res.status(500).json({message:"Server error during user deletion."})
    }
}