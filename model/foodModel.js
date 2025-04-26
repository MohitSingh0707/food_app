const mongoose = require("mongoose");

// creating user schema
const foodSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, "Please provide Food title"],
    },
    description: {
      type: String,
      required: [true, "Please provide Food description"],
    },
    price: {
      type: Number,
      required: [true, "Please provide Food price"],
    },
    imageUrl: {
      type: String,
      default:
        "https://as1.ftcdn.net/v2/jpg/02/41/30/72/1000_F_241307210_MjjaJC3SJy2zJZ6B7bKGMRsKQbdwRSze.jpg",
    },
    foodTags: {
      type: String,
    },
    category: {
      type: String,
    },
    code: {
      type: String,
    },
    isAvailable: {
      type: Boolean,
      default: true,
    },
    resturant: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Resturant",
    },
    rating: {
      type: Number,
      default: 5,
      min: 1,
      max: 5,
    },
    ratingCount: {
      type: String,
    },
  },
  { timestamps: true }
);

// export
module.exports = mongoose.model("Foods", foodSchema);
