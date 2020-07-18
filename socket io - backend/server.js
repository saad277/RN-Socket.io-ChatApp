const io = require("socket.io")();

const messageHandler = require("./handlers/messageHandlers")


let currentUserId = 2;


let users = {}

function createUserAvatar() {

    const rand1 = Math.round(Math.random() * 200 + 100)
    const rand2 = Math.round(Math.random() * 200 + 100)

    return `https://placeimg.com/${rand1}/${rand2}/any`


}


io.on("connection", (socket) => {

    console.log("a user connected")
    console.log(socket.id)

    users[socket.id] = { userId: currentUserId++ }

    console.log(users)

    socket.on("join", (username) => {

        users[socket.id].username = username
        users[socket.id].avatar = createUserAvatar()

        console.log(users)

        messageHandler.handleMessage(socket, users) // if u place this inside join event then it will only fire when user has joined 

    })




})


io.listen(3001)