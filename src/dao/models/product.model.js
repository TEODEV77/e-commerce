import mongoose from "mongoose";
import moongosePaginate from 'mongoose-paginate-v2';

const productSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    code: { type: String, unique: true, required: true },
    category: { type: String, required: true },
    description: { type: String, required: true },
    stock: { type: Number, required: true },
    price: { type: Number, required: true },
    status: { type: Boolean, default: true },
    thumbnails: { type: Array, default: [] },
  },
  { timestamps: true }
);

productSchema.plugin(moongosePaginate);
export default mongoose.model("products", productSchema);
