const express = require("express");
//const { protection, authorize } = require("../middleware/protection");
const router = express.Router();
const { getUnitElectrical } = require("../controllers/electrical");
const { getUnitWaterProof } = require("../controllers/waterProof");
const { getUnitWindow } = require("../controllers/window");
const { getUnitAc } = require("../controllers/ac");
const { getUnitDoorFraming } = require("../controllers/doorFraming");
const { getUnitPlumbing } = require("../controllers/plumbing");
const { getUnitFireSprinkler } = require("../controllers/fireSprinkler");
const { getUnitDryFireCable } = require("../controllers/dryFireCable");
const { getUnitFireCable } = require("../controllers/fireCable");
const { getUnitPlasterBoard } = require("../controllers/plasterBoard");
const { getUnitKitchen } = require("../controllers/kitchen");
const { getUnitWardrobe } = require("../controllers/wardrobe");
const { getUnitCarpet } = require("../controllers/carpet");
const { getUnitPaint } = require("../controllers/paint");
const { getUnitSteelFrame } = require("../controllers/steelFrame");
const { getUnitShelfAngle } = require("../controllers/shelfAngle");
const { getUnitDefects } = require("../controllers/defect");
const { getUnitTiles } = require("../controllers/tile");
const { getUnitCheckList } = require("../controllers/checkList");
const { getUnitHebel } = require("../controllers/hebel");
const {
  getUnit,
  getBuildingUnit,
  createUnit,
  updateUnit,
  deleteUnit,
} = require("../controllers/unit");
router.route("/").get(getBuildingUnit).post(createUnit);
router.route("/:id").get(getUnit).put(updateUnit).delete(deleteUnit);
//Relation routes
router.route("/:unitId/electrical").get(getUnitElectrical);
router.route("/:unitId/waterproof").get(getUnitWaterProof);
router.route("/:unitId/windows").get(getUnitWindow);
router.route("/:unitId/ac").get(getUnitAc);
router.route("/:unitId/doorframing").get(getUnitDoorFraming);
router.route("/:unitId/plumbing").get(getUnitPlumbing);
router.route("/:unitId/firesprinkler").get(getUnitFireSprinkler);
router.route("/:unitId/dryfirecable").get(getUnitDryFireCable);
router.route("/:unitId/firecable").get(getUnitFireCable);
router.route("/:unitId/plasterboard").get(getUnitPlasterBoard);
router.route("/:unitId/kitchen").get(getUnitKitchen);
router.route("/:unitId/wardrobe").get(getUnitWardrobe);
router.route("/:unitId/carpet").get(getUnitCarpet);
router.route("/:unitId/paint").get(getUnitPaint);
router.route("/:unitId/steelframe").get(getUnitSteelFrame);
router.route("/:unitId/shelfangle").get(getUnitShelfAngle);
router.route("/:unitId/defects").get(getUnitDefects);
router.route("/:unitId/tiles").get(getUnitTiles);
router.route("/:unitId/checklist").get(getUnitCheckList);
router.route("/:unitId/hebel").get(getUnitHebel);

module.exports = router;
