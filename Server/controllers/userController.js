const User = require("../models/user");
const cloudinary = require("cloudinary");
const sendToken = require("../utils/jwtToken");
// const crypto = require("crypto");

exports.registerUser = async (req, res, next) => {
  console.log(req.file);
  const cloudinaryResult = await cloudinary.v2.uploader.upload(
    req.body.avatar,
    {
      folder: "avatars",
      width: 150,
      crop: "scale",
    },
    (err, result) => {
      console.log(err, result);
    }
  );

  const { name, phone, location, email, password } = req.body;

  const user = await User.create({
    name,
    email,
    password,
    phone,
    location,
    avatar: {
      public_id: cloudinaryResult.public_id,
      url: cloudinaryResult.secure_url,
    },
  });

  if (!user) {
    return res.status(500).json({
      success: false,
      message: "user not created",
    });
  }

  sendToken(user, 200, res);
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

exports.deleteUser = async (req, res) => {
  await User.findByIdAndDelete(req.params.id);
  res.status(200).json({
    success: true,
  });
};

exports.updateProfile = async (req, res, next) => {
  const newUserData = {
    name: req.body.name,
    email: req.body.email,
  };

  // Update avatar
  if (req.body.avatar !== "") {
    const user = await User.findById(req.user.id);

    const image_id = user.avatar.public_id;
    await cloudinary.v2.uploader.destroy(image_id);

    const result = await cloudinary.v2.uploader.upload(req.body.avatar, {
      folder: "avatars",
      width: 150,
      crop: "scale",
    });

    newUserData.avatar = {
      public_id: result.public_id,
      url: result.secure_url,
    };
  }

  const user = await User.findByIdAndUpdate(req.user.id, newUserData, {
    new: true,
    runValidators: true,
  });
  if (!user) {
    return res.status(401).json({ message: "User Not Updated" });
  }

  res.status(200).json({
    success: true,
  });
};

exports.getUserProfile = async (req, res, next) => {
  const user = await User.findById(req.user.id);
  res.status(200).json({
    success: true,
    user,
  });
};

exports.getAllUsers = async (req, res) => {
  const user = await User.find({ _id: { $ne: req.user._id } });

  res.status(200).json({
    user,
  });
};

exports.updateRoleSeller = async (req, res) => {
  await User.findByIdAndUpdate(req.params.id, { role: "seller" });
  const users = await User.find();
  console.log("seller");
  res.status(200).json({
    users,
  });
};

exports.updateRoleFarmer = async (req, res) => {
  await User.findByIdAndUpdate(req.params.id, { role: "farmer" });
  console.log("farmer");
  const users = await User.find();
  res.status(200).json({
    users,
  });
};

exports.allFarmers = async (req, res) => {
  const users = await User.find({ role: "farmer" });
  res.status(200).json({
    users,
  });
};

exports.allSellers = async (req, res) => {
  const users = await User.find({ role: "seller" });
  res.status(200).json({
    users,
  });
};
