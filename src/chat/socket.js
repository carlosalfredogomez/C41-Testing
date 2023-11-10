import { Server } from 'socket.io'
import messagesDao from "../models/daos/messages.dao.js";

function setupSocket(server) {
    const io = new Server(server);
    
    io.on('connection', socket => {
        console.log(`New client connected.`)
        socket.on('message', async data => {
            try {
                await messagesDao.saveMessage(data)
                const allMessages = await messagesDao.getAllMessages()
                io.emit('messageLogs', allMessages) 
            } catch (error) {
                console.error(`Socket.io save or getAll messages failed: ${error.message}`);
            }
        });
    });
};

export default setupSocket