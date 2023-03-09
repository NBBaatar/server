const Ac = require("../models/ac");
const Unit = require("../models/unit");
const path = require("path");
const LocalError = require("../utils/locaError");
const asyncHandler = require("../middleware/asyncHandler");
const user = require("../models/user");
const PDFDocument = require("pdfkit");
const sendEmail = require("../utils/sendGmail");
const fs = require("fs");
exports.getUnitAc = asyncHandler(async (req, res, next) => {
  let query;
  if (req.params.unitId) {
    query = Ac.find({ unit: req.params.unitId });
  } else {
    query = Ac.find();
  }
  const ac = await query;
  res.status(200).json({
    success: true,
    message: "Request success.",
    count: ac.length,
    data: ac,
  });
});
exports.getAc = asyncHandler(async (req, res, next) => {
  const ac = await Ac.findById(req.params.id);
  if (!ac) {
    throw new LocalError(req + " No any Data.", 404);
  }
  res.status(200).json({
    success: true,
    message: "Request success.",
    data: ac,
  });
});
//Эхлээд холбогдож байгаа collection оо find хийгээд дараа нь insert хийнэ.
exports.createAc = asyncHandler(async (req, res, next) => {
  const unit = await Unit.findById(req.body.unit);
  if (!unit) {
    throw new LocalError(req.body.unit + " ID is not include any Datа.", 404);
  }
  const ac = await Ac.create(req.body);
  res.status(200).json({
    success: true,
    message: "New AC insert success.",
    user_id: req.userId,
    data: ac,
  });
});
exports.updateAc = asyncHandler(async (req, res, next) => {
  const ac = await Ac.findById(req.params.id);
  if (!ac) {
    throw new LocalError(req.params.id + " ID is not include any Data.", 404);
  }
  if (ac.created_user !== req.userId && req.userRole !== "admin") {
    throw new LocalError("You just update your post. Not other's post", 404);
  }
  req.body.updated_user = req.userId;
  for (let attr in req.body) {
    (ac[attr] = req.body[attr]), { new: true, runValidators: true };
  }
  ac.save();
  res.status(200).json({
    success: true,
    message: "Update Success.",
    user_id: req.userId,
    data: ac,
  });
});
exports.deleteAc = asyncHandler(async (req, res, next) => {
  const ac = await Ac.findById(req.params.id);
  if (!ac) {
    throw new LocalError(req.params.id + " ID is not include any Datа.", 404);
  }
  ac.remove();

  res.status(200).json({
    success: true,
    message: "Delete Success.",
    user_id: req.userId,
    data: ac,
  });
});
exports.getUserAc = asyncHandler(async (req, res, next) => {
  //Get Requist
  req.query.created_user = req.userId;
  const ac = await Ac.find(req.query);
  res.status(200).json({
    success: true,
    message: "Request success.",
    user_id: req.userId,
    count: ac.length,
    data: ac,
  });
});
exports.uploadFilesAC = asyncHandler(async (req, res, next) => {
  const ac = await Ac.findById(req.params.id);

  if (!ac) {
    throw new LocalError(req.params.id + " ID is not include any Datа.", 404);
  }
  const file = req.files.file;

  if (!file.mimetype.startsWith("image")) {
    throw new LocalError(" Only picture included", 400);
  }
  if (file.size > process.env.MAX_UPLOAD_FILE_SIZE) {
    throw new LocalError(" Your file must be lower than 1GB.", 400);
  }
  // file.name = `photo_${req.params.id}${path.parse(file.name).ext}`;
  file.mv(`${process.env.FILE_UPLOAD_AC_PATH}/${file.name}`, (err) => {
    if (err) {
      throw new LocalError("Upload Faild : " + err.message, 400);
    }

    ac.save();
    res.status(200).json({
      success: true,
      message: "Upload Success.",
      user_id: req.userId,
      data: file.name,
    });
  });
});
exports.imagesGetAC = asyncHandler(async (req, res, next) => {
  try {
    const imageAll = await fs.readdirSync("./public/uploads/ac");
    res.status(200).json({
      success: true,
      count: imageAll.length,
      data: imageAll,
    });
  } catch (err) {
    res.status(500).json(err);
  }
});
exports.generatePDF = asyncHandler(async (req, res, next) => {
  const ac = await Ac.findById(req.params.id);
  if (!ac) {
    throw new LocalError(req + "No data", 404);
  }
  function buildPDF(dataCallback, endCallback) {
    const doc = new PDFDocument({ bufferPages: true, font: "Courier" });
    doc.on("data", dataCallback);
    doc.on("end", endCallback);
    doc.fontSize(12).text(`Status: ${ac.statusOf}`);
    doc.fontSize(12).text(`Reason : ${ac.reason}`);
    doc.fontSize(12).text(`Fire Rate: ${ac.fireRating}`);
    doc.image(`public/uploads/ac/${ac?.photo?.[0].fileName}`, {
      fit: [250, 400],
      align: "center",
      valign: "center",
    });
    doc.end();
  }
  const stream = res.writeHead(200, {
    "Content-Type": "application/pdf",
    "Content-Disposition": `attachment;filename=issue.pdf`,
  });
  buildPDF(
    (chunk) => stream.write(chunk),
    () => stream.end()
  );
});
exports.sendGmail = asyncHandler(async (req, res, nex) => {
  if (!req.body.email) {
    throw new LocalError("Please enter your Email", 400);
  }
  const ac = await Ac.findById(req.params.id);
  if (!ac) {
    throw new LocalError(req + "No data", 404);
  }
  const user = req.body.email;
  const link = `${process.env.MAIL_HOST}/api/v1/ac/${ac._id}/pdf`;
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
