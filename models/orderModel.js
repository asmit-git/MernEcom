import mongoose from "mongoose";

const orderSchema = new mongoose.Schema(
  {
    amount: {
      type: Number,
      required: true,
    },
    products: [
      {
        type: mongoose.ObjectId,
        ref: "Products",
      },
    ],
    paymentStatus: {
      type: String,
      enum: ["pending", "paid"],
      required: true,
    },
    paymentType: {
      type: String,
      enum: ["cash", "card"],
      required: true,
    },
    receiver: {},
    buyer: {
      type: mongoose.ObjectId,
      ref: "Users",
    },
    status: {
      type: String,
      default: "Not Process",
      enum: ["Not Process", "Processing", "Delivering", "Completed", "Cancelled", "Refunded"],
    },
  },
  { timestamps: true }
);

export default mongoose.model("Orders", orderSchema);
