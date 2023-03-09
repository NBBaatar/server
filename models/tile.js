const mongoose = require("mongoose");
const TilesSchema = new mongoose.Schema({
  kitchen: [
    {
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
    },
  ],
  bathroom: [
    {
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
    },
  ],
  ensuite: [
    {
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
    },
  ],
  laundry: [
    {
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

  count: Number,
});

module.exports = mongoose.model("Tiles", TilesSchema);
