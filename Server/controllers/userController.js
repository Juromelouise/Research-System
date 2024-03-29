const User = require("../models/user");
const Comment = require("../models/comment");
const cloudinary = require("cloudinary");
const sendToken = require("../utils/jwtToken");
const { uploadSingle, uploadMultiple } = require("../utils/UploadCloudinary");
const sendEmail = require("../utils/sendEmail");
const crypto = require("crypto");

exports.registerUser = async (req, res, next) => {
  const imageDetails = await uploadSingle(req.file.path, "avatar");
  console.log(imageDetails);
  req.body.avatar = imageDetails;

  const user = await User.create(req.body);

  if (!user) {
    return res.status(500).json({
      success: false,
      message: "user not created",
    });
  }

  sendToken(user, 200, res);
};

exports.registerSupplerSeller = async (req, res) => {
  const imageDetails = await uploadSingle(req.files.avatar[0].path, "avatar");
  console.log(req.files);
  const attachement = await uploadMultiple(req.files.attachment, "attachment");

  req.body.avatar = imageDetails;
  req.body.attachment = attachement;

  const user = await User.create(req.body);

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
    return res.status(401).json({ error: "Invalid Email or Password" });
  }
  const isPasswordMatched = await user.comparePassword(password);

  if (!isPasswordMatched) {
    return res.status(401).json({ error: "Invalid Email or Password" });
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
  const users = await User.find({ role: "supplier" });
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

exports.updateCertified = async (req) => {
  await User.findByIdAndUpdate(
    req.params.id,
    { certified: "Certified by Admin" },
    {
      new: true,
    }
  );
};

exports.forgotPassword = async (req, res, next) => {
  try {
    const user = await User.findOne({ email: req.body.email });

    if (!user) {
      console.log("Invalid email provided");
      return res.status(400).json({ error: "User not found with this email" });
    }

    const resetToken = user.getResetPasswordToken();
    await user.save({ validateBeforeSave: false });
    const resetUrl = `${req.protocol}://localhost:3000/reset/password/${resetToken}`;
    const message = `
      <div
        style={{
          fontFamily: "Arial, sans-serif",
          color: "#333",
          fontSize: "16px",
        }}
      >
        <p style={{ marginBottom: "10px" }}>
          Your password reset token is as follows:
        </p>
        <p
          style={{ marginBottom: "10px", fontWeight: "bold", color: "#007bff" }}
        >
          ${resetUrl}
        </p>
        <p style={{ marginBottom: "10px" }}>
          If you have not requested this email, please ignore it.
        </p>
      </div>`;
    await sendEmail({
      email: user.email,
      subject: "Reset Password",
      message,
    });

    res.status(200).json({
      success: true,
      message: `Email sent to: ${user.email}`,
    });
  } catch (error) {
    console.error("Error sending reset password email:", error);
    user.resetPasswordToken = undefined;
    user.resetPasswordExpire = undefined;
    await user.save({ validateBeforeSave: false });
    return res
      .status(500)
      .json({ error: "Error sending reset password email" });
  }
};

exports.resetPassword = async (req, res, next) => {
  const resetPasswordToken = crypto
    .createHash("sha256")
    .update(req.params.token)
    .digest("hex");
  const user = await User.findOne({
    resetPasswordToken,
    resetPasswordExpire: { $gt: Date.now() },
  });
  if (!user) {
    return res
      .status(400)
      .json({ error: "Password reset token is invalid or has been expired" });
  }
  if (req.body.password !== req.body.confirmPassword) {
    return res.status(400).json({ error: "Password does not match" });
  }
  user.password = req.body.password;
  user.resetPasswordToken = undefined;
  user.resetPasswordExpire = undefined;
  await user.save();
  sendToken(user, 200, res);
};

exports.ReviewUser = async (req, res) => {
  try {
    // console.log(req.body)
    req.body.user = req.user._id;
    const comment = await Comment.create(req.body);
    const user = await User.findByIdAndUpdate(
      req.params.id,
      {
        $push: {
          reviews: {
            user: req.user._id,
            comment: comment._id,
          },
        },
      },
      { new: true }
    );

    res.status(200).json({
      user,
      message: "Review Created",
    });
  } catch (error) {
    console.log(error);
  }
};
