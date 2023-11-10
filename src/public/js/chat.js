const socket = io();

let userEmail = document.getElementById('userEmail').textContent
let chatBox = document.getElementById('chatBox'); 

chatBox.addEventListener('keyup', evt => {
    if (evt.key === 'Enter') {
        if (chatBox.value.trim().length > 0) {
            socket.emit("message", { user: userEmail, message: chatBox.value });
            chatBox.value = ""; 
        }
    }
});

socket.on('messageLogs', messageCollection => {
    let log = document.getElementById('messageLogs'); 
    let messages = "";
    messageCollection.forEach(message => {
        messages = messages + `${message.user} dice: ${message.message} </br>`;
    });
    log.innerHTML = messages;
});