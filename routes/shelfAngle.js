const express = require("express");
//const { protection, authorize } = require("../middleware/protection");
const router = express.Router();

const {
  getUnitShelfAngle,
  getShelfAngle,
  createShelfAngle,
  updateShelfAngle,
  deleteShelfAngle,
  uploadFilesShelfAngle,
  imagesGetShelfAngle,
  generatePDF,
  sendGmail,
} = require("../controllers/shelfAngle");
router.route("/").get(getUnitShelfAngle).post(createShelfAngle);
router
  .route("/:id")
  .get(getShelfAngle)
  .put(updateShelfAngle)
  .delete(deleteShelfAngle);
//Uploading Photos
router.route("/:id/upload").put(uploadFilesShelfAngle);
//Geting list of Images
router.route("/:id/images").get(imagesGetShelfAngle);
//Generate PDF
router.route("/:id/pdf").get(generatePDF);
//send Mail
router.route("/:id/send").post(sendGmail);

module.exports = router;
