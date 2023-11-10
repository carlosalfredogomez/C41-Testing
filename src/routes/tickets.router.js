import { Router } from "express";
import cartsController from "../controllers/carts.controller.js";
import ticketsController from "../controllers/tickets.controller.js";

const router = Router()

//----------------/api/tickets

router.get('/', ticketsController.getAll)
router.get('/:cid/purchase', cartsController.createTicket)

export default router