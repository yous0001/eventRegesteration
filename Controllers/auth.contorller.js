import UserModel from "../DB/models/User.model.js";
import bcrypt from "bcryptjs";
import sendmailservice from "../Services/sendVerificationEmail.js";
import jwt from "jsonwebtoken";
import { verifyEmailTemplate } from "../Services/emailTempletes.js";

export const register=async(req, res, next) => {
    try {
        const { name, email, password,phoneNumber } = req.body;
        const existingUser = await UserModel.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: 'User already exists' });
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        const usertoken=jwt.sign({email},process.env.JWT_SECRET_VERFICATION,{expiresIn:'1d'})
    
        const isEmailsent=await sendmailservice({
            to:email,
            subject:"please verify your email",
            message:verifyEmailTemplate(name,`${req.protocol}://${req.headers.host}/auth/verify-email?token=${usertoken}`),
            attachments:[]
        })

        if(!isEmailsent){
            return res.status(500).json({message:"failed to send verification email"});
        }
        const user = new UserModel({ username:name, email, password: hashedPassword ,phoneNumber});
        await user.save();
        res.status(201).json({ message: 'verification email sent successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'internal server error' });
    }
}