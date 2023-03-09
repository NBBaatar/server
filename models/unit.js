const mongoose = require("mongoose");
const { slugify } = require("transliteration");
const UnitSchema = new mongoose.Schema({
  unitNumber: {
    type: String,
    required: true,
  },
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
UnitSchema.pre("save", function (next) {
  //add Slug
  this.slug = slugify(this.unitNumber);
  next();
});
module.exports = mongoose.model("Unit", UnitSchema);
