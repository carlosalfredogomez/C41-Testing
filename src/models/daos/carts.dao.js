import cartsModel from '../schemas/carts.schema.js'
import CartDTO from '../DTO/cart.dto.js'
import productModel from '../schemas/products.schema.js'

class CartsDAO {
    constructor() {
        console.log('Carts DAO connected.')
    }

    getAll = async () => {
        try {
            let carts = await cartsModel.find().lean()
            return carts.length <= 0 ? ({ status: 500, message: 'Carts collection is empty.' }) : ({ carts })
        } catch (error) { throw error }
    }

    getCartById = async (cid) => {
        try {
            let cart = await cartsModel.findById(cid).populate('products', 'product')
            return cart
        } catch (error) { throw error }
    }

    createCart = async () => {
        try {
            let newCart = new CartDTO()
            const result = await cartsModel.create(newCart)
            return ({ status: 200, message: 'Cart created.', payload: result })
        } catch (error) { throw error }
    }

    addProductToCart = async (cid, pid, user) => {
        try {
            const thisCart = await cartsModel.findById(cid)
            if (!thisCart) { return { status: 500, message: 'Cart doesnt exist, check id.' } }
            if (user.cartId !== thisCart._id) return { status: 401, message: 'This cart doesnt belong to you scroundel!' }

            let thisProduct = await productModel.findById(pid)
            if (!thisProduct) return { status: 500, message: 'Product doesnt exist in db, check id.' }
            if (user.email === thisProduct.owner) return { status: 401, message: 'This product owner is you! You cant buy it! sod off!' }

            const productIndex = await thisCart.products.findIndex((item) => item.product._id.toString() === pid);
            if (productIndex !== -1) {
                thisCart.products[productIndex].quantity = parseInt(thisCart.products[productIndex].quantity) + 1
            } else {
                thisCart.products.push({ product: pid, quantity: 1 })
            }

            const updateResult = await cartsModel.updateOne({ _id: cid }, thisCart, { new: true });

            if (updateResult.modifiedCount === 1) {
                return { status: 200, message: `Product added to cart`, payload: thisCart };
            } else {
                return { status: 500, message: 'Cart not found or no changes were made.' };
            }
        } catch (error) { throw error }
    }

    updateQuantity = async (cid, pid, quantity) => {
        try {
            const thisCart = await cartsModel.findById(cid);
            if (!thisCart) return { status: 404, message: 'Cart not found' };

            const productIndex = thisCart.products.findIndex(item => item.product._id.toString() === pid);
            if (productIndex === -1) return { status: 500, message: 'Product does not exist in cart, check ID.' };

            const initialQuantity = thisCart.products[productIndex].quantity;
            thisCart.products[productIndex].quantity = quantity;

            const updateResult = await cartsModel.findByIdAndUpdate(cid, thisCart, { new: true });

            if (updateResult.products[productIndex].quantity !== initialQuantity) {
                return { status: 200, message: 'Product quantity updated.', payload: updateResult };
            } else {
                return { status: 501, message: 'No changes were made.' };
            }
        } catch (error) {
            throw error;
        }
    };

    replaceProducts = async (cid, newProducts) => {
        try {
            const thisCart = await cartsModel.findById(cid);
            if (!thisCart) return { status: 404, message: 'Cart not found' };

            const initialProducts = JSON.stringify(thisCart.products);
            thisCart.products = newProducts;

            const updateResult = await cartsModel.findByIdAndUpdate(cid, thisCart, { new: true });

            const isCartModified = JSON.stringify(newProducts) !== initialProducts
            if (isCartModified) {
                return { status: 200, message: `Complete products of ${cid} updated.`, payload: updateResult };
            } else {
                return { status: 500, message: 'Cart not found or no changes were made.' };
            }
        } catch (error) {
            throw error;
        }
    };

    deleteProductFromCart = async (cid, pid) => {
        try {
            const thisCart = await cartsModel.findById(cid);
            if (!thisCart) return { status: 500, message: 'Cart does not exist, check ID.' };

            const productIndex = thisCart.products.findIndex(item => item.product._id.toString() === pid)
            if (productIndex === -1) return { status: 500, message: 'Product does not exist in cart, check ID.' }

            thisCart.products.splice(productIndex, 1);

            const updateResult = await cartsModel.findByIdAndUpdate(cid, thisCart, { new: true });
            return { status: 200, message: 'Product deleted.', payload: updateResult }

        } catch (error) {
            return { status: 'error', message: `Try failed, caught error: ${error.message}` };
        }
    };

    emptyCart = async (cid) => {
        try {
            const thisCart = await cartsModel.findById(cid);
            if (!thisCart) return { status: 500, message: 'Cart does not exist, check ID.' }

            thisCart.products = []

            const updateResult = await cartsModel.findByIdAndUpdate(cid, thisCart, { new: true });
            return { status: 200, message: 'Cart products reseted.', payload: updateResult };


        } catch (error) { return { status: 'error', message: `Try failed, caught error: ${error.message}` } }

    }
}

export default new CartsDAO()



