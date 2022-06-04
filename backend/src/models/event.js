const mongoose = require("mongoose");
const validator = require("validator");

const eventSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },

    location: {
      type: String,
      required: true,
      trim: true,
    },

    description: {
      type: String,
      required: true,
      trim: true,
    },

    date: {
      type: Date,
      required: true,
    },

    price: {
      type: Number,
      default: 0,
    },

    pic: {
      type: String,
      required: true,
      default:
        "http://flxtable.com/wp-content/plugins/pl-platform/engine/ui/images/default-landscape.png",
    },

    owner: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "User",
    },
  },
  {
    timestamps: true,
  }
);

const Event = mongoose.model("Event", eventSchema);

module.exports = Event;
