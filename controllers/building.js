const Building = require("../models/building");
const Project = require("../models/project");
const path = require("path");
const LocalError = require("../utils/locaError");
const asyncHandler = require("../middleware/asyncHandler");
const user = require("../models/user");
//Project-тэй холбоотой мэдээллийг ID –гаар авч байгаа.
exports.getProjectBuildings = asyncHandler(async (req, res, next) => {
  let query;
  if (req.params.projectId) {
    query = Building.find({ project: req.params.projectId });
  } else {
    query = Building.find();
  }
  const building = await query;
  res.status(200).json({
    success: true,
    message: "Request success.",
    count: building.length,
    data: building,
  });
});

exports.getBuilding = asyncHandler(async (req, res, next) => {
  const building = await Building.findById(req.params.id);
  if (!building) {
    throw new LocalError(req + " No any Data.", 404);
  }
  res.status(200).json({
    success: true,
    message: "Request success.",
    data: building,
  });
});

//Эхлээд холбогдож байгаа collection оо find хийгээд дараа нь insert хийнэ.
exports.createBuildings = asyncHandler(async (req, res, next) => {
  const project = await Project.findById(req.body.project);
  if (!project) {
    throw new LocalError(
      req.body.project + " ID is not include any Datа.",
      404
    );
  }

  const building = await Building.create(req.body);
  res.status(200).json({
    success: true,
    message: "New Building insert success.",
    user_id: req.userId,
    data: building,
  });
});

exports.updateBuilding = asyncHandler(async (req, res, next) => {
  const building = await Building.findById(req.params.id);
  if (!building) {
    throw new LocalError(req.params.id + " ID is not include any Data.", 404);
  }
  if (building.created_user !== req.userId && req.userRole !== "admin") {
    throw new LocalError("You just update your post. Not other's post", 404);
  }
  req.body.updated_user = req.userId;
  for (let attr in req.body) {
    (building[attr] = req.body[attr]), { new: true, runValidators: true };
  }
  building.save();
  res.status(200).json({
    success: true,
    message: "Update Success.",
    user_id: req.userId,
    data: building,
  });
});
exports.deleteBuilding = asyncHandler(async (req, res, next) => {
  const building = await Building.findById(req.params.id);
  if (!building) {
    throw new LocalError(req.params.id + " ID is not include any Datа.", 404);
  }
  building.remove();

  res.status(200).json({
    success: true,
    message: "Delete Success.",
    user_id: req.userId,
    data: building,
  });
});

exports.getUserBuildings = asyncHandler(async (req, res, next) => {
  //Get Requist
  req.query.created_user = req.userId;
  const building = await Building.find(req.query);
  res.status(200).json({
    success: true,
    message: "Request success.",
    user_id: req.userId,
    count: building.length,
    data: building,
  });
});
