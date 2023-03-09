const express = require("express");
//const { protection, authorize } = require("../middleware/protection");
const router = express.Router();

const {
  getUnitDryFireCable,
  getDryFireCable,
  createDryFireCable,
  updateDryFireCable,
  deleteDryFireCable,
  uploadFilesDryFireCable,
  imagesGetDryFireCable,
  generatePDF,
  sendGmail,
} = require("../controllers/dryFireCable");
router.route("/").get(getUnitDryFireCable).post(createDryFireCable);
router
  .route("/:id")
  .get(getDryFireCable)
  .put(updateDryFireCable)
  .delete(deleteDryFireCable);
//Uploading Photos
router.route("/:id/upload").put(uploadFilesDryFireCable);
//Geting list of Images
router.route("/:id/images").get(imagesGetDryFireCable);
//Generate PDF
router.route("/:id/pdf").get(generatePDF);
//send Mail
router.route("/:id/send").post(sendGmail);

module.exports = router;
