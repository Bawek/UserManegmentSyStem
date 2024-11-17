import userModel from "../Model/userModel.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";

// Generate a token with user ID
const generatToken = (id) => {
  return jwt.sign({ id }, process.env.SECRET_KEY, { expiresIn: "1h" }); // Added expiration time for better security
};

// Register function
const register = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    if (!name || !email || !password) {
      return res.status(400).json({
        success: false,
        message: "Please provide all necessary fields",
      });
    }

    // Check if the user already exists
    const existingUser = await userModel.findOne({ email });
    if (existingUser) {
      return res.status(400).json({
        success: false,
        message: "Email is already registered",
      });
    }

    // Hash the password
    const salt = await bcrypt.genSalt(10); // Use await for asynchronous operation
    const hashPassword = await bcrypt.hash(password, salt); // Use await for asynchronous operation

    // Create a new user
    const user = await userModel.create({
      name,
      email,
      password: hashPassword,
    });

    const token = generatToken(user._id); // Generate token for the new user
    res.json({ success: true, message: "Successfully registered", token });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Registration failed" });
  }
};

// Login function
const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: "Please provide email and password",
      });
    }

    // Find the user by email
    const user = await userModel.findOne({ email });
    if (!user) {
      return res.status(400).json({
        success: false,
        message: "Invalid email, please try again",
      });
    }

    // Compare the entered password with the stored hash
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({
        success: false,
        message: "Invalid password, please try again",
      });
    }

    const token = generatToken(user._id); // Generate token for the logged-in user
    res.json({ success: true, message: "Successfully logged in", token });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Login failed" });
  }
};

export { register, login };
