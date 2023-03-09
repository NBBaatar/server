const WaterProof = require("../models/waterProof");
const Unit = require("../models/unit");
const path = require("path");
const LocalError = require("../utils/locaError");
const asyncHandler = require("../middleware/asyncHandler");
const user = require("../models/user");
const PDFDocument = require("pdfkit");
const sendEmail = require("../utils/sendGmail");
const fs = require("fs");
exports.getUnitWaterProof = asyncHandler(async (req, res, next) => {
  let query;
  if (req.params.unitId) {
    query = WaterProof.find({ unit: req.params.unitId });
  } else {
    query = WaterProof.find();
  }
  const waterProof = await query;
  res.status(200).json({
    success: true,
    message: "Request success.",
    count: waterProof.length,
    data: waterProof,
  });
});
exports.getWaterProof = asyncHandler(async (req, res, next) => {
  const waterProof = await WaterProof.findById(req.params.id);
  if (!waterProof) {
    throw new LocalError(req + " No any Data.", 404);
  }
  res.status(200).json({
    success: true,
    message: "Request success.",
    data: waterProof,
  });
});
//Эхлээд холбогдож байгаа collection оо find хийгээд дараа нь insert хийнэ.
exports.createWaterProof = asyncHandler(async (req, res, next) => {
  const unit = await Unit.findById(req.body.unit);
  if (!unit) {
    throw new LocalError(req.body.unit + " ID is not include any Datа.", 404);
  }
  const waterProof = await WaterProof.create(req.body);
  res.status(200).json({
    success: true,
    message: "New Water Proof insert success.",
    user_id: req.userId,
    data: waterProof,
  });
});
exports.updateWaterProof = asyncHandler(async (req, res, next) => {
  const waterProof = await WaterProof.findById(req.params.id);
  if (!waterProof) {
    throw new LocalError(req.params.id + " ID is not include any Data.", 404);
  }
  if (waterProof.created_user !== req.userId && req.userRole !== "admin") {
    throw new LocalError("You just update your post. Not other's post", 404);
  }
  req.body.updated_user = req.userId;
  for (let attr in req.body) {
    (waterProof[attr] = req.body[attr]), { new: true, runValidators: true };
  }
  waterProof.save();
  res.status(200).json({
    success: true,
    message: "Update Success.",
    user_id: req.userId,
    data: waterProof,
  });
});
exports.deleteWaterProof = asyncHandler(async (req, res, next) => {
  const waterProof = await WaterProof.findById(req.params.id);
  if (!waterProof) {
    throw new LocalError(req.params.id + " ID is not include any Datа.", 404);
  }
  waterProof.remove();

  res.status(200).json({
    success: true,
    message: "Delete Success.",
    user_id: req.userId,
    data: waterProof,
  });
});
exports.getUserWaterProof = asyncHandler(async (req, res, next) => {
  //Get Requist
  req.query.created_user = req.userId;
  const waterProof = await WaterProof.find(req.query);
  res.status(200).json({
    success: true,
    message: "Request success.",
    user_id: req.userId,
    count: waterProof.length,
    data: waterProof,
  });
});
exports.uploadFilesBeforeBalcony = asyncHandler(async (req, res, next) => {
  const waterProof = await WaterProof.findById(req.params.id);

  if (!waterProof) {
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
  file.mv(
    `${process.env.FILE_UPLOAD_BALCONY_BEFORE_PATH}/${file.name}`,
    (err) => {
      if (err) {
        throw new LocalError("Upload Faild : " + err.message, 400);
      }

      waterProof.save();
      res.status(200).json({
        success: true,
        message: "Upload Success.",
        user_id: req.userId,
        data: file.name,
      });
    }
  );
});
exports.uploadFilesAfterBalcony = asyncHandler(async (req, res, next) => {
  const waterProof = await WaterProof.findById(req.params.id);

  if (!waterProof) {
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
  file.mv(
    `${process.env.FILE_UPLOAD_BALCONY_AFTER_PATH}/${file.name}`,
    (err) => {
      if (err) {
        throw new LocalError("Upload Faild : " + err.message, 400);
      }
      waterProof.save();
      res.status(200).json({
        success: true,
        message: "Upload Success.",
        user_id: req.userId,
        data: file.name,
      });
    }
  );
});
exports.uploadFilesBeforeBathroom = asyncHandler(async (req, res, next) => {
  const waterProof = await WaterProof.findById(req.params.id);

  if (!waterProof) {
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
  file.mv(
    `${process.env.FILE_UPLOAD_BATHROOM_BEFORE_PATH}/${file.name}`,
    (err) => {
      if (err) {
        throw new LocalError("Upload Faild : " + err.message, 400);
      }

      waterProof.save();
      res.status(200).json({
        success: true,
        message: "Upload Success.",
        user_id: req.userId,
        data: file.name,
      });
    }
  );
});
exports.uploadFilesAfterBathroom = asyncHandler(async (req, res, next) => {
  const waterProof = await WaterProof.findById(req.params.id);

  if (!waterProof) {
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
  file.mv(
    `${process.env.FILE_UPLOAD_BATHROOM_AFTER_PATH}/${file.name}`,
    (err) => {
      if (err) {
        throw new LocalError("Upload Faild : " + err.message, 400);
      }

      waterProof.save();
      res.status(200).json({
        success: true,
        message: "Upload Success.",
        user_id: req.userId,
        data: file.name,
      });
    }
  );
});
exports.uploadFilesBeforeLandry = asyncHandler(async (req, res, next) => {
  const waterProof = await WaterProof.findById(req.params.id);

  if (!waterProof) {
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
  file.mv(
    `${process.env.FILE_UPLOAD_LANDRY_BEFORE_PATH}/${file.name}`,
    (err) => {
      if (err) {
        throw new LocalError("Upload Faild : " + err.message, 400);
      }

      waterProof.save();
      res.status(200).json({
        success: true,
        message: "Upload Success.",
        user_id: req.userId,
        data: file.name,
      });
    }
  );
});
exports.uploadFilesAfterLandry = asyncHandler(async (req, res, next) => {
  const waterProof = await WaterProof.findById(req.params.id);

  if (!waterProof) {
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
  file.mv(
    `${process.env.FILE_UPLOAD_LANDRY_AFTER_PATH}/${file.name}`,
    (err) => {
      if (err) {
        throw new LocalError("Upload Faild : " + err.message, 400);
      }

      waterProof.save();
      res.status(200).json({
        success: true,
        message: "Upload Success.",
        user_id: req.userId,
        data: file.name,
      });
    }
  );
});
exports.uploadFilesBeforeEnsuit = asyncHandler(async (req, res, next) => {
  const waterProof = await WaterProof.findById(req.params.id);

  if (!waterProof) {
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
  file.mv(
    `${process.env.FILE_UPLOAD_ENSUIT_BEFORE_PATH}/${file.name}`,
    (err) => {
      if (err) {
        throw new LocalError("Upload Faild : " + err.message, 400);
      }

      waterProof.save();
      res.status(200).json({
        success: true,
        message: "Upload Success.",
        user_id: req.userId,
        data: file.name,
      });
    }
  );
});
exports.uploadFilesAfterEnsuit = asyncHandler(async (req, res, next) => {
  const waterProof = await WaterProof.findById(req.params.id);

  if (!waterProof) {
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
  file.mv(
    `${process.env.FILE_UPLOAD_ENSUIT_AFTER_PATH}/${file.name}`,
    (err) => {
      if (err) {
        throw new LocalError("Upload Faild : " + err.message, 400);
      }

      waterProof.save();
      res.status(200).json({
        success: true,
        message: "Upload Success.",
        user_id: req.userId,
        data: file.name,
      });
    }
  );
});
exports.imagesBalconyBefore = asyncHandler(async (req, res, next) => {
  try {
    const imageAll = await fs.readdirSync("./public/uploads/balcony/before");
    res.status(200).json({
      success: true,
      count: imageAll.length,
      data: imageAll,
    });
  } catch (err) {
    res.status(500).json(err);
  }
});
exports.imagesBalconyAfter = asyncHandler(async (req, res, next) => {
  try {
    const imageAll = await fs.readdirSync("./public/uploads/balcony/after");
    res.status(200).json({
      success: true,
      count: imageAll.length,
      data: imageAll,
    });
  } catch (err) {
    res.status(500).json(err);
  }
});
exports.generatePDFBalconyBefore = asyncHandler(async (req, res, next) => {
  const waterProof = await WaterProof.findById(req.params.id);
  if (!waterProof) {
    throw new LocalError(req + "No data", 404);
  }
  function buildPDF(dataCallback, endCallback) {
    const doc = new PDFDocument({ bufferPages: true, font: "Courier" });
    doc.on("data", dataCallback);
    doc.on("end", endCallback);
    doc
      .fontSize(12)
      .text(`Level : ${waterProof?.before?.[0].balcony?.[0].level}`);
    doc
      .fontSize(12)
      .text(`Angle : ${waterProof?.before?.[0].balcony?.[0].angle}`);
    doc
      .fontSize(12)
      .text(`Concrate : ${waterProof?.before?.[0].balcony?.[0].concrate}`);
    doc
      .fontSize(12)
      .text(`Patch : ${waterProof?.before?.[0].balcony?.[0].patch}`);
    doc
      .fontSize(12)
      .text(
        `Sub straight : ${waterProof?.before?.[0].balcony?.[0].subStraight}`
      );
    doc.image(
      `public/uploads/balcony/before/${waterProof?.before?.[0].balcony?.[0].photo?.[0].fileName}`,
      {
        fit: [250, 400],
        align: "center",
        valign: "center",
      }
    );
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
exports.generatePDFBalconyAfter = asyncHandler(async (req, res, next) => {
  const waterProof = await WaterProof.findById(req.params.id);
  if (!waterProof) {
    throw new LocalError(req + "No data", 404);
  }
  function buildPDF(dataCallback, endCallback) {
    const doc = new PDFDocument({ bufferPages: true, font: "Courier" });
    doc.on("data", dataCallback);
    doc.on("end", endCallback);
    doc
      .fontSize(12)
      .text(`Level : ${waterProof?.after?.[0].balcony?.[0].level}`);
    doc
      .fontSize(12)
      .text(`Angle : ${waterProof?.after?.[0].balcony?.[0].angle}`);
    doc
      .fontSize(12)
      .text(`Concrate : ${waterProof?.after?.[0].balcony?.[0].concrate}`);
    doc
      .fontSize(12)
      .text(`Patch : ${waterProof?.after?.[0].balcony?.[0].patch}`);
    doc
      .fontSize(12)
      .text(
        `Sub straight : ${waterProof?.after?.[0].balcony?.[0].subStraight}`
      );
    doc.image(
      `public/uploads/balcony/after/${waterProof?.after?.[0].balcony?.[0].photo?.[0].fileName}`,
      {
        fit: [250, 400],
        align: "center",
        valign: "center",
      }
    );
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
exports.generatePDFBathroomBefore = asyncHandler(async (req, res, next) => {
  const waterProof = await WaterProof.findById(req.params.id);
  if (!waterProof) {
    throw new LocalError(req + "No data", 404);
  }
  function buildPDF(dataCallback, endCallback) {
    const doc = new PDFDocument({ bufferPages: true, font: "Courier" });
    doc.on("data", dataCallback);
    doc.on("end", endCallback);
    doc
      .fontSize(12)
      .text(`Level : ${waterProof?.before?.[0].bathroom?.[0].level}`);
    doc
      .fontSize(12)
      .text(`Angle : ${waterProof?.before?.[0].bathroom?.[0].angle}`);
    doc
      .fontSize(12)
      .text(`Concrate : ${waterProof?.before?.[0].bathroom?.[0].concrate}`);
    doc
      .fontSize(12)
      .text(`Patch : ${waterProof?.before?.[0].bathroom?.[0].patch}`);
    doc
      .fontSize(12)
      .text(
        `Sub straight : ${waterProof?.before?.[0].bathroom?.[0].subStraight}`
      );
    doc.image(
      `public/uploads/bathroom/before/${waterProof?.before?.[0].bathroom?.[0].photo?.[0].fileName}`,
      {
        fit: [250, 400],
        align: "center",
        valign: "center",
      }
    );
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
exports.generatePDFBathroomAfter = asyncHandler(async (req, res, next) => {
  const waterProof = await WaterProof.findById(req.params.id);
  if (!waterProof) {
    throw new LocalError(req + "No data", 404);
  }
  function buildPDF(dataCallback, endCallback) {
    const doc = new PDFDocument({ bufferPages: true, font: "Courier" });
    doc.on("data", dataCallback);
    doc.on("end", endCallback);
    doc
      .fontSize(12)
      .text(`Level : ${waterProof?.after?.[0].bathroom?.[0].level}`);
    doc
      .fontSize(12)
      .text(`Angle : ${waterProof?.after?.[0].bathroom?.[0].angle}`);
    doc
      .fontSize(12)
      .text(`Concrate : ${waterProof?.after?.[0].bathroom?.[0].concrate}`);
    doc
      .fontSize(12)
      .text(`Patch : ${waterProof?.after?.[0].bathroom?.[0].patch}`);
    doc
      .fontSize(12)
      .text(
        `Sub straight : ${waterProof?.after?.[0].bathroom?.[0].subStraight}`
      );
    doc.image(
      `public/uploads/bathroom/after/${waterProof?.after?.[0].bathroom?.[0].photo?.[0].fileName}`,
      {
        fit: [250, 400],
        align: "center",
        valign: "center",
      }
    );
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
exports.generatePDFLaundryBefore = asyncHandler(async (req, res, next) => {
  const waterProof = await WaterProof.findById(req.params.id);
  if (!waterProof) {
    throw new LocalError(req + "No data", 404);
  }
  function buildPDF(dataCallback, endCallback) {
    const doc = new PDFDocument({ bufferPages: true, font: "Courier" });
    doc.on("data", dataCallback);
    doc.on("end", endCallback);
    doc
      .fontSize(12)
      .text(`Level : ${waterProof?.before?.[0].landry?.[0].level}`);
    doc
      .fontSize(12)
      .text(`Angle : ${waterProof?.before?.[0].landry?.[0].angle}`);
    doc
      .fontSize(12)
      .text(`Concrate : ${waterProof?.before?.[0].landry?.[0].concrate}`);
    doc
      .fontSize(12)
      .text(`Patch : ${waterProof?.before?.[0].landry?.[0].patch}`);
    doc
      .fontSize(12)
      .text(
        `Sub straight : ${waterProof?.before?.[0].landry?.[0].subStraight}`
      );
    doc.image(
      `public/uploads/landry/before/${waterProof?.before?.[0].landry?.[0].photo?.[0].fileName}`,
      {
        fit: [250, 400],
        align: "center",
        valign: "center",
      }
    );
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
exports.generatePDFLaundryAfter = asyncHandler(async (req, res, next) => {
  const waterProof = await WaterProof.findById(req.params.id);
  if (!waterProof) {
    throw new LocalError(req + "No data", 404);
  }
  function buildPDF(dataCallback, endCallback) {
    const doc = new PDFDocument({ bufferPages: true, font: "Courier" });
    doc.on("data", dataCallback);
    doc.on("end", endCallback);
    doc
      .fontSize(12)
      .text(`Level : ${waterProof?.after?.[0].landry?.[0].level}`);
    doc
      .fontSize(12)
      .text(`Angle : ${waterProof?.after?.[0].landry?.[0].angle}`);
    doc
      .fontSize(12)
      .text(`Concrate : ${waterProof?.after?.[0].landry?.[0].concrate}`);
    doc
      .fontSize(12)
      .text(`Patch : ${waterProof?.after?.[0].landry?.[0].patch}`);
    doc
      .fontSize(12)
      .text(`Sub straight : ${waterProof?.after?.[0].landry?.[0].subStraight}`);
    doc.image(
      `public/uploads/landry/after/${waterProof?.after?.[0].landry?.[0].photo?.[0].fileName}`,
      {
        fit: [250, 400],
        align: "center",
        valign: "center",
      }
    );
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
exports.generatePDFEnsuiteBefore = asyncHandler(async (req, res, next) => {
  const waterProof = await WaterProof.findById(req.params.id);
  if (!waterProof) {
    throw new LocalError(req + "No data", 404);
  }
  function buildPDF(dataCallback, endCallback) {
    const doc = new PDFDocument({ bufferPages: true, font: "Courier" });
    doc.on("data", dataCallback);
    doc.on("end", endCallback);
    doc
      .fontSize(12)
      .text(`Level : ${waterProof?.before?.[0].ensuit?.[0].level}`);
    doc
      .fontSize(12)
      .text(`Angle : ${waterProof?.before?.[0].ensuit?.[0].angle}`);
    doc
      .fontSize(12)
      .text(`Concrate : ${waterProof?.before?.[0].ensuit?.[0].concrate}`);
    doc
      .fontSize(12)
      .text(`Patch : ${waterProof?.before?.[0].ensuit?.[0].patch}`);
    doc
      .fontSize(12)
      .text(
        `Sub straight : ${waterProof?.before?.[0].ensuit?.[0].subStraight}`
      );
    doc.image(
      `public/uploads/ensuit/before/${waterProof?.before?.[0].ensuit?.[0].photo?.[0].fileName}`,
      {
        fit: [250, 400],
        align: "center",
        valign: "center",
      }
    );
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
exports.generatePDFEnsuiteAfter = asyncHandler(async (req, res, next) => {
  const waterProof = await WaterProof.findById(req.params.id);
  if (!waterProof) {
    throw new LocalError(req + "No data", 404);
  }
  function buildPDF(dataCallback, endCallback) {
    const doc = new PDFDocument({ bufferPages: true, font: "Courier" });
    doc.on("data", dataCallback);
    doc.on("end", endCallback);
    doc
      .fontSize(12)
      .text(`Level : ${waterProof?.after?.[0].ensuit?.[0].level}`);
    doc
      .fontSize(12)
      .text(`Angle : ${waterProof?.after?.[0].ensuit?.[0].angle}`);
    doc
      .fontSize(12)
      .text(`Concrate : ${waterProof?.after?.[0].ensuit?.[0].concrate}`);
    doc
      .fontSize(12)
      .text(`Patch : ${waterProof?.after?.[0].ensuit?.[0].patch}`);
    doc
      .fontSize(12)
      .text(`Sub straight : ${waterProof?.after?.[0].ensuit?.[0].subStraight}`);
    doc.image(
      `public/uploads/ensuit/after/${waterProof?.after?.[0].ensuit?.[0].photo?.[0].fileName}`,
      {
        fit: [250, 400],
        align: "center",
        valign: "center",
      }
    );
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
exports.sendGmailBalconyBefore = asyncHandler(async (req, res, nex) => {
  if (!req.body.email) {
    throw new LocalError("Please enter your Email", 400);
  }
  const waterProof = await WaterProof.findById(req.params.id);
  if (!waterProof) {
    throw new LocalError(req + "No data", 404);
  }
  const user = req.body.email;
  const link = `${process.env.MAIL_HOST}/api/v1/waterproof/${waterProof._id}/pdf/balcony/b`;
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
exports.sendGmailBalconyAfter = asyncHandler(async (req, res, nex) => {
  if (!req.body.email) {
    throw new LocalError("Please enter your Email", 400);
  }
  const waterProof = await WaterProof.findById(req.params.id);
  if (!waterProof) {
    throw new LocalError(req + "No data", 404);
  }
  const user = req.body.email;
  const link = `${process.env.MAIL_HOST}/api/v1/waterproof/${waterProof._id}/pdf/balcony/a`;
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
exports.sendGmailBathroomBefore = asyncHandler(async (req, res, nex) => {
  if (!req.body.email) {
    throw new LocalError("Please enter your Email", 400);
  }
  const waterProof = await WaterProof.findById(req.params.id);
  if (!waterProof) {
    throw new LocalError(req + "No data", 404);
  }
  const user = req.body.email;
  const link = `${process.env.MAIL_HOST}/api/v1/waterproof/${waterProof._id}/pdf/bathroom/b`;
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
exports.sendGmailBathroomAfter = asyncHandler(async (req, res, nex) => {
  if (!req.body.email) {
    throw new LocalError("Please enter your Email", 400);
  }
  const waterProof = await WaterProof.findById(req.params.id);
  if (!waterProof) {
    throw new LocalError(req + "No data", 404);
  }
  const user = req.body.email;
  const link = `${process.env.MAIL_HOST}/api/v1/waterproof/${waterProof._id}/pdf/bathroom/a`;
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
exports.sendGmailLaundryBefore = asyncHandler(async (req, res, nex) => {
  if (!req.body.email) {
    throw new LocalError("Please enter your Email", 400);
  }
  const waterProof = await WaterProof.findById(req.params.id);
  if (!waterProof) {
    throw new LocalError(req + "No data", 404);
  }
  const user = req.body.email;
  const link = `${process.env.MAIL_HOST}/api/v1/waterproof/${waterProof._id}/pdf/laundry/b`;
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
exports.sendGmailLaundryAfter = asyncHandler(async (req, res, nex) => {
  if (!req.body.email) {
    throw new LocalError("Please enter your Email", 400);
  }
  const waterProof = await WaterProof.findById(req.params.id);
  if (!waterProof) {
    throw new LocalError(req + "No data", 404);
  }
  const user = req.body.email;
  const link = `${process.env.MAIL_HOST}/api/v1/waterproof/${waterProof._id}/pdf/laundry/a`;
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
exports.sendGmailEnsuiteBefore = asyncHandler(async (req, res, nex) => {
  if (!req.body.email) {
    throw new LocalError("Please enter your Email", 400);
  }
  const waterProof = await WaterProof.findById(req.params.id);
  if (!waterProof) {
    throw new LocalError(req + "No data", 404);
  }
  const user = req.body.email;
  const link = `${process.env.MAIL_HOST}/api/v1/waterproof/${waterProof._id}/pdf/ensuite/b`;
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
exports.sendGmailEnsuiteAfter = asyncHandler(async (req, res, nex) => {
  if (!req.body.email) {
    throw new LocalError("Please enter your Email", 400);
  }
  const waterProof = await WaterProof.findById(req.params.id);
  if (!waterProof) {
    throw new LocalError(req + "No data", 404);
  }
  const user = req.body.email;
  const link = `${process.env.MAIL_HOST}/api/v1/waterproof/${waterProof._id}/pdf/ensuite/a`;
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
