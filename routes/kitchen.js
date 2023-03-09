const express = require("express");
//const { protection, authorize } = require("../middleware/protection");
const router = express.Router();

const {
  getUnitKitchen,
  getKitchen,
  createKitchen,
  updateKitchen,
  deleteKitchen,
  uploadFilesKitchen,
  imagesGetKitchen,
  generatePDF,
  sendGmail,
} = require("../controllers/kitchen");
router.route("/").get(getUnitKitchen).post(createKitchen);
router.route("/:id").get(getKitchen).put(updateKitchen).delete(deleteKitchen);
//Uploading Photos
router.route("/:id/upload").put(uploadFilesKitchen);
//Geting list of Images
router.route("/:id/images").get(imagesGetKitchen);
//Generate PDF
router.route("/:id/pdf").get(generatePDF);
//send Mail
router.route("/:id/send").post(sendGmail);

module.exports = router;
