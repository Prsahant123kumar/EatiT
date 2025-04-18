const mongoose = require("mongoose");

const InformationSchema = new mongoose.Schema(
  {
    fullname: {
      type: String,
      required: true,
      trim: true,
    },
    Age: {
      type: Number,
      required: true,
      min: 1,
      max: 120,
    },
    Gender: {
      type: String,
      enum: ["Male", "Female", "Other"],
      required: true,
    },
    Height: {
      type: String, // Example: "5'8\"" or "172 cm"
      required: true,
    },
    Purpose: {
      type: String, // Example: "Weight Loss", "Muscle Gain", etc.
      required: true,
    },
    Allerggies: {
      type: [String], // Example: ["Peanuts", "Lactose"]
      default: [],
    },
    Dieases: {
      type: [String], // Example: ["Diabetes", "Hypertension"]
      default: [],
    },
    Health_Goals: {
      type: [String], // Example: ["Lose 10kg", "Build endurance"]
      default: [],
    },
    Dietary_Preference: {
      type: String,
      enum: ["Vegan", "Vegetarian", "Non-Vegetarian", "Keto", "Other"],
      required: true,
    },
    Additional_Information: {
      type: String,
      maxlength: 500,
    },
    authId: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "UserAuth",
        required: true,
      },
    ],
  },
  { timestamps: true }
);

const Information = mongoose.model("Information", InformationSchema);

module.exports = { Information };
