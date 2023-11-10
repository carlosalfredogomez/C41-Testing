import { Router } from "express";
import { getDAOS } from '../models/daos/index.dao.js'

const { MessagesDAO } = getDAOS()

const router = Router()

//api/messages
router.get('/', async (req, res) => {
    try {
        let allMessages = await MessagesDAO.getAllMessages()
        console.log(allMessages)
        res.send(allMessages)
    } catch (error) { return { status: 500, error: `Message Router Get failed, catch is ${error.message}` } }
})

router.post('/', async (req, res) => {
    const newMessage = req.body
    if (newMessage.user && newMessage.message) {
        try {
            await MessagesDAO.saveMessage(newMessage)
            res.send({ status: 201, message: 'Success' })
        } catch (error) { return { status: 500, error: `Message Router Post failed, catch is ${error.message}` } }
    } else {
        res.send({ status: 400, error: 'user and message needed.' })
    }
})

export default router