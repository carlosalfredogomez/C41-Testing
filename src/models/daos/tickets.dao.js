import ticketsModel from './../schemas/tickets.schema.js';

class TicketsDAO {
    constructor() {
        console.log('Tickets DAO connected.')
    }

    getAll = async () => {
        try {
            const response = await ticketsModel.find().lean()
            return response
        } catch (error) {
            throw error
        }
    }

    createTicket = async (ticket) => {
        try {
            const response = await ticketsModel.create(ticket)
            console.log('-------TicketsDAO: new ticket created in db:')
            console.log(response)
            return { status: 200, message: `Ticket created.`, payload: response }
        } catch (error) {
            throw error;
        }
    }
}

export default new TicketsDAO
