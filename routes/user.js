const express = require("express");
const { protection, authorize } = require("../middleware/protection");
const router = express.Router();
const {
  getUser,
  getUsers,
  updateUser,
  createUser,
  deleteUser,
  uploadFiles,
  registerUser,
  login,
  forgotPassword,
  resetPassword,
  sendGmail,
} = require("../controllers/user");
const { getUserProject } = require("../controllers/project");
const { getUserBuildings } = require("../controllers/building");

router.route("/login").post(login);
router.route("/forgot-password").post(forgotPassword);
router.route("/change-password").post(resetPassword);
router.route("/send").post(sendGmail);
router
  .route("/")
  .get(protection, authorize("admin", "operator", "builder"), getUsers)
  .post(createUser);
router
  .route("/register")
  .post(protection, authorize("admin", "operator", "builder"), registerUser);
router
  .route("/:id")
  .get(protection, authorize("admin", "operator", "builder"), getUser)
  .put(protection, authorize("admin", "operator", "builder"), updateUser)
  .delete(protection, authorize("admin"), deleteUser);
router
  .route("/:id/upload-photo")
  .put(protection, authorize("admin", "operator", "builder"), uploadFiles);
router
  .route("/:id/projects")
  .get(protection, authorize("admin", "operator", "builder"), getUserProject);
router
  .route("/:id/buildings")
  .get(protection, authorize("admin", "operator", "builder"), getUserBuildings);
module.exports = router;
