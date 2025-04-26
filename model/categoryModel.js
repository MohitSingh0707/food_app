const mongoose = require("mongoose");

// creating user schema
const categorySchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, "Please provide a title"],
    },
    imageUrl: {
      type: String,
      default:
        "https://as1.ftcdn.net/v2/jpg/02/41/30/72/1000_F_241307210_MjjaJC3SJy2zJZ6B7bKGMRsKQbdwRSze.jpg",
    },
    
  },
  { timestamps: true }
);

// export
module.exports = mongoose.model("Category", categorySchema);
