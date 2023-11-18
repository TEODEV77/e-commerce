import mongoose from "mongoose";

const cartSchema = new mongoose.Schema({
  products: { type: Array, default: [] },
});

export default mongoose.model("carts", cartSchema);
