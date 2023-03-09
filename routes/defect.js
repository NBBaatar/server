const express = require("express");
//const { protection, authorize } = require("../middleware/protection");
const router = express.Router();

const {
  getUnitDefects,
  getDefect,
  createDefect,
  updateDefect,
  deleteDefect,
  uploadFilesDefect,
  imagesGetDefect,
  generatePDF,
  sendGmail,
} = require("../controllers/defect");
router.route("/").get(getUnitDefects).post(createDefect);
router.route("/:id").get(getDefect).put(updateDefect).delete(deleteDefect);
//Uploading Photos
router.route("/:id/upload").put(uploadFilesDefect);
//Geting list of Images
router.route("/:id/images").get(imagesGetDefect);
//Generate PDF
router.route("/:id/pdf").get(generatePDF);
//send Mail
router.route("/:id/send").post(sendGmail);
module.exports = router;
