const io = require("socket.io")();

const messageHandler = require("./handlers/messageHandlers")

//const uuidv1 = require("uuid/v1")


let userId = 2

let users = {}

function createUserAvatar() {

    const rand1 = Math.round(Math.random() * 200 + 100)
    const rand2 = Math.round(Math.random() * 200 + 100)

    return `https://placeimg.com/${rand1}/${rand2}/any`


}

const createUsersOnline = (users) => {

    const values = Object.values(users)
    const onlyWithUserNames = values.filter((x) => x.username != undefined)

    return onlyWithUserNames

}

io.on("connection", (socket) => {

    console.log("a user connected")
    console.log(socket.id)

    users[socket.id] = { userId: userId++ }

    console.log(users)




    socket.on("disconnect", () => {

        delete users[socket.id]
        const onlyWithUserNames = createUsersOnline(users)
        io.emit("action", { type: "users_online", data: onlyWithUserNames })

        console.log("disconnect")

        console.log(users)

    })

    socket.on("action", (action) => {

        switch (action.type) {



            case "server/join":
                console.log("Got Join Event", action.data)
                users[socket.id].username = action.data
                users[socket.id].avatar = createUserAvatar()
                console.log(users)

                const onlyWithUserNames = createUsersOnline(users)
                io.emit("action", { type: "users_online", data: onlyWithUserNames })

                socket.emit("action", { type: "self_user", data: users[socket.id] })
                break;

            case "server/private_message":
                const conversationId = action.data.conversationId;
                const from = users[socket.id].userId
                const userValues = Object.values(users)
                const socketIds = Object.values(users)

                for (let i = 0; i < userValues.length; i++) {

                    if (userValues[i].userId === conversationId) {

                        const socketId = socketIds[i]
                        io.sockets.sockets[socketId].emit("action", {
                            type: "private_message",
                            data: {
                                ...action.data,
                                conversationId: from
                            }
                        })

                        break;
                    }
                }
                break;

        }

    })




})


io.listen(3001)