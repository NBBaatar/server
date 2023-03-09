const express = require("express");
//const { protection, authorize } = require("../middleware/protection");
const router = express.Router();

const {
  getUnitCarpet,
  getCarpet,
  createCarpet,
  updateCarpet,
  deleteCarpet,
  uploadFilesCarpet,
  imagesGetCarpet,
  generatePDF,
  sendGmail,
} = require("../controllers/carpet");
router.route("/").get(getUnitCarpet).post(createCarpet);
router.route("/:id").get(getCarpet).put(updateCarpet).delete(deleteCarpet);
//Uploading Photos
router.route("/:id/upload").put(uploadFilesCarpet);
//Geting list of Images
router.route("/:id/images").get(imagesGetCarpet);
//Generate PDF
router.route("/:id/pdf").get(generatePDF);
//send Mail
router.route("/:id/send").post(sendGmail);

module.exports = router;
