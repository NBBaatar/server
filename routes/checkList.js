const express = require("express");
//const { protection, authorize } = require("../middleware/protection");
const router = express.Router();

const {
  getUnitCheckList,
  getCheckList,
  createCheckList,
  updateCheckList,
  deleteCheckList,
  sendGmailWater,
  sendGmailFire,
  generatePDFWater,
  generatePDFFire,
} = require("../controllers/checkList");
router.route("/").get(getUnitCheckList).post(createCheckList);
router
  .route("/:id")
  .get(getCheckList)
  .put(updateCheckList)
  .delete(deleteCheckList);

//Generate PDF
router.route("/:id/water/pdf").get(generatePDFWater);
router.route("/:id/fire/pdf").get(generatePDFFire);
//send Mail
router.route("/:id/water/send").post(sendGmailWater);
router.route("/:id/fire/send").post(sendGmailFire);
module.exports = router;
