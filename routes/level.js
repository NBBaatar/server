const express = require("express");
//const { protection, authorize } = require("../middleware/protection");
const router = express.Router();

const {
  getLevel,
  getBuildingLevel,
  createLevel,
  updateLevel,
  deleteLevel,
} = require("../controllers/level");
const { getBuildingGroupUnitLevel } = require("../controllers/unit");
router.route("/").get(getBuildingLevel).post(createLevel);
router.route("/:id").get(getLevel).put(updateLevel).delete(deleteLevel);
router.route("/:levelId/unit").get(getBuildingGroupUnitLevel);

module.exports = router;
