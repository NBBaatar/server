const mongoose = require("mongoose");
const CheckListSchema = new mongoose.Schema({
  water: [
    {
      bathroom: [
        {
          workmanship: {
            type: Boolean,
            default: false,
            required: true,
          },
          blueBoard: {
            type: Boolean,
            default: false,
            required: true,
          },
          flexibleSealantAllJoint: {
            type: Boolean,
            default: false,
            required: true,
          },
          flexibleSealantAllAngle: {
            type: Boolean,
            default: false,
            required: true,
          },
          flexibleSealantAllPipe: {
            type: Boolean,
            default: false,
            required: true,
          },
          primerBeenFloorWall: {
            type: Boolean,
            default: false,
            required: true,
          },
          primerBeenAngle: {
            type: Boolean,
            default: false,
            required: true,
          },
          pipe: {
            type: Boolean,
            default: false,
            required: true,
          },
          angle: {
            type: Boolean,
            default: false,
            required: true,
          },
          twoCoatsFloor: {
            type: Boolean,
            default: false,
            required: true,
          },
          twoCoatsWall: {
            type: Boolean,
            default: false,
            required: true,
          },
          showerWall: {
            type: Boolean,
            default: false,
            required: true,
          },
          showerHeight: {
            type: Boolean,
            default: false,
            required: true,
          },
          showerOutside: {
            type: Boolean,
            default: false,
            required: true,
          },
          basinWall: {
            type: Boolean,
            default: false,
            required: true,
          },
          floodTest: {
            type: Boolean,
            default: false,
            required: true,
          },
          photoCheck: {
            type: Boolean,
            default: false,
            required: true,
          },
        },
      ],
      ensuite: [
        {
          workmanship: {
            type: Boolean,
            default: false,
            required: true,
          },
          blueBoard: {
            type: Boolean,
            default: false,
            required: true,
          },
          flexibleSealantAllJoint: {
            type: Boolean,
            default: false,
            required: true,
          },
          flexibleSealantAllAngle: {
            type: Boolean,
            default: false,
            required: true,
          },
          flexibleSealantAllPipe: {
            type: Boolean,
            default: false,
            required: true,
          },
          primerBeenFloorWall: {
            type: Boolean,
            default: false,
            required: true,
          },
          primerBeenAngle: {
            type: Boolean,
            default: false,
            required: true,
          },
          pipe: {
            type: Boolean,
            default: false,
            required: true,
          },
          angle: {
            type: Boolean,
            default: false,
            required: true,
          },
          twoCoatsFloor: {
            type: Boolean,
            default: false,
            required: true,
          },
          twoCoatsWall: {
            type: Boolean,
            default: false,
            required: true,
          },
          showerWall: {
            type: Boolean,
            default: false,
            required: true,
          },
          showerHeight: {
            type: Boolean,
            default: false,
            required: true,
          },
          showerOutside: {
            type: Boolean,
            default: false,
            required: true,
          },
          basinWall: {
            type: Boolean,
            default: false,
            required: true,
          },
          floodTest: {
            type: Boolean,
            default: false,
            required: true,
          },
          photoCheck: {
            type: Boolean,
            default: false,
            required: true,
          },
        },
      ],
      laundry: [
        {
          workmanship: {
            type: Boolean,
            default: false,
            required: true,
          },
          blueBoard: {
            type: Boolean,
            default: false,
            required: true,
          },
          flexibleSealantAllJoint: {
            type: Boolean,
            default: false,
            required: true,
          },
          flexibleSealantAllAngle: {
            type: Boolean,
            default: false,
            required: true,
          },
          flexibleSealantAllPipe: {
            type: Boolean,
            default: false,
            required: true,
          },
          primerBeenFloorWall: {
            type: Boolean,
            default: false,
            required: true,
          },
          primerBeenAngle: {
            type: Boolean,
            default: false,
            required: true,
          },
          pipe: {
            type: Boolean,
            default: false,
            required: true,
          },
          angle: {
            type: Boolean,
            default: false,
            required: true,
          },
          twoCoatsFloor: {
            type: Boolean,
            default: false,
            required: true,
          },
          twoCoatsWall: {
            type: Boolean,
            default: false,
            required: true,
          },
          Wall: {
            type: Boolean,
            default: false,
            required: true,
          },

          showerOutside: {
            type: Boolean,
            default: false,
            required: true,
          },
          laundryWall: {
            type: Boolean,
            default: false,
            required: true,
          },
          floodTest: {
            type: Boolean,
            default: false,
            required: true,
          },
          photoCheck: {
            type: Boolean,
            default: false,
            required: true,
          },
        },
      ],
      balcony: [
        {
          workmanship: {
            type: Boolean,
            default: false,
            required: true,
          },
          doorHob: {
            type: Boolean,
            default: false,
            required: true,
          },
          flexibleSealant: {
            type: Boolean,
            default: false,
            required: true,
          },
          primerBeen: {
            type: Boolean,
            default: false,
            required: true,
          },
          twoCoats: {
            type: Boolean,
            default: false,
            required: true,
          },
          wall: {
            type: Boolean,
            default: false,
            required: true,
          },
          photoCheck: {
            type: Boolean,
            default: false,
            required: true,
          },
        },
      ],
    },
  ],
  fire: [
    {
      electric: {
        type: Boolean,
        required: true,
        default: false,
      },
      plumbing: {
        type: Boolean,
        required: true,
        default: false,
      },
      dryFireRoughIn: {
        type: Boolean,
        required: true,
        default: false,
      },
      sprinklerRoughIn: {
        type: Boolean,
        required: true,
        default: false,
      },
      acRoughIn: {
        type: Boolean,
        required: true,
        default: false,
      },
      plywoodSupports: {
        type: Boolean,
        required: true,
        default: false,
      },
      windowDoorAngle: {
        type: Boolean,
        required: true,
        default: false,
      },
      HebelWalls: {
        type: Boolean,
        required: true,
        default: false,
      },
      hebelCompliant: {
        type: Boolean,
        required: true,
        default: false,
      },
      flexibleSealant: {
        type: Boolean,
        required: true,
        default: false,
      },
      SpecifySealant: {
        type: Boolean,
        required: true,
        default: false,
      },
      InspectConcrete: {
        type: Boolean,
        required: true,
        default: false,
      },
      frontFireRate: {
        type: Boolean,
        required: true,
        default: false,
      },
      pvc: {
        type: Boolean,
        required: true,
        default: false,
      },
      treated: {
        type: Boolean,
        required: true,
        default: false,
      },
      penetratingCables: {
        type: Boolean,
        required: true,
        default: false,
      },
      strippedThroughTheWall: {
        type: Boolean,
        required: true,
        default: false,
      },
      cables: {
        type: Boolean,
        required: true,
        default: false,
      },
      sprinklerPipes: {
        type: Boolean,
        required: true,
        default: false,
      },
      sprinklerTreated: {
        type: Boolean,
        required: true,
        default: false,
      },
      penetratingSlabs: {
        type: Boolean,
        required: true,
        default: false,
      },
      certifiedFireCollar: {
        type: Boolean,
        required: true,
        default: false,
      },
      MarkModel: {
        type: Boolean,
        required: true,
        default: false,
      },
      AcPenetrations: {
        type: Boolean,
        required: true,
        default: false,
      },
      AcTreated: {
        type: Boolean,
        required: true,
        default: false,
      },
      photoCheck: {
        type: Boolean,
        default: false,
        required: true,
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

  count: Number,
});

module.exports = mongoose.model("CheckList", CheckListSchema);
