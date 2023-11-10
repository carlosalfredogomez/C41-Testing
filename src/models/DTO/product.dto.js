import { generateNewCode } from '../../utils/utils.js'

export default class ProductsDTO {
    constructor(product) {
        if (!this.isValidProduct(product)) {
            throw new Error('Invalid product data.');
        }

        this.title = product.title;
        this.description = product.description;
        this.category = product.category;
        this.code = generateNewCode()
        this.price = product.price;
        this.stock = product.stock;
        this.thumbnail = product.thumbnail;
        this.owner = product.owner
    }

    isValidProduct(product) {
        return (
            product &&
            typeof product.title === 'string' &&
            typeof product.description === 'string' &&
            typeof product.category === 'string' &&
            typeof product.price === 'number' &&
            typeof product.stock === 'number' &&
            typeof product.thumbnail === 'string' &&
            typeof product.owner === 'string'
        );
    }
}

