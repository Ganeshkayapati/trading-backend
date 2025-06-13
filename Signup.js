const User = require("./Models/UserModel");
const { createSecretToken } = require("./utils/SecretToken");
const bcrypt = require("bcryptjs");

module.exports.Signup = async (req, res) => {
  try {
    const { email, password, username } = req.body;

    
    if (!email || !password || !username) {
      return res.status(400).json({ message: "All fields are required" });
    }

   
    const normalizedEmail = email.toLowerCase().trim();

    
    const existingUser = await User.findOne({ email: normalizedEmail });
    if (existingUser) {
      return res.status(409).json({ message: "User already exists" });
    }

    
    const user = await User.create({ email: normalizedEmail, password, username });
    const token = createSecretToken(user._id);

    
    res.cookie("token", token, {
      withCredentials: true,
      httpOnly: true,  
    });

    return res.status(201).json({ message: "User signed up successfully", success: true, user });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Internal server error" });
  }
};
