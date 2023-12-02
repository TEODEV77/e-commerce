import mongoose from "mongoose";

export const MONGO_URI = `mongodb+srv://${process.env.MONGO_ADMIN}:${process.env.MONGO_ADMIN_PASSWORD}@test.tkegg6l.mongodb.net/ecommerce?retryWrites=true&w=majority`

export const initMongoDB  = async () => {
    try {
        await mongoose.connect(MONGO_URI);
        console.log('MongoDB connected');
    } catch (error) {
        console.log(error.message);
    }
}