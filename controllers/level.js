const Building = require("../models/building");
const Level = require("../models/level");
const LocalError = require("../utils/locaError");
const asyncHandler = require("../middleware/asyncHandler");
const user = require("../models/user");

const mongoose = require("mongoose");
const { request } = require("express");
exports.getBuildingLevel = asyncHandler(async (req, res, next) => {
  let query;
  if (req.params.buildingId) {
    query = Level.find({ building: req.params.buildingId }).populate("level");
  } else {
    query = Level.find();
  }
  const level = await query;
  res.status(200).json({
    success: true,
    message: "Request success.",
    count: level.length,
    data: level,
  });
});
// exports.getBuildingGroupUnit = asyncHandler(async (req, res, next) => {
//   let query;
//   if (req.params.buildingId) {
//     query = Unit.aggregate([
//       {
//         // Эхлээд ObjectId гаар хайлт хийж байгаа хэсэг
//         $match: {
//           building: new mongoose.Types.ObjectId(req.params.buildingId),
//         },
//       },
//       {
//         // олдсон үр дүнг _id гэсэн утгаар Group хийгээд doc: $$ROOT гэснээр утгаа хүлээн авч replaceRoot ээр буцаан өгөдлөө өгч байгаа.
//         $group: {
//           _id: "$unitFloor",
//           doc: { $first: "$$ROOT" },
//         },
//       },
//       { $replaceRoot: { newRoot: "$doc" } },
//     ]);
//   }
//   const unit = await query;
//   res.status(200).json({
//     success: true,
//     message: "Request success.",
//     count: unit.length,
//     data: unit,
//   });
// });
// exports.getBuildingGroupUnitLevel = asyncHandler(async (req, res, next) => {
//   let query;
//   if (req.params.levelId) {
//     query = Unit.find({ level: req.params.levelId });
//   } else {
//     query = Unit.find();
//   }

//   const unit = await query;
//   res.status(200).json({
//     success: true,
//     message: "Request success.",
//     count: unit.length,
//     data: unit,
//   });
// });
exports.getLevel = asyncHandler(async (req, res, next) => {
  const level = await Level.findById(req.params.id);
  if (!level) {
    throw new LocalError(req + " No any Data.", 404);
  }
  res.status(200).json({
    success: true,
    message: "Request success.",
    data: level,
  });
});
//Эхлээд холбогдож байгаа collection оо find хийгээд дараа нь insert хийнэ.
exports.createLevel = asyncHandler(async (req, res, next) => {
  const building = await Building.findById(req.body.building);
  if (!building) {
    throw new LocalError(
      req.body.building + " ID is not include any Datа.",
      404
    );
  }
  const level = await Level.create(req.body);
  res.status(200).json({
    success: true,
    message: "New Level insert success.",
    user_id: req.userId,
    data: level,
  });
});
exports.updateLevel = asyncHandler(async (req, res, next) => {
  const level = await Level.findById(req.params.id);
  if (!level) {
    throw new LocalError(req.params.id + " ID is not include any Data.", 404);
  }
  if (level.created_user !== req.userId && req.userRole !== "admin") {
    throw new LocalError("You just update your post. Not other's post", 404);
  }
  req.body.updated_user = req.userId;
  for (let attr in req.body) {
    (level[attr] = req.body[attr]), { new: true, runValidators: true };
  }
  level.save();
  res.status(200).json({
    success: true,
    message: "Update Success.",
    user_id: req.userId,
    data: level,
  });
});
exports.deleteLevel = asyncHandler(async (req, res, next) => {
  const level = await Level.findById(req.params.id);
  if (!level) {
    throw new LocalError(req.params.id + " ID is not include any Datа.", 404);
  }
  level.remove();

  res.status(200).json({
    success: true,
    message: "Delete Success.",
    user_id: req.userId,
    data: level,
  });
});
exports.getUserLevels = asyncHandler(async (req, res, next) => {
  //Get Requist
  req.query.created_user = req.userId;
  const level = await Level.find(req.query);
  res.status(200).json({
    success: true,
    message: "Request success.",
    user_id: req.userId,
    count: unit.length,
    data: level,
  });
});
