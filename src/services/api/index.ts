import axios from "axios"

const baseURL = process.env.API_URL || "http://localhost:5000"

export default axios.create({ baseURL })

export { default as userService } from "./userService"
export { default as contactService } from "./contactService"
export { default as groupService } from "./groupService"