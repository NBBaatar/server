const mongoose = require("mongoose");
const { slugify } = require("transliteration");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const crypto = require("crypto");
const UserShema = new mongoose.Schema({
  fName: {
    type: String,
    required: [true, "Insert your first name."],
    trim: true,
    maxlength: [15, "Your information not more than 15 characters"],
  },
  lName: {
    type: String,
    required: [true, "Insert your last name."],
    trim: true,
    maxlength: [50, "Your information not more than 15 charactersй."],
  },
  password: {
    type: String,
    required: [true, "Insert your password."],
    trim: true,
    maxlength: [20, "Password is not more than 20."],
    minlength: [8, "Password is not less than 8."],
    select: false, //Not send to client
  },
  resetPasswordToken: String,
  resetPasswordExpired: Date,
  role: {
    type: String,
    default: "builder",
    required: [true, "Enter yout permission."],
    enum: ["admin", "operator", "builder"],
  },
  email: {
    type: String,
    trim: true,
    required: [true, "Enter your Email."],
    unique: true,
    match: [
      /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
      "Email structure incorrect",
    ],
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  slug: String,
});

UserShema.pre("save", async function (next) {
  //if Password not changed
  if (!this.isModified("password")) next();
  //Generate password to BCRYPT
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
  //add Slug
  this.slug = slugify(this.email);
  next();
});
UserShema.methods.getJWT = function () {
  const token = jwt.sign(
    { id: this._id, role: this.role },
    process.env.JWT_SECRET,
    {
      expiresIn: process.env.JWT_EXPIRESIN,
    }
  );
  return token;
};
//login check
UserShema.methods.checkPassword = async function (inputPassword) {
  return await bcrypt.compare(inputPassword, this.password);
};
UserShema.methods.generatPasswordToken = function () {
  const resetToken = crypto.randomBytes(20).toString("hex");
  //reEncrypte before save and add reset time 10min
  this.resetPasswordToken = crypto
    .createHash("sha256")
    .update(resetToken)
    .digest("hex");
  this.resetPasswordExpired = Date.now() + 10 * 60 * 1000;
  return resetToken;
};
module.exports = mongoose.model("User", UserShema);
