import productsModel from '../schemas/products.schema.js'

class ProductsDAO {
    constructor() {
        console.log('Products DAO conected.')
    }

    //GET ALL
    async getAll() {
        try {
            const products = await productsModel.find().lean()
            return products
        } catch (error) {
            throw error;
        }

    }

    //GET PRODUCT BY ID
    getProductById = async (pid) => {
        try {
            let foundProduct = await productsModel.findById(pid)
            if (!foundProduct) return null

            return foundProduct
        } catch (error) {
            throw error;
        }
    }

    //NEW PRODUCT
    createProduct = async (product) => {
        try {
            const response = await productsModel.create(product)
            return { status: 200, message: `Product added.`, payload: response }
        } catch (error) {
            throw error;
        }
    }

    //UPDATE PRODUCT
    updateProduct = async (pid, newData, user) => {
        try {
            let foundProduct = await productsModel.findById(pid)
            if (!foundProduct) return null

            if (user.role === 'admin' || user.email === foundProduct.owner) {
                const updatedProduct = await productsModel.findByIdAndUpdate(pid, newData, { new: true });
                return updatedProduct;
            } else {
                return { message: 'You are not an admin nor the owner of the product, forbidden.' };
            }
        } catch (error) {
            throw error;
        }
    }

    //DELETE PRODUCT
    deleteProduct = async (pid, user) => {
        try {
            let foundProduct = await productsModel.findById(pid)
            if (!foundProduct) return null

            if (user.role === 'admin' || user.email === foundProduct.owner) {
                const result = await productsModel.deleteOne({ _id: pid });
                return { status: 'Success.', message: `Product ${pid} deleted.` };
            } else {
                return { message: 'You are not an admin nor the owner of the product, forbidden.' };
            }



        } catch (error) { return { status: 'Error', message: error.message } }
    };


    //generateNewCode 7 digits
    generateNewCode = async () => {
        const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
        let randomCode = '';
        for (let i = 0; i < 7; i++) {
            const randomIndex = Math.floor(Math.random() * characters.length);
            randomCode += characters[randomIndex];
        }
        return randomCode
    }
}

export default new ProductsDAO()

