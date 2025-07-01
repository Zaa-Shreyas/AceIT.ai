import { findOne, create, findById } from "../models/User.js";
import { genSalt, hash, compare } from "bcryptjs";
import { sign } from "jsonwebtoken";

// Generate JWT token
const generateToken = (userId) => {
    return sign({ id: userId }, process.env.JWT_SECRET, {
      expiresIn: "1d",
    });
  };

  // @desc Register new user
  // @route POST /api/users
  // @access Public
  const registerUser = async (req, res) => {
    try {
        const { name, email, password, profileImageUrl} = req.body;

        // Check if user already exists
        const userExists = await findOne({ email });
        if (userExists) {
            res.status(400);
            throw new Error("User already exists");
        }

        // Hash password
        const salt = await genSalt(10);
        const hashedPassword = await hash(password, salt);

        // Create user
        const user = await create({
            name,
            email,
            password: hashedPassword,
            profileImageUrl
        });

        // Return User data with JWT token
        res.status(201).json({
            _id: user._id,
            name: user.name,
            email: user.email,
            profileImageUrl: user.profileImageUrl,
            token: generateToken(user._id),
        });
    } catch (error) {
        res.status(500);
        throw new Error(error.message);
    }
  };
  
  // @desc Authenticate a user
  // @route POST /api/users/login
  // @access Public
  const loginUser = async (req, res) => {
    try {
        const { email, password } = req.body;

        const user = await findOne({ email });
        if (!user) {
            res.status(500);
            throw new Error("Invalid email or password");
        }

        // Compare password
        const isMatch = await compare(password, user.password);
        if (!isMatch) {
            res.status(500);
            throw new Error("Invalid email or password");
        }

        // Return user data with JWT token
        res.json({
            _id: user._id,
            name: user.name,
            email: user.email,
            profileImageUrl: user.profileImageUrl,
            token: generateToken(user._id),
        });

    } catch (error){

        res.status(500);
        throw new Error(error.message);
    }
  };
  
  // @desc Get user profile
  // @route GET /api/users/profile
  // @access Private
  const getUserProfile = async (req, res) => {
    try {
        const user = await findById(req.user.id).select("-password");
        if (!user) {
            res.status(404);
            throw new Error("User not found");
        }
        res.json(user);
    } catch (error){

        res.status(500);
        throw new Error(error.message);
    }
  };

  export default {
    registerUser,
    loginUser,
    getUserProfile,
  };