import mongoose from "mongoose";
import paginate from "mongoose-paginate-v2";
import { Schema, model } from 'mongoose'

const collectionName = 'carts'

const cartSchema = mongoose.Schema({
    products: [
        {
            product: { type: mongoose.Schema.Types.ObjectId, ref: "products", required: true },
            quantity: { type: Number, required: true },
        }
    ]
})

cartSchema.pre('find', function () { this.populate('products.product') })
cartSchema.pre('findOne', function () { this.populate('products.product') })

cartSchema.plugin(paginate)

const cartModel = mongoose.model(collectionName, cartSchema)

export default cartModel