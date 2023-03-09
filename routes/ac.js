const express = require("express");
//const { protection, authorize } = require("../middleware/protection");
const router = express.Router();

const {
  getUnitAc,
  getAc,
  createAc,
  updateAc,
  deleteAc,
  uploadFilesAC,
  imagesGetAC,
  generatePDF,
  sendGmail,
} = require("../controllers/ac");
router.route("/").get(getUnitAc).post(createAc);
router.route("/:id").get(getAc).put(updateAc).delete(deleteAc);
//Uploading Photos
router.route("/:id/upload").put(uploadFilesAC);
//Geting list of Images
router.route("/:id/images").get(imagesGetAC);
//Generate PDF
router.route("/:id/pdf").get(generatePDF);
//send Mail
router.route("/:id/send").post(sendGmail);

module.exports = router;
