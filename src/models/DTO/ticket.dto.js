import { generateNewCode } from "../../utils/utils.js"

export default class TicketDTO {
    constructor(totalPrice, purchaser) {
        console.log('ticket dto beibe')
        this.code = generateNewCode()
        this.amount = totalPrice
        this.purchaser = purchaser
    }
}

