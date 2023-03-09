const express = require("express");
//const { protection, authorize } = require("../middleware/protection");
const router = express.Router();

const {
  getUnitElectrical,
  getElectrical,
  createElectrical,
  updateElectrical,
  deleteElectrical,
  imagesGetElectrical,
  uploadFilesElectrical,
  generatePDF,
  sendGmail,
} = require("../controllers/electrical");
router.route("/").get(getUnitElectrical).post(createElectrical);
router
  .route("/:id")
  .get(getElectrical)
  .put(updateElectrical)
  .delete(deleteElectrical);
//Uploading Photos
router.route("/:id/upload").put(uploadFilesElectrical);
//Geting list of Images
router.route("/:id/images").get(imagesGetElectrical);
//Generate PDF
router.route("/:id/pdf").get(generatePDF);
//send Mail
router.route("/:id/send").post(sendGmail);

module.exports = router;
