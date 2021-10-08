import io from "socket.io-client"

const URL = "https://branium-api.herokuapp.com"

export default io(URL, {
    autoConnect: false,
    transports: ["websocket"]
})

export * from "./events"