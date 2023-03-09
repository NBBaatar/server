const express = require("express");
//const { protection, authorize } = require("../middleware/protection");
const router = express.Router();
const {
  getUnitWaterProof,
  getWaterProof,
  createWaterProof,
  updateWaterProof,
  deleteWaterProof,
  uploadFilesBeforeBalcony,
  uploadFilesAfterBalcony,
  uploadFilesBeforeBathroom,
  uploadFilesAfterBathroom,
  uploadFilesBeforeLandry,
  uploadFilesAfterLandry,
  uploadFilesBeforeEnsuit,
  uploadFilesAfterEnsuit,
  imagesBalconyBefore,
  imagesBalconyAfter,
  generatePDFBalconyBefore,
  generatePDFBalconyAfter,
  generatePDFBathroomBefore,
  generatePDFBathroomAfter,
  generatePDFLaundryBefore,
  generatePDFLaundryAfter,
  generatePDFEnsuiteBefore,
  generatePDFEnsuiteAfter,
  sendGmailBalconyBefore,
  sendGmailBalconyAfter,
  sendGmailBathroomBefore,
  sendGmailBathroomAfter,
  sendGmailLaundryBefore,
  sendGmailLaundryAfter,
  sendGmailEnsuiteBefore,
  sendGmailEnsuiteAfter,
} = require("../controllers/waterProof");
router.route("/").get(getUnitWaterProof).post(createWaterProof);
router
  .route("/:id")
  .get(getWaterProof)
  .put(updateWaterProof)
  .delete(deleteWaterProof);
//Uploading Photos

router.route("/:id/balcony-before").put(uploadFilesBeforeBalcony);
router.route("/:id/balcony-after").put(uploadFilesAfterBalcony);
router.route("/:id/bathroom-after").put(uploadFilesAfterBathroom);
router.route("/:id/bathroom-before").put(uploadFilesBeforeBathroom);
router.route("/:id/landry-before").put(uploadFilesBeforeLandry);
router.route("/:id/landry-after").put(uploadFilesAfterLandry);
router.route("/:id/ensuit-before").put(uploadFilesBeforeEnsuit);
router.route("/:id/ensuit-after").put(uploadFilesAfterEnsuit);

//Geting list of Images
router.route("/:id/balconybefore").get(imagesBalconyBefore);
router.route("/:id/balconyafter").get(imagesBalconyAfter);
//Generate PDF
router.route("/:id/pdf/balcony/b").get(generatePDFBalconyBefore);
router.route("/:id/pdf/balcony/a").get(generatePDFBalconyAfter);
router.route("/:id/pdf/bathroom/b").get(generatePDFBathroomBefore);
router.route("/:id/pdf/bathroom/a").get(generatePDFBathroomAfter);
router.route("/:id/pdf/laundry/b").get(generatePDFLaundryBefore);
router.route("/:id/pdf/laundry/a").get(generatePDFLaundryAfter);
router.route("/:id/pdf/ensuite/b").get(generatePDFEnsuiteBefore);
router.route("/:id/pdf/ensuite/a").get(generatePDFEnsuiteAfter);
//send Mail
router.route("/:id/send/balcony/b").post(sendGmailBalconyBefore);
router.route("/:id/send/balcony/a").post(sendGmailBalconyAfter);
router.route("/:id/send/bathroom/b").post(sendGmailBathroomBefore);
router.route("/:id/send/bathroom/a").post(sendGmailBathroomAfter);
router.route("/:id/send/laundry/b").post(sendGmailLaundryBefore);
router.route("/:id/send/laundry/a").post(sendGmailLaundryAfter);
router.route("/:id/send/ensuite/b").post(sendGmailEnsuiteBefore);
router.route("/:id/send/ensuite/a").post(sendGmailEnsuiteAfter);
module.exports = router;
