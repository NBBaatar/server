const express = require("express");
//const { protection, authorize } = require("../middleware/protection");
const router = express.Router();

const {
  getUnitWardrobe,
  getWardrobe,
  createWardrobe,
  updateWardrobe,
  deleteWardrobe,
  uploadFilesWardrobe,
  imagesGetWardrobe,
  generatePDF,
  sendGmail,
} = require("../controllers/wardrobe");
router.route("/").get(getUnitWardrobe).post(createWardrobe);
router
  .route("/:id")
  .get(getWardrobe)
  .put(updateWardrobe)
  .delete(deleteWardrobe);
//Uploading Photos
router.route("/:id/upload").put(uploadFilesWardrobe);
//Geting list of Images
router.route("/:id/images").get(imagesGetWardrobe);
//Generate PDF
router.route("/:id/pdf").get(generatePDF);
//send Mail
router.route("/:id/send").post(sendGmail);

module.exports = router;
