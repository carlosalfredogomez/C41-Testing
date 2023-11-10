import productsService from "./products.service.js";
import cartsService from "./carts.service.js";
import TicketDTO from "../models/DTO/ticket.dto.js";
import ticketsDao from "../models/daos/tickets.dao.js"

class TicketService {

    getAll = async (user, cid) => {
        const response = await ticketsDao.getAll()
        return response
    }

    createTicket = async (user, cid) => {
        try {
            if (user.cartId !== cid) return { error: 'Cart Id and cid doesnt match' };
            const thisCart = await cartsService.getCartById(cid);
            if (!thisCart) return { error: 'Cart not found not found' };

            const cartFilterOutStock = [];
            const productsForTicket = [];
            let totalPrice = 0;
            for (const { product, quantity } of thisCart.products) {
                if (product.stock < quantity) {
                    cartFilterOutStock.push({
                        product: product,
                        quantity: quantity
                    })
                } else {
                    const remainingStock = product.stock - quantity;
                    totalPrice += product.price * quantity;

                    await productsService.updateProduct(product._id, { stock: remainingStock })

                    productsForTicket.push({
                        product: {
                            _id: product._id,
                            title: product.title,
                            price: product.price,
                        },
                        quantity,
                    });
                }
            }
            
            if (productsForTicket.length === 0) {
                return {
                    status: 204,
                    warning: 'no content',
                    message: "No se pudo comprar ningun producto por falta de stock"
                }
            } else {
                thisCart.products = cartFilterOutStock;
                const newTicket = new TicketDTO(totalPrice, user.email)
                const ticketResponse = await ticketsDao.createTicket(newTicket)
                const updatedCart = await cartsService.replaceProducts(cid, thisCart.products)

                const info = {
                    updatedCart: updatedCart,
                    purchasedItems: productsForTicket,
                    ticket: ticketResponse
                };
                return info;
            }
        } catch (error) {
            throw error
        }
    }
}

export default new TicketService