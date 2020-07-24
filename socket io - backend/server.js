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

    socket.on("join", (username) => {

        users[socket.id].username = username
        users[socket.id].avatar = createUserAvatar()

        console.log(users)

        messageHandler.handleMessage(socket, users) // if u place this inside join event then it will only fire when user has joined 

    })


    socket.on("disconnect", () => {

        delete users[socket.id]
        const onlyWithUserNames = createUsersOnline(users)
        io.emit("action", { type: "users_online", data: onlyWithUserNames })

        console.log("disconnect")

        console.log(users)

    })

    socket.on("action", (action) => {

        switch (action.type) {

            case "server/hello":
                console.log("got hello event", action.data);
                socket.emit("action", { type: "message", data: "Good day!" })
                break;

            case "server/join":
                console.log("Got Join Event", action.data)
                users[socket.id].username = action.data
                users[socket.id].avatar = createUserAvatar()
                console.log(users)

                const onlyWithUserNames = createUsersOnline(users)
                io.emit("action", { type: "users_online", data: onlyWithUserNames })
                break;


        }

    })




})


io.listen(3001)