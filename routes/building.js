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
const { getBuildingUnit } = require("../controllers/unit");
router.route("/:buildingId/unit").get(getBuildingUnit);
router.route("/").get(getProjectBuildings).post(createBuildings);
router
  .route("/:id")
  .get(getBuilding)
  .put(updateBuilding)
  .delete(deleteBuilding);
module.exports = router;
