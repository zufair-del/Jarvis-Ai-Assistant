import User from "../models/user.model.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import {generateToken} from "./token.js";


/*
 * - User Registration
 * - POST Request
 * - /api/auth/register
*/

const UserControllerRegister = async (req,res)=>{
    try{

        const {name , email , password} = req.body;

        const isUser = await User.findOne({email});
        
        if(isUser){
            return res.status(400).json({
                success: false,
                message: "User already exists"
            })
        }

        const hashedPassword = await bcrypt.hash(password , 10);
        
        const user = await User.create({
            name , email , password: hashedPassword
        })

        return res.status(201).json({
            success: true,
            message: "User registered successfully",
            user
        })

    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Internal server error"
        })
    }
}

/**
 * - User Login
 * - POST Request
 * - /api/auth/login
*/

const UserControllerLogin = async (req,res)=>{
    try {
        const {email , password} = req.body;

        const user = await User.findOne({email});

        if(!user){
            return res.status(400).json({
                success: false,
                message: "User not found"
            })
        }

        const isPasswordMatch = await bcrypt.compare(password , user.password);

        if(!isPasswordMatch){
            return res.status(400).json({
                success: false,
                message: "Invalid password"
            })
        }

        const token = generateToken(user);

        res.cookie("token" , token , {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: "strict",
            maxAge: 7 * 24 * 60 * 60 * 1000
        })

        return res.status(200).json({
            success: true,
            message: "User logged in successfully",
            user,
            token
        })  

    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Internal server error"
        })
    }
}


/**
 * - User Logout
 * - POST Request
 * - /api/auth/logout
*/


const UserControllerLogout = async (req,res)=>{
    try {
        res.clearCookie("token");
        return res.status(200).json({
            success: true,
            message: "User logged out successfully"
        })
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Internal server error"
        })
    }
}

export default {

    UserControllerRegister,
    UserControllerLogin,
    UserControllerLogout

}