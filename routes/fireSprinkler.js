const express = require("express");
//const { protection, authorize } = require("../middleware/protection");
const router = express.Router();

const {
  getUnitFireSprinkler,
  getFireSprinkler,
  createFireSprinkler,
  updateFireSprinkler,
  deleteFireSprinkler,
  uploadFilesFireSprinkler,
  imagesGetFireSprinkler,
  generatePDF,
  sendGmail,
} = require("../controllers/fireSprinkler");
router.route("/").get(getUnitFireSprinkler).post(createFireSprinkler);
router
  .route("/:id")
  .get(getFireSprinkler)
  .put(updateFireSprinkler)
  .delete(deleteFireSprinkler);
//Uploading Photos
router.route("/:id/upload").put(uploadFilesFireSprinkler);
//Geting list of Images
router.route("/:id/images").get(imagesGetFireSprinkler);
//Generate PDF
router.route("/:id/pdf").get(generatePDF);
//send Mail
router.route("/:id/send").post(sendGmail);

module.exports = router;
