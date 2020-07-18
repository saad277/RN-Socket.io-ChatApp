let currentMessageId = 1

function createMessage(userId, messageText) {

    return {

        _id: currentMessageId++,
        text: messageText,
        createdAt: new Date(),
        user: {
            _id: userId,
            name: 'React Native',
            avatar: 'https://placeimg.com/140/140/any',
        },

    }

}


function handleMessage(socket, userIds) {

    socket.on("message", (message) => {

        console.log(message)

        // io.emit("message", message)

        const userId = userIds[socket.id]

        const messageToSend = createMessage(userId, message)

        console.log(messageToSend)

        socket.broadcast.emit("message", messageToSend)

    })
}


module.exports = { handleMessage }