const User = require("../models/user");
// const cloudinary = require("cloudinary");
const sendToken = require("../utils/jwtToken");
// const crypto = require("crypto");

exports.registerUser = async (req, res) => {
  console.log(req.body);
  try {
    const { name, phone, location, email, password } = req.body;

    const user = await User.create({
      name,
      email,
      password,
      phone,
      location,
      avatar: {
        public_id: "avatars/hsdfl66pg2mpvp5irfqy",
        url: "https://res.cloudinary.com/dgneiaky7/image/upload/v1680144230/avatars/hsdfl66pg2mpvp5irfqy.jpg",
      },
    });

    if (!user) {
      throw new Error("User not created");
    }

    sendToken(user, 200, res);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.loginUser = async (req, res, next) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ error: "Please enter email & password" });
  }
  const user = await User.findOne({ email }).select("+password");

  if (!user) {
    return res.status(401).json({ message: "Invalid Email or Password" });
  }
  const isPasswordMatched = await user.comparePassword(password);

  if (!isPasswordMatched) {
    return res.status(401).json({ message: "Invalid Email or Password" });
  }

  sendToken(user, 200, res);
};

exports.logout = async (req, res, next) => {
  res.cookie("token", null, {
    expires: new Date(Date.now()),
    httpOnly: true,
  });

  res.status(200).json({
    success: true,
    message: "Logged out",
  });
};
