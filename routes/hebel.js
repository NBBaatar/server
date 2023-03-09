const express = require("express");
//const { protection, authorize } = require("../middleware/protection");
const router = express.Router();

const {
  getUnitHebel,
  getHebel,
  createHebel,
  updateHebel,
  deleteHebel,
  uploadFilesHebel,
  imagesGetHebel,
  generatePDF,
  sendGmail,
} = require("../controllers/hebel");
router.route("/").get(getUnitHebel).post(createHebel);
router.route("/:id").get(getHebel).put(updateHebel).delete(deleteHebel);
//Uploading Photos
router.route("/:id/upload").put(uploadFilesHebel);
//Geting list of Images
router.route("/:id/images").get(imagesGetHebel);
//Generate PDF
router.route("/:id/pdf").get(generatePDF);
//send Mail
router.route("/:id/send").post(sendGmail);

module.exports = router;
