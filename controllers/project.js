const Project = require("../models/project");
const Building = require("../models/building");
const path = require("path");
const LocalError = require("../utils/locaError");
const asyncHandler = require("../middleware/asyncHandler");
const user = require("../models/user");
exports.getProjects = asyncHandler(async (req, res, next) => {
  const projects = await Project.find();
  if (!projects) {
    throw new LocalError(req + " No any Data.", 404);
  }
  res.status(200).json({
    success: true,
    message: "Request success.",
    count: projects.length,
    data: projects,
  });
});
exports.getProject = asyncHandler(async (req, res, next) => {
  const project = await Project.findById(req.params.id).populate("building");
  if (!project) {
    throw new LocalError(req.params.id + " ID is not include any Datа.", 404);
  }
  res.status(200).json({
    success: true,
    message: "Request Success.",
    user_id: req.userId,
    count: project.count,
    data: project,
  });
});
exports.createProject = asyncHandler(async (req, res, next) => {
  req.body.created_user = req.userId;
  const project = await Project.create(req.body);
  res.status(200).json({
    success: true,
    message: "New Project insert success.",
    user_id: req.userId,
    data: project,
  });
});
exports.updateProject = asyncHandler(async (req, res, next) => {
  const project = await Project.findById(req.params.id);
  if (!project) {
    throw new LocalError(req.params.id + " ID is not include any Data.", 404);
  }
  if (project.created_user !== req.userId && req.userRole !== "admin") {
    throw new LocalError("You just update your post. Not other's post", 404);
  }
  req.body.updated_user = req.userId;
  for (let attr in req.body) {
    (project[attr] = req.body[attr]), { new: true, runValidators: true };
  }
  project.save();
  res.status(200).json({
    success: true,
    message: "Update Success.",
    user_id: req.userId,
    data: project,
  });
});

exports.deleteProject = asyncHandler(async (req, res, next) => {
  const project = await Project.findById(req.params.id);
  if (!project) {
    throw new LocalError(req.params.id + " ID is not include any Datа.", 404);
  }
  project.remove();

  res.status(200).json({
    success: true,
    message: "Delete Success.",
    user_id: req.userId,
    data: project,
  });
});

exports.getUserProject = asyncHandler(async (req, res, next) => {
  //Get Requist
  req.query.created_user = req.userId;
  const project = await Project.find(req.query);
  res.status(200).json({
    success: true,
    message: "Request success.",
    user_id: req.userId,
    count: project.length,
    data: project,
  });
});
