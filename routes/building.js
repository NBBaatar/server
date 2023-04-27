const express = require("express");
//const { protection, authorize } = require("../middleware/protection");
const router = express.Router();
const {
  getBuilding,
  getProjectBuildings,
  createBuildings,
  updateBuilding,
  deleteBuilding,
} = require("../controllers/building");
const {
  getBuildingUnit,
  getBuildingGroupUnit,
  getBuildingGroupUnitLevel,
} = require("../controllers/unit");
router.route("/:buildingId/unit").get(getBuildingUnit);
router.route("/:buildingId/unit/group").get(getBuildingGroupUnit);
router.route("/:buildingId/unit/level").get(getBuildingGroupUnitLevel);
router.route("/").get(getProjectBuildings).post(createBuildings);
router
  .route("/:id")
  .get(getBuilding)
  .put(updateBuilding)
  .delete(deleteBuilding);
module.exports = router;
