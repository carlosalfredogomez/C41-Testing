import { Router } from 'express'
import CartsController from '../controllers/carts.controller.js'

const router = Router()

//-----api/carts

//GET CARTS
router.get('/', CartsController.getAll)

//CREATE CART
router.post('/', CartsController.createCart)

//GET BY ID
router.get('/:cid', CartsController.getCartById)

//UPDATE ARRAY OF PRODUCTS IN CART
router.put('/:cid', CartsController.replaceProducts)

//EMPTY CART
router.delete('/:cid', CartsController.emptyCart)

//ADD TO CART
router.post('/:cid/products/:pid', CartsController.addToCart)

//UPDATE QUANTITY OF PRODUCT IN CART
router.put('/:cid/products/:pid', CartsController.updateQuantity)

//DELETE PRODUCT FROM CART
router.delete('/:cid/products/:pid', CartsController.deleteProductFromCart)



export default router