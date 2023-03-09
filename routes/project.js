const express = require("express");
//const { protection, authorize } = require("../middleware/protection");
const router = express.Router();
const {
  getProjects,
  getProject,
  createProject,
  updateProject,
  deleteProject,
} = require("../controllers/project");
const { getProjectBuildings } = require("../controllers/building");
//Get related buldings
router.route("/:projectId/building").get(getProjectBuildings);
router.route("/").get(getProjects).post(createProject);
router.route("/:id").get(getProject).put(updateProject).delete(deleteProject);

module.exports = router;
