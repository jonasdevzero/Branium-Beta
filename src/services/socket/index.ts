import io from "socket.io-client"

const URL = process.env.WEBSOCKET_SERVER || "http://localhost:5000"

export default io(URL, {
    autoConnect: false,
    transports: ["websocket"]
})

export * from "./events"