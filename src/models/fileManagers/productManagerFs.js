import fs from "fs"

//MANAGER HECHO ORIENTADO A FILE SYSTEM
export default class ProductManager {

    constructor(path) {
        this.path = path
    }
    //OBTENER PRODUCTOS (GET)
    getProducts = async () => {
        try {
            if (fs.existsSync(this.path)) {
                let data = await fs.promises.readFile(this.path, "utf-8")
                const productsObj = JSON.parse(data)
                return productsObj
            }
        } catch (error) { console.log(`GetProduct in manager failed, error is ${error.message}`) }

    }

    //VALIDACION DE TIPO DE DATOS
    async checkProductValues(thisProduct) {
        async function isString(value) {
            return typeof value === 'string';
        }
        async function isNumber(value) {
            return typeof value === 'number';
        }

        const data = await fs.promises.readFile(this.path, "utf-8")
        const productsObj = JSON.parse(data)

        try {
            if (await isString(thisProduct.title) === true &&
                await isString(thisProduct.description) === true &&
                await isNumber(thisProduct.price) === true &&
                await isString(thisProduct.thumbnail) == true &&
                await isString(thisProduct.category) === true &&
                await isString(thisProduct.code) === true &&
                await isNumber(thisProduct.stock) === true) {
                return true
            } else {
                console.log("Manager checkProductValues, primer validacion (existencia y tipo de datos) fallida.")
                return false
            }

        } catch (error) {
            console.log(`Manager CheckValues failed, ${error.message}`)
        }
    }
    //AÑADIR PRODUCTO (GET)
    async addProduct(newProduct) {

        const productsObj = await this.getProducts()

        try {
            if (fs.existsSync(this.path)) {
                if (await this.checkProductValues(newProduct) === true) {
                    let codeCheckIfFound = productsObj.some(x => x.code === newProduct.code)
                    if (codeCheckIfFound == true) {
                        return { status: "Failed", message: `AddProduct in manager failed, product already in database.` }
                    } else {
                        newProduct.id = productsObj.length + 1
                        productsObj.push(newProduct)
                        await fs.promises.writeFile(this.path, JSON.stringify(productsObj), null, "\t")
                        return { status: `Ok`, message: `AddProduct in manager Success.` }
                    }

                } else {
                    return { status: "Failed", message: `AddProduct in manager failed, check values of properties.` }
                }
            } else {
                return { status: "Failed", message: `AddProduct in manager failed, database doesn't exist, check path, ${this.path}` }
            }
        } catch (error) {
            console.log(`AddProduct in manager failed, error is ${error.message}`)
            return { status: `Failed`, message: `AddProduct in manager failed, error is ${error.message}.` }
        }
    }

    //OBBTENER PRODUCTO POR ID (GET)
    async getProductById(thisId) {
        try {
            const data = await fs.promises.readFile(this.path, "utf-8")
            const productsObj = JSON.parse(data)
            let foundId = productsObj.find(x => x.id === thisId)
            if (foundId) {
                return foundId
            } else {
            }
        } catch (error) { console.log(`GPI error is ${error.message}`) }
    }

    //ACTUALIZAR PRODUCTO (PUT)
    async updateProduct(thisProduct) {
        try {
            const productsObj = await this.getProducts()
            let foundProduct = productsObj.find(x => x.id === thisProduct.id)

            if (foundProduct) {
                if (await this.checkProductValues(thisProduct) === true) {
                    console.log(`UPDATE PRODUCT: Updating ${foundProduct.title + " " + foundProduct.description} with new values.`)
                    const foundIndex = productsObj.findIndex(x => x.id === thisProduct.id)
                    productsObj[foundIndex] = thisProduct
                    await fs.promises.writeFile(this.path, JSON.stringify(productsObj), null, "\t")
                    return { status: "Ok", message: "Update Product from manager successfull." }
                } else {
                    console.log("Update Product from manager failed, check values.")
                    return { status: "Failed", message: "Update Product from manager failed, check product values." }
                }
            } else {
                return { status: "Failed", message: "Update Product from manager, product not found in database." }
            }
        } catch (error) { console.log(`UpdateProduct in manager failed, error is ${error.message}`) }
    }

    //ELIMINAR PRODUCTO (DELETE)
    async deleteProduct(thisId) {
        try {
            const data = await fs.promises.readFile(this.path, "utf-8")
            const productsObj = JSON.parse(data)
            const foundIndex = productsObj.findIndex(x => x.id === thisId)

            if (foundIndex >= 0) {
                productsObj.splice(foundIndex, 1)
                await fs.promises.writeFile(this.path, JSON.stringify(productsObj), null, "\t")
            } else {
                console.log(`DELETE PRODUCT: Product not found.`)
            }
        } catch (error) { console.log(`DeleteProduct in manager failed, error is ${error.message}`) }
    }
}


