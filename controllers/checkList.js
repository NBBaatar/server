const CheckList = require("../models/checkList");
const Unit = require("../models/unit");
const path = require("path");
const LocalError = require("../utils/locaError");
const asyncHandler = require("../middleware/asyncHandler");
const user = require("../models/user");
const PDFDocument = require("pdfkit");
const sendEmail = require("../utils/sendGmail");
const fs = require("fs");
exports.getUnitCheckList = asyncHandler(async (req, res, next) => {
  let query;
  if (req.params.unitId) {
    query = CheckList.find({ unit: req.params.unitId });
  } else {
    query = CheckList.find();
  }
  const checkList = await query;
  res.status(200).json({
    success: true,
    message: "Request success.",
    count: checkList.length,
    data: checkList,
  });
});
exports.getCheckList = asyncHandler(async (req, res, next) => {
  const checkList = await CheckList.findById(req.params.id);
  if (!checkList) {
    throw new LocalError(req + " No any Data.", 404);
  }
  res.status(200).json({
    success: true,
    message: "Request success.",
    data: checkList,
  });
});
//Эхлээд холбогдож байгаа collection оо find хийгээд дараа нь insert хийнэ.
exports.createCheckList = asyncHandler(async (req, res, next) => {
  const unit = await Unit.findById(req.body.unit);
  if (!unit) {
    throw new LocalError(req.body.unit + " ID is not include any Datа.", 404);
  }
  const checkList = await CheckList.create(req.body);
  res.status(200).json({
    success: true,
    message: "New List insert success.",
    user_id: req.userId,
    data: checkList,
  });
});
exports.updateCheckList = asyncHandler(async (req, res, next) => {
  const checkList = await CheckList.findById(req.params.id);
  if (!checkList) {
    throw new LocalError(req.params.id + " ID is not include any Data.", 404);
  }
  if (checkList.created_user !== req.userId && req.userRole !== "admin") {
    throw new LocalError("You just update your post. Not other's post", 404);
  }
  req.body.updated_user = req.userId;
  for (let attr in req.body) {
    (checkList[attr] = req.body[attr]), { new: true, runValidators: true };
  }
  checkList.save();
  res.status(200).json({
    success: true,
    message: "Update Success.",
    user_id: req.userId,
    data: checkList,
  });
});
exports.deleteCheckList = asyncHandler(async (req, res, next) => {
  const checkList = await CheckList.findById(req.params.id);
  if (!checkList) {
    throw new LocalError(req.params.id + " ID is not include any Datа.", 404);
  }
  checkList.remove();

  res.status(200).json({
    success: true,
    message: "Delete Success.",
    user_id: req.userId,
    data: checkList,
  });
});
exports.getUserCheckList = asyncHandler(async (req, res, next) => {
  //Get Requist
  req.query.created_user = req.userId;
  const checkList = await CheckList.find(req.query);
  res.status(200).json({
    success: true,
    message: "Request success.",
    user_id: req.userId,
    count: checkList.length,
    data: checkList,
  });
});
exports.generatePDFWater = asyncHandler(async (req, res, next) => {
  const checkList = await CheckList.findById(req.params.id);
  if (!checkList) {
    throw new LocalError(req + "No data", 404);
  }
  function buildPDF(dataCallback, endCallback) {
    var today = new Date();
    var dd = String(today.getDate()).padStart(2, "0");
    var mm = String(today.getMonth() + 1).padStart(2, "0"); //January is 0!
    var yyyy = today.getFullYear();
    today = mm + "/" + dd + "/" + yyyy;
    const signature = `Contractor Signature:_______________      Date: ${today}`;
    const doc = new PDFDocument({ bufferPages: true, font: "Courier" });
    doc.on("data", dataCallback);
    doc.on("end", endCallback);
    doc.fontSize(16).text(`ITP -Waterproofing`, { align: "center" });
    doc.moveDown();
    doc.fontSize(14).text(`Wet Area: Bathroom: `);
    doc.moveDown();
    doc.fontSize(12)
      .text(`Conduct a physical inspection of the workmanship, Are there any visible defects or
    holes? : ${checkList?.water?.[0].bathroom?.[0].workmanship}`);
    doc
      .fontSize(12)
      .text(
        `Has the blue board stopped 10mm short off the floor for movement? : ${checkList?.water?.[0].bathroom?.[0].blueBoard}`
      );
    doc
      .fontSize(12)
      .text(
        `Has a flexible sealant been applied to all joints? : ${checkList?.water?.[0].bathroom?.[0].flexibleSealantAllJoint}`
      );
    doc
      .fontSize(12)
      .text(
        `Has a primer been applied to the floor and walls? : ${checkList?.water?.[0].bathroom?.[0].primerBeenFloorWall}`
      );
    doc
      .fontSize(12)
      .text(
        `Has flexible sealant been applied to the aluminium angle? : ${checkList?.water?.[0].bathroom?.[0].flexibleSealantAllAngle}`
      );
    doc
      .fontSize(12)
      .text(
        `Has a primer been applied to the angle as per specified instructions? : ${checkList?.water?.[0].bathroom?.[0].primerBeenAngle}`
      );
    doc
      .fontSize(12)
      .text(
        `Has a flexible sealant been applied around all penetrating pipes? : ${checkList?.water?.[0].bathroom?.[0].flexibleSealantAllPipe}`
      );
    doc
      .fontSize(12)
      .text(
        `Has a pipe flange been installed? : ${checkList?.water?.[0].bathroom?.[0].pipe}`
      );
    doc
      .fontSize(12)
      .text(
        `Is the angle installed before the door to keep the door frame out of the wet area? : ${checkList?.water?.[0].bathroom?.[0].angle}`
      );
    doc
      .fontSize(12)
      .text(
        `Have two coats of waterproof been applied to the floor? : ${checkList?.water?.[0].bathroom?.[0].twoCoatsFloor}`
      );
    doc
      .fontSize(12)
      .text(
        `Have two coats of waterproof been applied to the walls? : ${checkList?.water?.[0].bathroom?.[0].twoCoatsWall}`
      );
    doc
      .fontSize(12)
      .text(
        `Has the entire shower recess walls been covered with waterproof? : ${checkList?.water?.[0].bathroom?.[0].showerWall}`
      );
    doc
      .fontSize(12)
      .text(
        `Has the shower waterproof been applied to a minimum height of 1900mm? : ${checkList?.water?.[0].bathroom?.[0].showerHeight}`
      );
    doc.fontSize(12).text(
      `Has the waterproof to the walls outside the shower been applied to a minimum
        height of 150mm? : ${checkList?.water?.[0].bathroom?.[0].showerOutside}`
    );
    doc
      .fontSize(12)
      .text(
        `Has the waterproof been applied to the basin wall? : ${checkList?.water?.[0].bathroom?.[0].basinWall}`
      );
    doc
      .fontSize(12)
      .text(
        `Has a 24 hr waterproof flood test been completed? Certify it is holding water? : ${checkList?.water?.[0].bathroom?.[0].floodTest}`
      );
    doc
      .fontSize(12)
      .text(
        `Have photographic evidence been taken of the wet area : ${checkList?.water?.[0].bathroom?.[0].photoCheck}`
      );
    doc.moveDown();
    doc.fontSize(14).text(`Wet Area: Ensuite: `);
    doc.moveDown();
    doc.fontSize(12)
      .text(`Conduct a physical inspection of the workmanship, Are there any visible defects or
      holes? : ${checkList?.water?.[0].ensuite?.[0].workmanship}`);
    doc
      .fontSize(12)
      .text(
        `Has the blue board stopped 10mm short off the floor for movement?: ${checkList?.water?.[0].ensuite?.[0].blueBoard}`
      );
    doc
      .fontSize(12)
      .text(
        `Has a flexible sealant been applied to all joints? : ${checkList?.water?.[0].ensuite?.[0].flexibleSealantAllJoint}`
      );
    doc
      .fontSize(12)
      .text(
        `Has a primer been applied to the floor and walls? : ${checkList?.water?.[0].ensuite?.[0].primerBeenFloorWall}`
      );
    doc
      .fontSize(12)
      .text(
        `Has flexible sealant been applied to the aluminium angle? : ${checkList?.water?.[0].ensuite?.[0].flexibleSealantAllAngle}`
      );
    doc
      .fontSize(12)
      .text(
        `Has a primer been applied to the angle as per specified instructions? : ${checkList?.water?.[0].ensuite?.[0].primerBeenAngle}`
      );
    doc
      .fontSize(12)
      .text(
        `Has a flexible sealant been applied around all penetrating pipes? : ${checkList?.water?.[0].ensuite?.[0].flexibleSealantAllPipe}`
      );
    doc
      .fontSize(12)
      .text(
        `Has a pipe flange been installed? : ${checkList?.water?.[0].ensuite?.[0].pipe}`
      );
    doc
      .fontSize(12)
      .text(
        `Is the angle installed before the door to keep the door frame out of the wet area? : ${checkList?.water?.[0].ensuite?.[0].angle}`
      );
    doc
      .fontSize(12)
      .text(
        `Have two coats of waterproof been applied to the floor? : ${checkList?.water?.[0].ensuite?.[0].twoCoatsFloor}`
      );
    doc
      .fontSize(12)
      .text(
        `Have two coats of waterproof been applied to the walls? : ${checkList?.water?.[0].ensuite?.[0].twoCoatsWall}`
      );
    doc
      .fontSize(12)
      .text(
        `Has the entire shower recess walls been covered with waterproof? : ${checkList?.water?.[0].ensuite?.[0].showerWall}`
      );
    doc
      .fontSize(12)
      .text(
        `Has the shower waterproof been applied to a minimum height of 1900mm? : ${checkList?.water?.[0].ensuite?.[0].showerHeight}`
      );
    doc.fontSize(12).text(
      `Has the waterproof to the walls outside the shower been applied to a minimum
        height of 150mm? : ${checkList?.water?.[0].ensuite?.[0].showerOutside}`
    );
    doc
      .fontSize(12)
      .text(
        `Has the waterproof been applied to the basin wall? : ${checkList?.water?.[0].ensuite?.[0].basinWall}`
      );
    doc
      .fontSize(12)
      .text(
        `Has a 24 hr waterproof flood test been completed? Certify it is holding water? : ${checkList?.water?.[0].ensuite?.[0].floodTest}`
      );
    doc
      .fontSize(12)
      .text(
        `Have photographic evidence been taken of the wet area : ${checkList?.water?.[0].ensuite?.[0].photoCheck}`
      );
    doc.moveDown();
    doc.fontSize(14).text(`Wet Area: Laundry: `);
    doc.moveDown();
    doc.fontSize(12)
      .text(`Conduct a physical inspection of the workmanship, Are there any visible defects or
      holes? : ${checkList?.water?.[0].laundry?.[0].workmanship}`);
    doc
      .fontSize(12)
      .text(
        `Has the blue board stopped 10mm short off the floor for movement?: ${checkList?.water?.[0].laundry?.[0].blueBoard}`
      );
    doc
      .fontSize(12)
      .text(
        `Has a flexible sealant been applied to all joints? : ${checkList?.water?.[0].laundry?.[0].flexibleSealantAllJoint}`
      );
    doc
      .fontSize(12)
      .text(
        `Has a primer been applied to the floor and walls? : ${checkList?.water?.[0].laundry?.[0].primerBeenFloorWall}`
      );
    doc
      .fontSize(12)
      .text(
        `Has flexible sealant been applied to the aluminium angle? : ${checkList?.water?.[0].laundry?.[0].flexibleSealantAllAngle}`
      );
    doc
      .fontSize(12)
      .text(
        `Has a primer been applied to the angle as per specified instructions? : ${checkList?.water?.[0].laundry?.[0].primerBeenAngle}`
      );
    doc
      .fontSize(12)
      .text(
        `Has a flexible sealant been applied around all penetrating pipes? : ${checkList?.water?.[0].laundry?.[0].flexibleSealantAllPipe}`
      );
    doc
      .fontSize(12)
      .text(
        `Has a pipe flange been installed? : ${checkList?.water?.[0].laundry?.[0].pipe}`
      );
    doc
      .fontSize(12)
      .text(
        `Is the angle installed before the door to keep the door frame out of the wet area? : ${checkList?.water?.[0].laundry?.[0].angle}`
      );
    doc
      .fontSize(12)
      .text(
        `Have two coats of waterproof been applied to the floor? : ${checkList?.water?.[0].laundry?.[0].twoCoatsFloor}`
      );
    doc
      .fontSize(12)
      .text(
        `Have two coats of waterproof been applied to the walls? : ${checkList?.water?.[0].laundry?.[0].twoCoatsWall}`
      );
    doc
      .fontSize(12)
      .text(
        `Has the entire shower recess walls been covered with waterproof? : ${checkList?.water?.[0].laundry?.[0].showerWall}`
      );
    doc.fontSize(12).text(
      `Has the waterproof to the walls outside the shower been applied to a minimum
        height of 150mm? : ${checkList?.water?.[0].laundry?.[0].showerOutside}`
    );
    doc
      .fontSize(12)
      .text(
        `Has the waterproof been applied to the basin wall? : ${checkList?.water?.[0].laundry?.[0].basinWall}`
      );
    doc
      .fontSize(12)
      .text(
        `Has a 24 hr waterproof flood test been completed? Certify it is holding water? : ${checkList?.water?.[0].laundry?.[0].floodTest}`
      );
    doc
      .fontSize(12)
      .text(
        `Have photographic evidence been taken of the wet area : ${checkList?.water?.[0].laundry?.[0].photoCheck}`
      );
    doc.moveDown();
    doc.fontSize(14).text(`Wet Area: Balcony: `);
    doc.moveDown();
    doc.fontSize(12).text(
      `Conduct a physical inspection of the workmanship, Are there any visible defects or
        holes?: ${checkList?.water?.[0].balcony?.[0].workmanship}`
    );
    doc
      .fontSize(12)
      .text(
        `Has the sliding door hob been waterproofed prior to the door being installed?: ${checkList?.water?.[0].balcony?.[0].doorHob}`
      );
    doc
      .fontSize(12)
      .text(
        `Has a flexible sealant been applied to all joints?: ${checkList?.water?.[0].balcony?.[0].flexibleSealant}`
      );
    doc
      .fontSize(12)
      .text(
        `Has a primer been applied to the floor?: ${checkList?.water?.[0].balcony?.[0].primerBeen}`
      );
    doc
      .fontSize(12)
      .text(
        `Has two coats of waterproofing been applied to the floor?: ${checkList?.water?.[0].balcony?.[0].twoCoats}`
      );
    doc
      .fontSize(12)
      .text(
        `Has the waterproof been turned up the wall by a minimum of 150 mm?: ${checkList?.water?.[0].balcony?.[0].wall}`
      );
    doc
      .fontSize(12)
      .text(
        `Have photographic evidence been taken of the wet area: ${checkList?.water?.[0].balcony?.[0].photoCheck}`
      );
    doc.moveDown();
    doc.moveDown();
    doc.text(`${signature}`);
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
exports.generatePDFFire = asyncHandler(async (req, res, next) => {
  const checkList = await CheckList.findById(req.params.id);
  if (!checkList) {
    throw new LocalError(req + "No data", 404);
  }
  function buildPDF(dataCallback, endCallback) {
    var today = new Date();
    var dd = String(today.getDate()).padStart(2, "0");
    var mm = String(today.getMonth() + 1).padStart(2, "0"); //January is 0!
    var yyyy = today.getFullYear();
    today = mm + "/" + dd + "/" + yyyy;
    const signature = `Contractor Signature:_______________      Date: ${today}`;
    const doc = new PDFDocument({ bufferPages: true, font: "Courier" });
    doc.on("data", dataCallback);
    doc.on("end", endCallback);
    doc.fontSize(16).text(`ITP -Intertenancy Walls`, { align: "center" });
    doc.moveDown();
    doc
      .fontSize(12)
      .text(
        `Is the electrical rough-in finished?: ${checkList?.fire?.[0].electric}`
      );
    doc
      .fontSize(12)
      .text(
        `Is the plumbing rough-in finished?: ${checkList?.fire?.[0].plumbing}`
      );
    doc
      .fontSize(12)
      .text(
        `Is the dry fire rough-in finished?: ${checkList?.fire?.[0].dryFireRoughIn}`
      );
    doc
      .fontSize(12)
      .text(
        `Is the sprinkler rough-in finished?: ${checkList?.fire?.[0].sprinklerRoughIn}`
      );
    doc
      .fontSize(12)
      .text(
        `Is the mechanical / ac rough-in finished?: ${checkList?.fire?.[0].acRoughIn}`
      );
    doc
      .fontSize(12)
      .text(
        `Is the plywood supports installed?: ${checkList?.fire?.[0].plywoodSupports}`
      );
    doc
      .fontSize(12)
      .text(
        `Are all the windows and doors internally sealed and angles installed: ${checkList?.fire?.[0].windowDoorAngle}`
      );
    doc.fontSize(12).text(
      `Undertake a physical inspection of the entire Hebel walls and inspect for any holes,
        cracks, Breaks or fire rating issues to panels: ${checkList?.fire?.[0].HebelWalls}`
    );
    doc
      .fontSize(12)
      .text(`Is the hebel compliant?: ${checkList?.fire?.[0].hebelCompliant}`);
    doc
      .fontSize(12)
      .text(
        `Are all joints between hebel and different wall systems sealed with a flexible Sealant?: ${checkList?.fire?.[0].flexibleSealant}`
      );
    doc
      .fontSize(12)
      .text(`Specify Sealant: ${checkList?.fire?.[0].SpecifySealant}`);
    doc
      .fontSize(12)
      .text(
        `Inspect concrete walls and ensure there is no penetrations or infilled core tie holes?: ${checkList?.fire?.[0].InspectConcrete}`
      );
    doc
      .fontSize(12)
      .text(
        `Ensure the front fire rated door has been core filled?: ${checkList?.fire?.[0].frontFireRate}`
      );
    doc
      .fontSize(12)
      .text(
        `Are there any pvc penetrations through intertenancy walls?: ${checkList?.fire?.[0].pvc}`
      );
    doc
      .fontSize(12)
      .text(
        `If so how have they been treated?: ${checkList?.fire?.[0].treated}`
      );
    doc
      .fontSize(12)
      .text(
        `Are there any penetrating cables?: ${checkList?.fire?.[0].penetratingCables}`
      );
    doc
      .fontSize(12)
      .text(
        `Has the conduit been stripped through the wall?: ${checkList?.fire?.[0].strippedThroughTheWall}`
      );
    doc
      .fontSize(12)
      .text(
        `How have the cables been treated?: ${checkList?.fire?.[0].cables}`
      );
    doc
      .fontSize(12)
      .text(
        `Are there any sprinkler pipes penetrating intertenancy walls?: ${checkList?.fire?.[0].sprinklerPipes}`
      );
    doc
      .fontSize(12)
      .text(
        `How have they been treated?: ${checkList?.fire?.[0].sprinklerTreated}`
      );
    doc
      .fontSize(12)
      .text(
        `Are there any service penetrating slabs?: ${checkList?.fire?.[0].penetratingSlabs}`
      );
    doc
      .fontSize(12)
      .text(
        `Have they been treated with a certified fire collar?: ${checkList?.fire?.[0].certifiedFireCollar}`
      );
    doc
      .fontSize(12)
      .text(`Specify the make and model?: ${checkList?.fire?.[0].MarkModel}`);
    doc
      .fontSize(12)
      .text(
        `Are there any mechanical / air conditioning penetrations?: ${checkList?.fire?.[0].AcPenetrations}`
      );
    doc
      .fontSize(12)
      .text(
        `If so how have they been treated?: ${checkList?.fire?.[0].AcTreated}`
      );
    doc
      .fontSize(12)
      .text(
        `Have photographic evidence been take of the unit: ${checkList?.fire?.[0].photoCheck}`
      );
    doc.moveDown();
    doc.moveDown();
    doc.text(`${signature}`);
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
exports.sendGmailWater = asyncHandler(async (req, res, nex) => {
  if (!req.body.email) {
    throw new LocalError("Please enter your Email", 400);
  }
  const checkList = await CheckList.findById(req.params.id);
  if (!checkList) {
    throw new LocalError(req + "No data", 404);
  }
  const user = req.body.email;
  const link = `${process.env.MAIL_HOST}/api/v1/checklist/${checkList._id}/water/pdf`;
  const message = `Hello.<br><br> Please download the PDF clicking by following link <br><br><a target="_blanks" href="${link}">${link}</a><br><br>
  Best regards<br><br>App support Level 33 <br><br>Thank you.`;
  const result = await sendEmail({
    email: user,
    subject: "ITP's Report",
    message,
  });
  res.status(200).json({
    success: true,
    data: result,
  });
});
exports.sendGmailFire = asyncHandler(async (req, res, nex) => {
  if (!req.body.email) {
    throw new LocalError("Please enter your Email", 400);
  }
  const checkList = await CheckList.findById(req.params.id);
  if (!checkList) {
    throw new LocalError(req + "No data", 404);
  }
  const user = req.body.email;
  const link = `${process.env.MAIL_HOST}/api/v1/checklist/${checkList._id}/fire/pdf`;
  const message = `Hello.<br><br> Please download the PDF clicking by following link <br><br><a target="_blanks" href="${link}">${link}</a><br><br>
  Best regards<br><br>App support Level 33 <br><br>Thank you.`;
  const result = await sendEmail({
    email: user,
    subject: "ITP's Report",
    message,
  });
  res.status(200).json({
    success: true,
    data: result,
  });
});
