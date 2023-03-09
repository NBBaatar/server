const express = require("express");
//const { protection, authorize } = require("../middleware/protection");
const router = express.Router();

const {
  getUnitPlumbing,
  getPlumbing,
  createPlumbing,
  updatePlumbing,
  deletePlumbing,
  uploadFilesPlumbing,
  imagesGetPlumbing,
  generatePDF,
  sendGmail,
} = require("../controllers/plumbing");
router.route("/").get(getUnitPlumbing).post(createPlumbing);
router
  .route("/:id")
  .get(getPlumbing)
  .put(updatePlumbing)
  .delete(deletePlumbing);
//Uploading Photos
router.route("/:id/upload").put(uploadFilesPlumbing);
//Geting list of Images
router.route("/:id/images").get(imagesGetPlumbing);
//Generate PDF
router.route("/:id/pdf").get(generatePDF);
//send Mail
router.route("/:id/send").post(sendGmail);

module.exports = router;
