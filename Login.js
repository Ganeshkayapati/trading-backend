const User = require("./Models/UserModel");
const { createSecretToken } = require("./utils/SecretToken");
const bcrypt = require("bcryptjs");
module.exports.Login = async (req, res) => {
  try {
    const { email, password } = req.body;

  
    if (!email || !password) {
      return res.status(400).json({ message: "All fields are required" });
    }

    
    const normalizedEmail = email.toLowerCase().trim();

  
    const user = await User.findOne({ email: normalizedEmail });
    if (!user) {
      return res.status(401).json({ message: "Incorrect email or password" });
    }

   
    const auth = await bcrypt.compare(password, user.password);
    if (!auth) {
      return res.status(401).json({ message: "Incorrect email or password" });
    }

    const token = createSecretToken(user._id);

    
    res.cookie("token", token, {
      withCredentials: true,
      httpOnly: true, 
    });

    return res.status(200).json({ message: "User logged in successfully", success: true });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Internal server error" });
  }
};