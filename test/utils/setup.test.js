import mongoose from "mongoose";
import productModel from "../../src/models/schemas/products.schema.js";
import cartModel from "../../src/models/schemas/carts.schema.js";
import userModel from "../../src/models/schemas/users.schema.js";

export const connectTestDatabase = async () => {
    await mongoose.connect('mongodb+srv://carlosalfredogomez:MongoAtlas423@ecommerce.d3n3mjn.mongodb.net/?retryWrites=true&w=majority')
}

export const disconnectTestDatabase = async () => {
    mongoose.connection.close()
}


export const dropProducts = async () => {
    await productModel.collection.drop()
}

export const dropCarts = async () => {
    await cartModel.collection.drop()
}

export const dropUsers = async () => {
    console.log('drop user null')
    await userModel.collection.drop()
}