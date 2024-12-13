import jwt from 'jsonwebtoken';
import User from "../Models/user.model.js";

export const createUser = async (req, res) => {
    const { name, email, password } = req.body;

    try {
        if (!name || !email || !password) {
            return res.status(400).json({ error: "All fields are required." });
        }

        const isUser = await User.findOne({ email });
        if (isUser) {
            return res.status(400).json({ error: "User already exists." });
        }

        const user = new User({ name, email, password });
        await user.save();

        const token = jwt.sign({ user }, process.env.ACCESS_TOKEN_SECRET, { expiresIn: "1d" });

        return res.status(200).json({ user, token, message: "User created successfully." });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Internal server error." });
    }
};

export const loginUser = async (req, res) => {
    const { email, password } = req.body;

    try {
        if (!email || !password) {
            return res.status(400).json({ error: "All fields are required." });
        }

        const Isuser = await User.findOne({ email });
        if (!Isuser) {
            return res.status(404).json({ error: "User does not exist." });
        }

        if (Isuser.password !== password) {
            return res.status(401).json({ error: "Incorrect password." });
        }

        const user = { id: Isuser._id, name: Isuser.name, email: Isuser.email };
        const accessToken = jwt.sign(user, process.env.ACCESS_TOKEN_SECRET, { expiresIn: "7d" });

        return res.status(200).json({ user, accessToken, message: "User logged in successfully." });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: "Internal server error." });
    }
};

export const getUser = async (req, res) => {
    try {
        const user = req.user;

        const isUser = await User.findById(user.id);
        if(!isUser) {
            return res.status(404).json({ error: "User not found." });
        }
        return res.status(200).json({ 
            user:{
                id: isUser._id,
                name: isUser.name,
                email: isUser.email,
                createOn: isUser.createdOn
            }
            
        , message: "User fetched successfully." });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: "Internal server error." });
    }
}