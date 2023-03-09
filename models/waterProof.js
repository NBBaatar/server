const mongoose = require("mongoose");
const { slugify } = require("transliteration");
const WaterProofSchema = new mongoose.Schema({
  before: [
    {
      balcony: [
        {
          level: {
            type: String,
            required: true,
            trim: true,
            default: "No value",
          },
          angle: {
            type: String,
            required: true,
            trim: true,
            default: "No value",
          },
          concrate: {
            type: String,
            required: true,
            trim: true,
            default: "No value",
          },
          patch: {
            type: String,
            required: true,
            trim: true,
            default: "No value",
          },
          subStraight: {
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
          level: {
            type: String,
            required: true,
            trim: true,
            default: "No value",
          },
          angle: {
            type: String,
            required: true,
            trim: true,
            default: "No value",
          },
          concrate: {
            type: String,
            required: true,
            trim: true,
            default: "No value",
          },
          patch: {
            type: String,
            required: true,
            trim: true,
            default: "No value",
          },
          subStraight: {
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
      landry: [
        {
          level: {
            type: String,
            required: true,
            trim: true,
            default: "No value",
          },
          angle: {
            type: String,
            required: true,
            trim: true,
            default: "No value",
          },
          concrate: {
            type: String,
            required: true,
            trim: true,
            default: "No value",
          },
          patch: {
            type: String,
            required: true,
            trim: true,
            default: "No value",
          },
          subStraight: {
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
      ensuit: [
        {
          level: {
            type: String,
            required: true,
            trim: true,
            default: "No value",
          },
          angle: {
            type: String,
            required: true,
            trim: true,
            default: "No value",
          },
          concrate: {
            type: String,
            required: true,
            trim: true,
            default: "No value",
          },
          patch: {
            type: String,
            required: true,
            trim: true,
            default: "No value",
          },
          subStraight: {
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
    },
  ],
  after: [
    {
      balcony: [
        {
          level: {
            type: String,
            required: true,
            trim: true,
            default: "No value",
          },
          angle: {
            type: String,
            required: true,
            trim: true,
            default: "No value",
          },
          concrate: {
            type: String,
            required: true,
            trim: true,
            default: "No value",
          },
          patch: {
            type: String,
            required: true,
            trim: true,
            default: "No value",
          },
          subStraight: {
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
          level: {
            type: String,
            required: true,
            trim: true,
            default: "No value",
          },
          angle: {
            type: String,
            required: true,
            trim: true,
            default: "No value",
          },
          concrate: {
            type: String,
            required: true,
            trim: true,
            default: "No value",
          },
          patch: {
            type: String,
            required: true,
            trim: true,
            default: "No value",
          },
          subStraight: {
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
                default: "No value",
              },
              uri: {
                type: String,
                default: "photo.png",
              },
            },
          ],
        },
      ],
      landry: [
        {
          level: {
            type: String,
            required: true,
            trim: true,
            default: "No value",
          },
          angle: {
            type: String,
            required: true,
            trim: true,
            default: "No value",
          },
          concrate: {
            type: String,
            required: true,
            trim: true,
            default: "No value",
          },
          patch: {
            type: String,
            required: true,
            trim: true,
            default: "No value",
          },
          subStraight: {
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
      ensuit: [
        {
          level: {
            type: String,
            required: true,
            trim: true,
            default: "No value",
          },
          angle: {
            type: String,
            required: true,
            trim: true,
            default: "No value",
          },
          concrate: {
            type: String,
            required: true,
            trim: true,
            default: "No value",
          },
          patch: {
            type: String,
            required: true,
            trim: true,
            default: "No value",
          },
          subStraight: {
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
  statusOf: [
    {
      complate: {
        type: Boolean,
        default: false,
      },
      fixing: {
        type: String,
        default: "No value",
      },
      other: {
        type: String,
        default: "No value",
      },
    },
  ],
  slug: String,
  count: Number,
});
WaterProofSchema.pre("save", function (next) {
  //add Slug
  this.slug = slugify(this.unit);
  next();
});
module.exports = mongoose.model("WaterProof", WaterProofSchema);
