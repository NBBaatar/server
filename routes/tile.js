const express = require("express");
//const { protection, authorize } = require("../middleware/protection");
const router = express.Router();
const {
  getUnitTiles,
  getTile,
  createTile,
  updateTile,
  deleteTile,
  uploadFilesTilesBalcony,
  uploadFilesTilesEnsuite,
  uploadFilesTilesKitchen,
  uploadFilesTilesLaundry,
  imagesGetTilesBalcony,
  imagesGetTilesEnsuite,
  imagesGetTilesKitchen,
  imagesGetTilesLaundry,
  generatePDFKitchen,
  generatePDFBathroom,
  generatePDFEnsuite,
  generatePDFLaundry,
  sendGmailKitchen,
  sendGmailBathroom,
  sendGmailEnsuite,
  sendGmailLaundry,
} = require("../controllers/tile");
router.route("/").get(getUnitTiles).post(createTile);
router.route("/:id").get(getTile).put(updateTile).delete(deleteTile);
//Uploading Photos
router.route("/:id/upload/bathroom").put(uploadFilesTilesBalcony);
router.route("/:id/upload/ensuite").put(uploadFilesTilesEnsuite);
router.route("/:id/upload/kitchen").put(uploadFilesTilesKitchen);
router.route("/:id/upload/laundry").put(uploadFilesTilesLaundry);
//Geting list of Images
router.route("/:id/images/bathroom").get(imagesGetTilesBalcony);
router.route("/:id/images/ensuite").get(imagesGetTilesEnsuite);
router.route("/:id/images/kitchen").get(imagesGetTilesKitchen);
router.route("/:id/images/laundry").get(imagesGetTilesLaundry);
//Generate PDF
router.route("/:id/kitchen/pdf").get(generatePDFKitchen);
router.route("/:id/bathroom/pdf").get(generatePDFBathroom);
router.route("/:id/ensuite/pdf").get(generatePDFEnsuite);
router.route("/:id/laundry/pdf").get(generatePDFLaundry);
//send Mail
router.route("/:id/kitchen/send").post(sendGmailKitchen);
router.route("/:id/bathroom/send").post(sendGmailBathroom);
router.route("/:id/ensuite/send").post(sendGmailEnsuite);
router.route("/:id/laundry/send").post(sendGmailLaundry);
module.exports = router;
