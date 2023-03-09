const express = require("express");
//const { protection, authorize } = require("../middleware/protection");
const router = express.Router();

const {
  getUnitPaint,
  getPaint,
  createPaint,
  updatePaint,
  deletePaint,
  uploadFilesPaint,
  imagesGetPaint,
  generatePDF,
  sendGmail,
} = require("../controllers/paint");
router.route("/").get(getUnitPaint).post(createPaint);
router.route("/:id").get(getPaint).put(updatePaint).delete(deletePaint);
//Uploading Photos
router.route("/:id/upload").put(uploadFilesPaint);
//Geting list of Images
router.route("/:id/images").get(imagesGetPaint);
//Generate PDF
router.route("/:id/pdf").get(generatePDF);
//send Mail
router.route("/:id/send").post(sendGmail);
module.exports = router;
