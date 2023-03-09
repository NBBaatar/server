const Tile = require("../models/tile");
const Unit = require("../models/unit");
const path = require("path");
const LocalError = require("../utils/locaError");
const asyncHandler = require("../middleware/asyncHandler");
const user = require("../models/user");
const PDFDocument = require("pdfkit");
const sendEmail = require("../utils/sendGmail");
const fs = require("fs");
exports.getUnitTiles = asyncHandler(async (req, res, next) => {
  let query;
  if (req.params.unitId) {
    query = Tile.find({ unit: req.params.unitId });
  } else {
    query = Tile.find();
  }
  const tile = await query;
  res.status(200).json({
    success: true,
    message: "Request success.",
    count: tile.length,
    data: tile,
  });
});
exports.getTile = asyncHandler(async (req, res, next) => {
  const tile = await Tile.findById(req.params.id);
  if (!tile) {
    throw new LocalError(req + " No any Data.", 404);
  }
  res.status(200).json({
    success: true,
    message: "Request success.",
    data: tile,
  });
});
//Эхлээд холбогдож байгаа collection оо find хийгээд дараа нь insert хийнэ.
exports.createTile = asyncHandler(async (req, res, next) => {
  const unit = await Unit.findById(req.body.unit);
  if (!unit) {
    throw new LocalError(req.body.unit + " ID is not include any Datа.", 404);
  }
  const tile = await Tile.create(req.body);
  res.status(200).json({
    success: true,
    message: "New Tile insert success.",
    user_id: req.userId,
    data: tile,
  });
});
exports.updateTile = asyncHandler(async (req, res, next) => {
  const tile = await Tile.findById(req.params.id);
  if (!tile) {
    throw new LocalError(req.params.id + " ID is not include any Data.", 404);
  }
  if (tile.created_user !== req.userId && req.userRole !== "admin") {
    throw new LocalError("You just update your post. Not other's post", 404);
  }
  req.body.updated_user = req.userId;
  for (let attr in req.body) {
    (tile[attr] = req.body[attr]), { new: true, runValidators: true };
  }
  tile.save();
  res.status(200).json({
    success: true,
    message: "Update Success.",
    user_id: req.userId,
    data: tile,
  });
});
exports.deleteTile = asyncHandler(async (req, res, next) => {
  const tile = await Tile.findById(req.params.id);
  if (!tile) {
    throw new LocalError(req.params.id + " ID is not include any Datа.", 404);
  }
  tile.remove();

  res.status(200).json({
    success: true,
    message: "Delete Success.",
    user_id: req.userId,
    data: tile,
  });
});
exports.getUserTiles = asyncHandler(async (req, res, next) => {
  //Get Requist
  req.query.created_user = req.userId;
  const tile = await Tile.find(req.query);
  res.status(200).json({
    success: true,
    message: "Request success.",
    user_id: req.userId,
    count: tile.length,
    data: tile,
  });
});
exports.uploadFilesTilesBalcony = asyncHandler(async (req, res, next) => {
  const tile = await Tile.findById(req.params.id);

  if (!tile) {
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
    `${process.env.FILE_UPLOAD_TILES_BATHROOM_PATH}/${file.name}`,
    (err) => {
      if (err) {
        throw new LocalError("Upload Faild : " + err.message, 400);
      }

      tile.save();
      res.status(200).json({
        success: true,
        message: "Upload Success.",
        user_id: req.userId,
        data: file.name,
      });
    }
  );
});
exports.uploadFilesTilesEnsuite = asyncHandler(async (req, res, next) => {
  const tile = await Tile.findById(req.params.id);

  if (!tile) {
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
    `${process.env.FILE_UPLOAD_TILES_ENSUITE_PATH}/${file.name}`,
    (err) => {
      if (err) {
        throw new LocalError("Upload Faild : " + err.message, 400);
      }

      tile.save();
      res.status(200).json({
        success: true,
        message: "Upload Success.",
        user_id: req.userId,
        data: file.name,
      });
    }
  );
});
exports.uploadFilesTilesKitchen = asyncHandler(async (req, res, next) => {
  const tile = await Tile.findById(req.params.id);

  if (!tile) {
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
    `${process.env.FILE_UPLOAD_TILES_KITCHEN_PATH}/${file.name}`,
    (err) => {
      if (err) {
        throw new LocalError("Upload Faild : " + err.message, 400);
      }

      tile.save();
      res.status(200).json({
        success: true,
        message: "Upload Success.",
        user_id: req.userId,
        data: file.name,
      });
    }
  );
});
exports.uploadFilesTilesLaundry = asyncHandler(async (req, res, next) => {
  const tile = await Tile.findById(req.params.id);

  if (!tile) {
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
    `${process.env.FILE_UPLOAD_TILES_LAUNDRY_PATH}/${file.name}`,
    (err) => {
      if (err) {
        throw new LocalError("Upload Faild : " + err.message, 400);
      }

      tile.save();
      res.status(200).json({
        success: true,
        message: "Upload Success.",
        user_id: req.userId,
        data: file.name,
      });
    }
  );
});
exports.imagesGetTilesBalcony = asyncHandler(async (req, res, next) => {
  try {
    const imageAll = await fs.readdirSync("./public/uploads/tiles/bathroom");
    res.status(200).json({
      success: true,
      count: imageAll.length,
      data: imageAll,
    });
  } catch (err) {
    res.status(500).json(err);
  }
});
exports.imagesGetTilesEnsuite = asyncHandler(async (req, res, next) => {
  try {
    const imageAll = await fs.readdirSync("./public/uploads/tiles/ensuite");
    res.status(200).json({
      success: true,
      count: imageAll.length,
      data: imageAll,
    });
  } catch (err) {
    res.status(500).json(err);
  }
});
exports.imagesGetTilesKitchen = asyncHandler(async (req, res, next) => {
  try {
    const imageAll = await fs.readdirSync("./public/uploads/tiles/kitchen");
    res.status(200).json({
      success: true,
      count: imageAll.length,
      data: imageAll,
    });
  } catch (err) {
    res.status(500).json(err);
  }
});
exports.imagesGetTilesLaundry = asyncHandler(async (req, res, next) => {
  try {
    const imageAll = await fs.readdirSync("./public/uploads/tiles/laundry");
    res.status(200).json({
      success: true,
      count: imageAll.length,
      data: imageAll,
    });
  } catch (err) {
    res.status(500).json(err);
  }
});
exports.generatePDFKitchen = asyncHandler(async (req, res, next) => {
  const tile = await Tile.findById(req.params.id);
  if (!tile) {
    throw new LocalError(req + "No data", 404);
  }
  function buildPDF(dataCallback, endCallback) {
    const doc = new PDFDocument({ bufferPages: true, font: "Courier" });
    doc.on("data", dataCallback);
    doc.on("end", endCallback);
    doc.fontSize(12).text(`Status : ${tile?.kitchen?.[0].statusOf}`);
    doc.fontSize(12).text(`Reason : ${tile?.kitchen?.[0].reason}`);
    doc.fontSize(12).text(`Fire rate : ${tile?.kitchen?.[0].fireRating}`);
    doc.image(
      `public/uploads/tiles/kitchen/${tile?.kitchen?.[0].photo?.[0].fileName}`,
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
exports.generatePDFBathroom = asyncHandler(async (req, res, next) => {
  const tile = await Tile.findById(req.params.id);
  if (!tile) {
    throw new LocalError(req + "No data", 404);
  }
  function buildPDF(dataCallback, endCallback) {
    const doc = new PDFDocument({ bufferPages: true, font: "Courier" });
    doc.on("data", dataCallback);
    doc.on("end", endCallback);
    doc.fontSize(12).text(`Status : ${tile?.bathroom?.[0].statusOf}`);
    doc.fontSize(12).text(`Reason : ${tile?.bathroom?.[0].reason}`);
    doc.fontSize(12).text(`Fire rate : ${tile?.bathroom?.[0].fireRating}`);
    doc.image(
      `public/uploads/tiles/bathroom/${tile?.bathroom?.[0].photo?.[0].fileName}`,
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
exports.generatePDFEnsuite = asyncHandler(async (req, res, next) => {
  const tile = await Tile.findById(req.params.id);
  if (!tile) {
    throw new LocalError(req + "No data", 404);
  }
  function buildPDF(dataCallback, endCallback) {
    const doc = new PDFDocument({ bufferPages: true, font: "Courier" });
    doc.on("data", dataCallback);
    doc.on("end", endCallback);
    doc.fontSize(12).text(`Status : ${tile?.ensuite?.[0].statusOf}`);
    doc.fontSize(12).text(`Reason : ${tile?.ensuite?.[0].reason}`);
    doc.fontSize(12).text(`Fire rate : ${tile?.ensuite?.[0].fireRating}`);
    doc.image(
      `public/uploads/tiles/ensuite/${tile?.ensuite?.[0].photo?.[0].fileName}`,
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
exports.generatePDFLaundry = asyncHandler(async (req, res, next) => {
  const tile = await Tile.findById(req.params.id);
  if (!tile) {
    throw new LocalError(req + "No data", 404);
  }
  function buildPDF(dataCallback, endCallback) {
    const doc = new PDFDocument({ bufferPages: true, font: "Courier" });
    doc.on("data", dataCallback);
    doc.on("end", endCallback);
    doc.fontSize(12).text(`Status : ${tile?.laundry?.[0].statusOf}`);
    doc.fontSize(12).text(`Reason : ${tile?.laundry?.[0].reason}`);
    doc.fontSize(12).text(`Fire rate : ${tile?.laundry?.[0].fireRating}`);
    doc.image(
      `public/uploads/tiles/laundry/${tile?.laundry?.[0].photo?.[0].fileName}`,
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
exports.sendGmailKitchen = asyncHandler(async (req, res, nex) => {
  if (!req.body.email) {
    throw new LocalError("Please enter your Email", 400);
  }
  const tile = await Tile.findById(req.params.id);
  if (!tile) {
    throw new LocalError(req + "No data", 404);
  }
  const user = req.body.email;
  const link = `${process.env.MAIL_HOST}/api/v1/tiles/${tile._id}/kitchen/pdf`;
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
exports.sendGmailBathroom = asyncHandler(async (req, res, nex) => {
  if (!req.body.email) {
    throw new LocalError("Please enter your Email", 400);
  }
  const tile = await Tile.findById(req.params.id);
  if (!tile) {
    throw new LocalError(req + "No data", 404);
  }
  const user = req.body.email;
  const link = `${process.env.MAIL_HOST}/api/v1/tiles/${tile._id}/bathroom/pdf`;
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
exports.sendGmailEnsuite = asyncHandler(async (req, res, nex) => {
  if (!req.body.email) {
    throw new LocalError("Please enter your Email", 400);
  }
  const tile = await Tile.findById(req.params.id);
  if (!tile) {
    throw new LocalError(req + "No data", 404);
  }
  const user = req.body.email;
  const link = `${process.env.MAIL_HOST}/api/v1/tiles/${tile._id}/ensuite/pdf`;
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
exports.sendGmailLaundry = asyncHandler(async (req, res, nex) => {
  if (!req.body.email) {
    throw new LocalError("Please enter your Email", 400);
  }
  const tile = await Tile.findById(req.params.id);
  if (!tile) {
    throw new LocalError(req + "No data", 404);
  }
  const user = req.body.email;
  const link = `${process.env.MAIL_HOST}/api/v1/tiles/${tile._id}/laundry/pdf`;
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
