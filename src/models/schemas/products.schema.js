import mongoose from "mongoose";
import paginate from "mongoose-paginate-v2";

const collectionName = 'products'

const productSchema = mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    category: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    thumbnail: {
        type: String,
        required: true
    },
    code: {
        type: String,
        required: true
    },
    stock: {
        type: Number,
        required: true
    },
    owner: {
        type: String,
        required: true,
        default: 'admin'
    }
}
)

productSchema.plugin(paginate)

const productModel = mongoose.model(collectionName, productSchema)

export default productModel