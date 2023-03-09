const express = require("express");
//const { protection, authorize } = require("../middleware/protection");
const router = express.Router();

const {
  getUnitWindow,
  getWindow,
  createWindow,
  updateWindow,
  deleteWindow,
  uploadFilesWindows,
  imagesGetWindows,
  generatePDF,
  sendGmail,
} = require("../controllers/window");
router.route("/").get(getUnitWindow).post(createWindow);
router.route("/:id").get(getWindow).put(updateWindow).delete(deleteWindow);
//Uploading Photos
router.route("/:id/upload").put(uploadFilesWindows);
//Geting list of Images
router.route("/:id/images").get(imagesGetWindows);
//Generate PDF
router.route("/:id/pdf").get(generatePDF);
//send Mail
router.route("/:id/send").post(sendGmail);

module.exports = router;
