const express = require("express");
//const { protection, authorize } = require("../middleware/protection");
const router = express.Router();

const {
  getUnitSteelFrame,
  getSteelFrame,
  createSteelFrame,
  updateSteelFrame,
  deleteSteelFrame,
  uploadFilesSteelFrame,
  imagesGetSteelFrame,
  generatePDF,
  sendGmail,
} = require("../controllers/steelFrame");
router.route("/").get(getUnitSteelFrame).post(createSteelFrame);
router
  .route("/:id")
  .get(getSteelFrame)
  .put(updateSteelFrame)
  .delete(deleteSteelFrame);
//Uploading Photos
router.route("/:id/upload").put(uploadFilesSteelFrame);
//Geting list of Images
router.route("/:id/images").get(imagesGetSteelFrame);
//Generate PDF
router.route("/:id/pdf").get(generatePDF);
//send Mail
router.route("/:id/send").post(sendGmail);

module.exports = router;
