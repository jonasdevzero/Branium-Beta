import axios from 'axios';

const baseURL = process.env.NEXT_PUBLIC_API_URL;

export default axios.create({ baseURL });

export { default as userService } from './userService';
export { default as contactService } from './contactService';
export { default as groupService } from './groupService';
