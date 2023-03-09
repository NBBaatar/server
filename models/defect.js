const mongoose = require("mongoose");
const { slugify } = require("transliteration");
const DefectSchema = new mongoose.Schema({
  reason: {
    type: String,
    required: true,
    trim: true,
    default: "No value",
  },
  description: {
    type: String,
    required: true,
    trim: true,
    default: "No value",
  },

  photo: [
    {
      fileName: {
        type: String,
        required: true,
        trim: true,
        default: "photo.png",
      },
      uri: {
        type: String,
        default: "No value",
      },
    },
  ],

  unit: {
    type: mongoose.Schema.ObjectId,
    ref: "Unit",
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
DefectSchema.pre("save", function (next) {
  //add Slug
  this.slug = slugify(this.description);
  next();
});
module.exports = mongoose.model("Defect", DefectSchema);
