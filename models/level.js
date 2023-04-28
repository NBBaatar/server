const mongoose = require("mongoose");
const { slugify } = require("transliteration");
const LevelSchema = new mongoose.Schema({
  unitFloor: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  created_user: {
    type: mongoose.Schema.ObjectId,
    ref: "User",
  },
  building: {
    type: mongoose.Schema.ObjectId,
    ref: "Building",
    required: true,
  },
  slug: String,
  count: Number,
});
LevelSchema.pre("save", function (next) {
  //add Slug
  this.slug = slugify(this.unitFloor);
  next();
});
module.exports = mongoose.model("Level", LevelSchema);
