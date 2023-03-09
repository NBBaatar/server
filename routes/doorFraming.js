const express = require("express");
//const { protection, authorize } = require("../middleware/protection");
const router = express.Router();

const {
  getUnitDoorFraming,
  getDoorFraming,
  createDoorFraming,
  updateDoorFraming,
  deleteDoorFraming,
  uploadFilesDoorFraming,
  imagesGetDoorFraming,
  generatePDF,
  sendGmail,
} = require("../controllers/doorFraming");
router.route("/").get(getUnitDoorFraming).post(createDoorFraming);
router
  .route("/:id")
  .get(getDoorFraming)
  .put(updateDoorFraming)
  .delete(deleteDoorFraming);
//Uploading Photos
router.route("/:id/upload").put(uploadFilesDoorFraming);
//Geting list of Images
router.route("/:id/images").get(imagesGetDoorFraming);
//Generate PDF
router.route("/:id/pdf").get(generatePDF);
//send Mail
router.route("/:id/send").post(sendGmail);

module.exports = router;
