import axios from "axios"

const baseURL = "https://branium-api.herokuapp.com/"

export default axios.create({ baseURL })

export { default as userService } from "./userService"
export { default as contactService } from "./contactService"
export { default as groupService } from "./groupService"