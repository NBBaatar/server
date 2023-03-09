const mongoose = require("mongoose");
const { slugify } = require("transliteration");
const DoorFramingSchema = new mongoose.Schema({
  statusOf: {
    type: String,
    required: true,
    trim: true,
    default: "No value",
  },
  reason: {
    type: String,
    required: true,
    trim: true,
    default: "No value",
  },
  fireRating: {
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
DoorFramingSchema.pre("save", function (next) {
  //add Slug
  this.slug = slugify(this.statusOf);
  next();
});
module.exports = mongoose.model("DoorFraming", DoorFramingSchema);
