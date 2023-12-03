import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    role: {
      type: String,
      enum: ['admin', 'user'],
      default: 'user',
    },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    age: { type: Number, required: true },
    cid: { type: String, default: ''},
  },
  { timestamps: true }
);
'adminCoder@coder.com','adminCod3r123'
export default mongoose.model("users", userSchema);

