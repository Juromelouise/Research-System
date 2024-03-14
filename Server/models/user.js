const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const crypto = require("crypto");
const validator = require("validator");

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Please enter your Full Name"],
    trim: true,
    minLength: [5, "Name must exceed 10 Letters"],
  },
  phone: {
    type: String,
    required: [true, "Please input Phone Number"],
  },
  baranggay: {
    type: String,
    required: [true, "Please put a Baranggay"],
  },
  city: {
    type: String,
    required: [true, "Please put a City"],
  },
  password: {
    type: String,
    required: [true, "Please put password"],
    minLength: [8, "Password must exceed more than 7 characters"],
    select: false,
  },
  email: {
    type: String,
    required: [true, "Please enter your Email"],
    unique: true,
    validate: [validator.isEmail, "Please enter a valid email address"],
  },
  avatar: {
    public_id: {
      type: String,
      required: true,
    },
    url: {
      type: String,
      required: true,
    },
  },
  attachment: [
    {
      public_id: {
        type: String,
        required: true,
      },
      url: {
        type: String,
        required: true,
      },
    },
  ],
  role: {
    type: String,
    default: "buyer",
  },
  description: {
    type: String,
  },
  season: {
    type: String,
  },
  fertilizer: {
    type: String,
  },
  type: {
    type: String,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  reviews: [
    {
      user: {
        type: mongoose.Schema.ObjectId,
        ref: "User",
        required: true,
        autopopulate: true,
      },
      rating: {
        type: Number,
        required: true,
      },
      comment: {
        type: mongoose.Schema.ObjectId,
        ref: "Comment",
        required: true,
        autopopulate: true,
      },
    },
  ],
  seller: [
    {
      type: mongoose.Schema.ObjectId,
      ref: "User",
      required: true,
      autopopulate: true,
    },
  ],
  resetPasswordToken: String,
  resetPasswordExpire: Date,
});

userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) {
    next();
  }
  this.password = await bcrypt.hash(this.password, 10);
});

userSchema.methods.getJwtToken = function () {
  return jwt.sign({ id: this._id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_TIME,
  });
};

userSchema.methods.comparePassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

userSchema.methods.getResetPasswordToken = function () {
  const resetToken = crypto.randomBytes(20).toString("hex");

  this.resetPasswordToken = crypto
    .createHash("sha256")
    .update(resetToken)
    .digest("hex");

  this.resetPasswordExpire = Date.now() + 30 * 60 * 1000;
  return resetToken;
};

module.exports = mongoose.model("User", userSchema);
