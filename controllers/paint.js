const Paint = require("../models/paint");
const Unit = require("../models/unit");
const path = require("path");
const LocalError = require("../utils/locaError");
const asyncHandler = require("../middleware/asyncHandler");
const user = require("../models/user");
const fs = require("fs");
const PDFDocument = require("pdfkit");
const sendEmail = require("../utils/sendGmail");
exports.getUnitPaint = asyncHandler(async (req, res, next) => {
  let query;
  if (req.params.unitId) {
    query = Paint.find({ unit: req.params.unitId });
  } else {
    query = Paint.find();
  }
  const paint = await query;
  res.status(200).json({
    success: true,
    message: "Request success.",
    count: paint.length,
    data: paint,
  });
});
exports.getPaint = asyncHandler(async (req, res, next) => {
  const paint = await Paint.findById(req.params.id);
  if (!paint) {
    throw new LocalError(req + " No any Data.", 404);
  }
  res.status(200).json({
    success: true,
    message: "Request success.",
    data: paint,
  });
});
//Эхлээд холбогдож байгаа collection оо find хийгээд дараа нь insert хийнэ.
exports.createPaint = asyncHandler(async (req, res, next) => {
  const unit = await Unit.findById(req.body.unit);
  if (!unit) {
    throw new LocalError(req.body.unit + " ID is not include any Datа.", 404);
  }
  const paint = await Paint.create(req.body);
  res.status(200).json({
    success: true,
    message: "New Paint insert success.",
    user_id: req.userId,
    data: paint,
  });
});
exports.updatePaint = asyncHandler(async (req, res, next) => {
  const paint = await Paint.findById(req.params.id);
  if (!paint) {
    throw new LocalError(req.params.id + " ID is not include any Data.", 404);
  }
  if (paint.created_user !== req.userId && req.userRole !== "admin") {
    throw new LocalError("You just update your post. Not other's post", 404);
  }
  req.body.updated_user = req.userId;
  for (let attr in req.body) {
    (paint[attr] = req.body[attr]), { new: true, runValidators: true };
  }
  paint.save();
  res.status(200).json({
    success: true,
    message: "Update Success.",
    user_id: req.userId,
    data: paint,
  });
});
exports.deletePaint = asyncHandler(async (req, res, next) => {
  const paint = await Paint.findById(req.params.id);
  if (!paint) {
    throw new LocalError(req.params.id + " ID is not include any Datа.", 404);
  }
  paint.remove();

  res.status(200).json({
    success: true,
    message: "Delete Success.",
    user_id: req.userId,
    data: paint,
  });
});
exports.getUserPaint = asyncHandler(async (req, res, next) => {
  //Get Requist
  req.query.created_user = req.userId;
  const paint = await Paint.find(req.query);
  res.status(200).json({
    success: true,
    message: "Request success.",
    user_id: req.userId,
    count: paint.length,
    data: paint,
  });
});
exports.uploadFilesPaint = asyncHandler(async (req, res, next) => {
  const paint = await Paint.findById(req.params.id);

  if (!paint) {
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
  file.mv(`${process.env.FILE_UPLOAD_PAINT_PATH}/${file.name}`, (err) => {
    if (err) {
      throw new LocalError("Upload Faild : " + err.message, 400);
    }

    paint.save();
    res.status(200).json({
      success: true,
      message: "Upload Success.",
      user_id: req.userId,
      data: file.name,
    });
  });
});
exports.imagesGetPaint = asyncHandler(async (req, res, next) => {
  try {
    const imageAll = await fs.readdirSync("./public/uploads/paint");
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
  const paint = await Paint.findById(req.params.id);
  if (!paint) {
    throw new LocalError(req + "No data", 404);
  }
  function buildPDF(dataCallback, endCallback) {
    const doc = new PDFDocument({ bufferPages: true, font: "Courier" });
    doc.on("data", dataCallback);
    doc.on("end", endCallback);
    doc.fontSize(12).text(`Status: ${paint.statusOf}`);
    doc.fontSize(12).text(`Reason : ${paint.reason}`);
    doc.fontSize(12).text(`Fire Rate: ${paint.fireRating}`);
    doc.image(`public/uploads/paint/${paint?.photo?.[0].fileName}`, {
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
  const paint = await Paint.findById(req.params.id);
  if (!paint) {
    throw new LocalError(req + "No data", 404);
  }
  const user = req.body.email;
  const link = `${process.env.MAIL_HOST}/api/v1/paint/${paint._id}/pdf`;
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
