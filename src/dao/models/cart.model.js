import mongoose from "mongoose";

const productItem = new mongoose.Schema({
  product: {type : mongoose.Schema.Types.ObjectId, ref: 'products'},
  quantity: {type: Number, required: true},
}, { _id : false});

const cartSchema = new mongoose.Schema({
  products: { type: [productItem], default: [] },
});




export default mongoose.model("carts", cartSchema);
