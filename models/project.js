const mongoose = require("mongoose");
const { slugify } = require("transliteration");
const ProjectSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "You must enter your information"],
    trim: true,
    maxlenght: [50, "Your information not more than 50 characters"],
  },
  location: {
    type: String,
    required: [true, "You must enter your information"],
    trim: true,
    maxlenght: [50, "Your information not more than 50 characters"],
  },

  createdAt: {
    type: Date,
    default: Date.now,
  },
  created_user: {
    type: mongoose.Schema.ObjectId,
    ref: "User",
  },
  slug: String,
  count: Number,
});
ProjectSchema.pre("save", function (next) {
  //add Slug
  this.slug = slugify(this.name);
  next();
});
module.exports = mongoose.model("Project", ProjectSchema);
