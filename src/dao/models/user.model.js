import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    firstName: { type: String, required: true },
    lastName: { type: String },
    role: {
      type: String,
      enum: ['admin', 'user'],
      default: 'user',
    },
    email: { type: String, required: true, unique: true },
    username: { type: String, default: '' },
    provider: { type: String, default: '' },
    password: { type: String },
    age: { type: Number, required: true },
    cid: { type: String, default: ''},
  },
  { timestamps: true }
);
export default mongoose.model("users", userSchema);

