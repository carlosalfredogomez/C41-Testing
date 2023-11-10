import ticketsService from "../service/tickets.service.js"

class TicketsController {
    getAll = async (req, res) => {
        try {
            const response = await ticketsService.getAll()
            res.send(response)
        } catch (error) {
            throw error
        }
    }
}

export default new TicketsController()