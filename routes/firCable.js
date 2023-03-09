const express = require("express");
//const { protection, authorize } = require("../middleware/protection");
const router = express.Router();

const {
  getUnitFireCable,
  getFireCable,
  createFireCable,
  updateFireCable,
  deleteFireCable,
  uploadFilesFireCable,
  imagesGetFireCable,
  generatePDF,
  sendGmail,
} = require("../controllers/fireCable");
router.route("/").get(getUnitFireCable).post(createFireCable);
router
  .route("/:id")
  .get(getFireCable)
  .put(updateFireCable)
  .delete(deleteFireCable);
//Uploading Photos
router.route("/:id/upload").put(uploadFilesFireCable);
//Geting list of Images
router.route("/:id/images").get(imagesGetFireCable);
//Generate PDF
router.route("/:id/pdf").get(generatePDF);
//send Mail
router.route("/:id/send").post(sendGmail);
module.exports = router;
