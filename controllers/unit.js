const Unit = require("../models/unit");
const Building = require("../models/building");
const path = require("path");
const LocalError = require("../utils/locaError");
const asyncHandler = require("../middleware/asyncHandler");
const user = require("../models/user");
const fs = require("fs");
const mongoose = require("mongoose");
exports.getBuildingUnit = asyncHandler(async (req, res, next) => {
  let query;
  if (req.params.buildingId) {
    query = Unit.find({
      building: req.params.buildingId,
    });
  } else {
    query = Unit.find();
  }
  const unit = await query;
  res.status(200).json({
    success: true,
    message: "Request success.",
    count: unit.length,
    data: unit,
  });
});
exports.getBuildingGroupUnit = asyncHandler(async (req, res, next) => {
  let query;
  if (req.params.buildingId) {
    query = Unit.aggregate([
      {
        // Эхлээд ObjectId гаар хайлт хийж байгаа хэсэг
        $match: {
          building: new mongoose.Types.ObjectId(req.params.buildingId),
        },
      },
      {
        // олдсон үр дүнг _id гэсэн утгаар Group хийгээд doc: $$ROOT гэснээр утгаа хүлээн авч replaceRoot ээр буцаан өгөдлөө өгч байгаа.
        $group: {
          _id: "$unitFloor",
          doc: { $first: "$$ROOT" },
        },
      },
      { $replaceRoot: { newRoot: "$doc" } },
    ]);
  }
  const unit = await query;
  res.status(200).json({
    success: true,
    message: "Request success.",
    count: unit.length,
    data: unit,
  });
});
exports.getBuildingGroupUnitLevel = asyncHandler(async (req, res, next) => {
  let query;
  if (req.params.buildingId) {
    query = Unit.aggregate([
      {
        // Эхлээд ObjectId гаар хайлт хийж байгаа хэсэг
        $match: {
          building: new mongoose.Types.ObjectId(req.params.buildingId),
        },
      },
      {
        // олдсон үр дүнг _id гэсэн утгаар Group хийгээд doc: $$ROOT гэснээр утгаа хүлээн авч replaceRoot ээр буцаан өгөдлөө өгч байгаа.
        $group: {
          _id: "$_id",
          doc: { $first: "$$ROOT" },
        },
      },
      { $replaceRoot: { newRoot: "$doc" } },
    ]);
  }
  const unit = await query;
  res.status(200).json({
    success: true,
    message: "Request success.",
    count: unit.length,
    data: unit,
  });
});
exports.getUnit = asyncHandler(async (req, res, next) => {
  const unit = await Unit.findById(req.params.id);
  if (!unit) {
    throw new LocalError(req + " No any Data.", 404);
  }
  res.status(200).json({
    success: true,
    message: "Request success.",
    data: unit,
  });
});
//Эхлээд холбогдож байгаа collection оо find хийгээд дараа нь insert хийнэ.
exports.createUnit = asyncHandler(async (req, res, next) => {
  const building = await Building.findById(req.body.building);
  if (!building) {
    throw new LocalError(
      req.body.building + " ID is not include any Datа.",
      404
    );
  }
  const unit = await Unit.create(req.body);
  res.status(200).json({
    success: true,
    message: "New Unit insert success.",
    user_id: req.userId,
    data: unit,
  });
});
exports.updateUnit = asyncHandler(async (req, res, next) => {
  const unit = await Unit.findById(req.params.id);
  if (!unit) {
    throw new LocalError(req.params.id + " ID is not include any Data.", 404);
  }
  if (unit.created_user !== req.userId && req.userRole !== "admin") {
    throw new LocalError("You just update your post. Not other's post", 404);
  }
  req.body.updated_user = req.userId;
  for (let attr in req.body) {
    (unit[attr] = req.body[attr]), { new: true, runValidators: true };
  }
  unit.save();
  res.status(200).json({
    success: true,
    message: "Update Success.",
    user_id: req.userId,
    data: unit,
  });
});
exports.deleteUnit = asyncHandler(async (req, res, next) => {
  const unit = await Unit.findById(req.params.id);
  if (!unit) {
    throw new LocalError(req.params.id + " ID is not include any Datа.", 404);
  }
  unit.remove();

  res.status(200).json({
    success: true,
    message: "Delete Success.",
    user_id: req.userId,
    data: unit,
  });
});
exports.getUserUnits = asyncHandler(async (req, res, next) => {
  //Get Requist
  req.query.created_user = req.userId;
  const unit = await Unit.find(req.query);
  res.status(200).json({
    success: true,
    message: "Request success.",
    user_id: req.userId,
    count: unit.length,
    data: unit,
  });
});
