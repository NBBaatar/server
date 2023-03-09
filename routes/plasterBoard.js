const express = require("express");
//const { protection, authorize } = require("../middleware/protection");
const router = express.Router();
const {
  getUnitPlasterBoard,
  getPlasterBoard,
  createPlasterBoard,
  updatePlasterBoard,
  deletePlasterBoard,
  uploadFilesPlasterBoard,
  imagesGetPlasterBoard,
  generatePDF,
  sendGmail,
} = require("../controllers/plasterBoard");
router.route("/").get(getUnitPlasterBoard).post(createPlasterBoard);
router
  .route("/:id")
  .get(getPlasterBoard)
  .put(updatePlasterBoard)
  .delete(deletePlasterBoard);
//Uploading Photos
router.route("/:id/upload").put(uploadFilesPlasterBoard);
//Geting list of Images
router.route("/:id/images").get(imagesGetPlasterBoard);
//Generate PDF
router.route("/:id/pdf").get(generatePDF);
//send Mail
router.route("/:id/send").post(sendGmail);

module.exports = router;
