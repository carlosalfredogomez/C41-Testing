import fs from "fs"
import ProductManager from "./productManagerFs.js"

const productManager = new ProductManager("./data/products.json")

//MANAGER ORIENTADO A FILE SYSTEM
export default class CartManager {
    constructor(path) {
        this.path = path
    }

    //CREAR CARRITO
    createCart = async () => {
        try {
            if (fs.existsSync(this.path)) {
                const data = await fs.promises.readFile(this.path, "utf-8")
                const cartsArray = JSON.parse(data)
                let newCart = {
                    id: cartsArray.length + 1,
                    products: []
                }
                cartsArray.push(newCart)
                fs.promises.writeFile(this.path, JSON.stringify(cartsArray), null, "\t")
            } else {
                let newCartsArray = []
                let newCart = {
                    id: newCartsArray.length + 1,
                    products: []
                }
                newCartsArray.push(newCart)
                fs.promises.writeFile(this.path, JSON.stringify(newCartsArray), null, "\t")
            }
        } catch (error) { error.message }
    }

    //OBTENER CARRITO
    getCarts = async () => {
        const data = await fs.promises.readFile(this.path, "utf-8")
        const cartsArray = JSON.parse(data)
        return cartsArray
    }

    //OBTENER CARRITO POR ID
    getCartById = async (cartId) => {
        const data = await fs.promises.readFile(this.path, "utf-8")
        const cartsArray = JSON.parse(data)
        const foundCart = cartsArray.find(x => x.id === cartId)
        return foundCart
    }

    //AÑADIR PRODUCTO AL CARRITO
    addProductToCart = async (cartId, productId) => {

        const cartData = await fs.promises.readFile(this.path, "utf-8")
        const cartsArray = JSON.parse(cartData)
        const foundCart = await this.getCartById(cartId)
        const foundProductInDb = await productManager.getProductById(productId)

        try {
            if (foundCart && foundProductInDb) {
                const productExistsInsideCart = await foundCart.products.find(x => x.id == productId)
                if (!productExistsInsideCart) {
                    foundCart.products.push({ id: productId, quantity: 1 })
                } else {
                    productExistsInsideCart.quantity += 1
                }
                const modifiedCartIndex = cartsArray.findIndex(x => x.id === cartId)
                cartsArray[modifiedCartIndex] = foundCart
                fs.promises.writeFile(this.path, JSON.stringify(cartsArray), null, "\t")
            } else {
                console.log("addProductToCart failed, cart or product not found.")
            }
        } catch (error) { return error.message }
    }
}