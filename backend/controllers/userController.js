import { User } from "../models/userModel.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
// ----------For register------------------
export const register = async (req, res) => {
    try {
        const { fullName, username, password, confirmPassword, gender } = req.body;
        if (!fullName || !username || !password || !confirmPassword || !gender) {
            return res.status(400).json({ message: "All fields are required" });
        }
        if (password !== confirmPassword) {
            return res.status(400).json({ message: "Password do not match" });
        }

        const user = await User.findOne({ username });
        if (user) {
            return res.status(400).json({ message: "Username already exit try different" });
        }
        const hashedPassword = await bcrypt.hash(password, 10);

        // profilePhoto
        const maleProfilePhoto = `https://api.dicebear.com/9.x/adventurer/svg?seed=${username}&gender=male`;

        const femaleProfilePhoto = `https://api.dicebear.com/9.x/adventurer/svg?seed=${username}&gender=female`;

        await User.create({
            fullName,
            username,
            password: hashedPassword,
            profilePhoto: gender === "male" ? maleProfilePhoto : femaleProfilePhoto,
            gender
        });
        return res.status(201).json({
            message: "Account created successfully.",
            success: true
        })
    } catch (error) {
        console.log(error);
    }
};
// -----------------For login---------------------
export const login = async (req, res) => {
    try {
        const { username, password } = req.body;
        if (!username || !password) {
            return res.status(400).json({ message: "All fields are required" });
        };
        const user = await User.findOne({ username });
        if (!user) {
            return res.status(400).json({
                message: "Incorrect username or password",
                success: false
            })
        };
        const isPasswordMatch = await bcrypt.compare(password, user.password);
        if (!isPasswordMatch) {
            return res.status(400).json({
                message: "Incorrect username or password",
                success: false
            })
        };
        const tokenData = {
            userId: user._id
        };

        const token = await jwt.sign(tokenData, process.env.JWT_SECRET_KEY, { expiresIn: '1d' });

        return res.status(200).cookie("token", token, { maxAge: 1 * 24 * 60 * 60 * 1000, httpOnly: true, sameSite: 'strict' }).json({
            _id: user._id,
            username: user.username,
            fullName: user.fullName,
            profilePhoto: user.profilePhoto
        });

    } catch (error) {
        console.log(error);
    }
};
    // -----------------for logout-------------------
export const logout = (req, res) => {
    try {
        return res.status(200).cookie("token", "", { maxAge: 0 }).json({
            message: "logged out successfully."
        })
    } catch (error) {
        console.log(error);
    }
};
// -----------------for getting other users-------------------
export const getOtherUsers = async (req, res) => {
    try {
        const loggedInUserId = req.id;
        const otherUsers = await User.find({ _id: { $ne: loggedInUserId } }).select("-password"); //ne = not equal to 
        return res.status(200).json(otherUsers);
    } catch (error) {
        console.log(error);
    }
};