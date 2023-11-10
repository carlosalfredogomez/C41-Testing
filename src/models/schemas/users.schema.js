import mongoose from "mongoose";

const collectionName = 'users'
const userSchema = new mongoose.Schema({
    first_name: String,
    last_name: String,
    email: {
        type: String,
        unique: true
    },
    age: Number,
    password: {
        type: String
        
    },
    cartId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "carts",
    },
    role: {
        type: String,
        enum: ["admin", "user", "premium"],
        default: 'user'
    }
})

const userModel = mongoose.model(collectionName, userSchema)
export default userModel