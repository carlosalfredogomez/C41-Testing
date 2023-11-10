import mongoose from "mongoose";

const collectionName = 'tickets'

const ticketsSchema = mongoose.Schema({
    code: {
        type: String,
        unique: true,
        required: true,
    },
    purchase_datetime: {
        type: Date,
        default: Date.now,
    },
    amount: {
        type: Number,
        required: true,
    },
    purchaser: {
        type: String,
        required: true,
    }
})

const ticketsModel = mongoose.model(collectionName, ticketsSchema)

export default ticketsModel