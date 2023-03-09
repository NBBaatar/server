const User = require("../models/user");
const LocalError = require("../utils/locaError");
const path = require("path");
const asyncHandler = require("../middleware/asyncHandler");
const crypto = require("crypto");
const sendEmail = require("../utils/sendGmail");
exports.getUsers = asyncHandler(async (req, res, next) => {
  const users = await User.find();
  res.status(200).json({
    success: true,
    message: "Request success.",
    user_id: req.userId,
    count: users.length,
    data: users,
  });
});
exports.getUser = asyncHandler(async (req, res, next) => {
  const user = await User.findById(req.params.id);
  if (!user) {
    throw new LocalError(req.params.id + " ID is not include any Datа.", 404);
  }
  res.status(200).json({
    success: true,
    message: "Request Success.",
    user_id: req.userId,
    data: user,
  });
});
exports.updateUser = asyncHandler(async (req, res, next) => {
  const user = await User.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
  });
  if (!user) {
    throw new LocalError(req.params.id + " ID is not include any Datа.", 404);
  }
  res.status(200).json({
    success: true,
    message: "Update Success.",
    user_id: req.userId,
    data: user,
  });
});
exports.createUser = asyncHandler(async (req, res, next) => {
  const user = await User.create(req.body);
  res.status(200).json({
    success: true,
    message: "New Users insert success.",
    data: user,
  });
});
exports.registerUser = asyncHandler(async (req, res, next) => {
  const user = await User.create(req.body);
  const token = user.getJWT();
  res.status(200).json({
    success: true,
    message: "New Users insert success.",
    data: user,
    token,
  });
});
exports.deleteUser = asyncHandler(async (req, res, next) => {
  const user = await User.findByIdAndDelete(req.params.id);
  if (!user) {
    throw new LocalError(req.params.id + " ID is not include any Datа.", 404);
  }
  res.status(200).json({
    success: true,
    message: "Delete Success.",
    user_id: req.userId,
    data: user,
  });
});
exports.uploadFiles = asyncHandler(async (req, res, next) => {
  const user = await User.findById(req.params.id);
  if (!user) {
    throw new LocalError(req.params.id + " ID is not include any Datа.", 404);
  }
  const file = req.files.file;
  if (!file.mimetype.startsWith("image")) {
    throw new LocalError(" Only picture included", 400);
  }
  if (file.size > process.env.MAX_UPLOAD_FILE_SIZE) {
    throw new LocalError(" Your file must be lower than 1GB.", 400);
  }
  file.name = `photo_${req.params.id}${path.parse(file.name).ext}`;
  file.mv(`${process.env.FILE_UPLOAD_USERS_PATH}/${file.name}`, (err) => {
    if (err) {
      throw new LocalError("Upload Faild : " + err.message, 400);
    }
    user.photo = file.name;
    user.save();
    res.status(200).json({
      success: true,
      message: "Upload Success.",
      user_id: req.userId,
      data: file.name,
    });
  });
});
//Login
exports.login = asyncHandler(async (req, res, next) => {
  const { email, password } = req.body;
  if (!email || !password) {
    throw new LocalError("Please enter your email and password", 400);
  }
  const user = await User.findOne({ email }).select("+password");
  if (!user) {
    throw new LocalError("Please enter your email and password correctly", 401);
  }
  const logedIn = await user.checkPassword(password);
  if (!logedIn) {
    throw new LocalError("Please enter your email and password correctly", 401);
  }
  res.status(200).json({
    success: true,
    token: user.getJWT(),
    user: user,
  });
});
exports.forgotPassword = asyncHandler(async (req, res, next) => {
  if (!req.body.email) {
    throw new localError("Please enter your email", 400);
  }
  const user = await User.findOne({ email: req.body.email });
  if (!user) {
    throw new localError(req.body.email + " Not found any data.", 400);
  }
  const resetToken = user.generatPasswordToken();
  //not run validator
  // await user.save({ validateBeforeSave: false });
  user.save();
  const link = `https://driver.app/changepassword/${resetToken}`;
  const message = `Hello.<br><br> Please change your password on the link below: <br><br><a target="_blanks" href="${link}">${link}</a><br><br>Thank you.`;
  await sendEmail({
    email: user.email,
    subject: "Reset password request",
    message,
  });

  res.status(200).json({
    success: true,
    resetToken,
    sendEmail: true,
  });
});

exports.resetPassword = asyncHandler(async (req, res, next) => {
  if (!req.body.resetToken || !req.body.password) {
    throw new localError("Please Send token and password", 400);
  }
  const encrypt = crypto
    .createHash("sha256")
    .update(req.body.resetToken)
    .digest("hex");
  const user = await User.findOne({
    resetPasswordToken: encrypt,
    resetPasswordExpired: { $gt: Date.now() },
  });
  if (!user) {
    throw new localError(req.body.email + " Invalid token.", 400);
  }
  const resetToken = user.generatPasswordToken();
  user.password = req.body.password;
  user.resetPasswordToken = undefined;
  user.resetPasswordExpired = undefined;
  await user.save();
  const token = user.getJWT();
  res.status(200).json({
    success: true,
    data: user,
    token,
  });
});
//Эхлээд бүх майл хаяг хадгалах Collection үүсгэх ба түүнийгээ энд дуудаж оруулаад Find хийнэ User model-н оронд.Арай өөр аргаар шийдсэн. Бүх модел болгон дээр нь sendEmail–г дуудан оруулсан. ID гаар нь дуудаад татах линкд нь өгсөн.
exports.sendGmail = asyncHandler(async (req, res, nex) => {
  if (!req.body.email) {
    throw new localError("Please enter your Email", 400);
  }
  const user = req.body.email;
  const link = "http://192.168.1.8:8000/api/v1/ac/63e2fe021506a93d4b6bfac9/pdf";
  const message = `Hello.<br><br> Please download the PDF clicking by following link <br><br><a target="_blanks" href="${link}">${link}</a><br><br>
  Best regards<br><br>App support Level 33 <br><br>Thank you.`;
  const result = await sendEmail({
    email: user,
    subject: "Defects",
    message,
  });
  res.status(200).json({
    success: true,
    data: result,
  });
});
