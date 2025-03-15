import UserModel from "../DB/models/User.model.js";
import bcrypt from "bcryptjs";

export const register=async(req, res, next) => {
    try {
        const { name, email, password,phoneNumber } = req.body;
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: 'User already exists' });
        }
        
        const hashedPassword = await bcrypt.hash(password, 10);
        
        const user = new UserModel({ name, email, password: hashedPassword ,phoneNumber});
        await user.save();
        res.status(201).json({ message: 'User registered successfully' });
    } catch (error) {
        res.status(500).json({ message: 'internal server error' });
    }
}