const mongoose = require("mongoose");
const { slugify } = require("transliteration");
const BuildingSchema = new mongoose.Schema({
  buildingNumber: {
    type: String,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  created_user: {
    type: mongoose.Schema.ObjectId,
    ref: "User",
  },
  project: {
    type: mongoose.Schema.ObjectId,
    ref: "Project",
    required: true,
  },
  statusOf: [
    {
      complate: {
        type: Boolean,
      },
      fixing: {
        type: String,
      },
      other: {
        type: String,
      },
    },
  ],
  slug: String,
  count: Number,
});
BuildingSchema.pre("save", function (next) {
  //add Slug
  this.slug = slugify(this.buildingNumber);
  next();
});
module.exports = mongoose.model("Building", BuildingSchema);
