import ProductsDAO from './products.dao.js'
import CartsDAO from './carts.dao.js'
import MessagesDAO from './messages.dao.js'

export const getDAOS = () => {
    return {
        ProductsDAO,
        CartsDAO,
        MessagesDAO
    };
}

