import CartsService from '../service/carts.service.js'
import ticketsService from '../service/tickets.service.js'


class CartsController {

    getAll = async (req, res) => {
        try {
            const allCarts = await CartsService.getAll()
            res.status(200).send({ total: allCarts.carts.length, payload: allCarts })
        } catch (error) { throw error }
    }

    getCartById = async (req, res) => {
        try {
            const cid = req.params.cid
            const foundCart = await CartsService.getCartById(cid)
            res.send({ payload: foundCart })

        } catch (error) { throw error }
    }

    createCart = async (req, res) => {
        try {
            const response = await CartsService.createCart()
            if (response.status === 200) {
                res.status(200).send({ status: "Ok", message: "New cart added." })
            } else {
                res.send({ status: "Error", payload: response })
            }
        } catch (error) { throw error }
    }

    addToCart = async (req, res) => {
        try {
            const cid = req.params.cid
            const pid = req.params.pid
            const user = req.session.user

            const result = await CartsService.addProductToCart(cid, pid, user)
            res.status(200).send({ payload: result });
        } catch (error) { throw error }
    }

    updateQuantity = async (req, res) => {
        try {
            const cid = req.params.cid
            const pid = req.params.pid

            const quantity = req.body
            const quantityNumber = parseInt(quantity.quantity)

            const result = await CartsService.updateQuantity(cid, pid, quantityNumber)
            res.status(200).send({ payload: result })

        } catch (error) { throw error }
    }

    replaceProducts = async (req, res) => {
        try {
            const cid = req.params.cid
            const newProducts = req.body

            const result = await CartsService.replaceProducts(cid, newProducts)
            res.status(200).send({ payload: result })

        } catch (error) { throw error }
    }

    deleteProductFromCart = async (req, res) => {
        try {
            const cid = req.params.cid
            const pid = req.params.pid
            const result = await CartsService.deleteProductFromCart(cid, pid)
            res.status(200).send({ payload: result })

        } catch (error) { throw error }
    }

    emptyCart = async (req, res) => {
        try {
            const cid = req.params.cid
            const result = await CartsService.emptyCart(cid)
            res.status(200).send({ status: "Ok", payload: result })

        } catch (error) { throw error }
    }
    
    createTicket = async (req, res) => {
        try {
            console.log('ticket controller')
            const cid = req.params.cid
            const user = req.session.user
            const response = await ticketsService.createTicket(user, cid)
            res.status(200).json(response)

        } catch (error) {
            throw error
        }
    }

}

export default new CartsController()