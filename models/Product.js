const mongoose = require("mongoose");

const ProductSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "product must have a name"],
    },
    price: {
      type: Number,
      required: [true, "product must have a price"],
    },
    description: {
      type: String,
      required: [true, "product must have a description"],
    },
    category: {
      type: String,
      required: [true, "product must have a category"],
    },
    character: {
      type: String,
      required: [true, "product must specify a character"],
      enum: {
        values: [
          "Hello Kitty",
          "My Melody",
          "Badtz-Maru",
          "Pompompurin",
          "Cinnamoroll",
          "Kuromi",
          "Anime",
        ],
        message: `{VALUE} is not supported`,
      },
    },
    image: {
      type: String,
      default: "/uploads/default.jpg",
    },
    stock: {
      type: Number,
      required: [true, "must specify inventory stock"],
    },
    user: {
      type: mongoose.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Product", ProductSchema);
