let currentMessageId = 1

function createMessage(user, messageText) {

    return {

        _id: currentMessageId++,
        text: messageText,
        createdAt: new Date(),
        user: {
            _id: user.userId,
            name: user.username,
            avatar: 'https://placeimg.com/140/140/any',
        },

    }

}


function handleMessage(socket, users) {

    socket.on("message", (message) => {

        console.log(message)

        // io.emit("message", message)

        const user = users[socket.id]

        const messageToSend = createMessage(user, message)

        console.log(messageToSend)

        socket.broadcast.emit("message", messageToSend)

    })
}


module.exports = { handleMessage }