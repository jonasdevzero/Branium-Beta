import { ContactMessage, User, UserRooms } from "../../types/user"
import { Actions } from "../../types/store"
import { constant } from "../../constant"

const { reducer: { user: userReducers } } = constant

const INITIAL_STATE = {
    id: "",
    name: "",
    email: "",
    username: "",
    picture: undefined,
    contacts: [],
    contact_invitations: [],
    groups: []
} as User

export default function userReducer(state = INITIAL_STATE, action: any) {
    const reducer = reducers[action.type]
    if (!reducer) return state;

    return reducer(state, action)
}

const reducers = {
    [userReducers.SET_USER](_state, action: { set: { user: User } }) {
        const { set: { user } } = action
    
        // init all extra data
        user.contacts.map(c => {
            c.extra = {
                last_scroll_position: -1,
                pushed_messages: 0,
                fetch_messages_count: 0,
                full_loaded: false,
            }
            return c
        })

        return user
    },

    [userReducers.UPDATE_USER](state, action) {
        const { set } = action

        const allowed = Object.keys(new Actions.UpdateUserSet())

        const setKeys = Object.keys(set)
        setKeys.filter(key => allowed.includes(key))

        const data: { [key: string]: any } = {}
        for (const key of setKeys) data[key] = set[key]

        return { ...state, ...data }
    },

    // Push contact or contact_invitation
    [userReducers.USER_PUSH_DATA](state, action: { set: { data: any }, field: Actions.PushDataKey }) {
        console.log("pushing data", action)
        const { field, set } = action

        const items: any[] = state[field]
        if (!items || !Array.isArray(items)) return state;

        return { ...state, [field]: [set.data, ...state[field]] }
    },

    // Remove contact or contact_invitation
    [userReducers.USER_REMOVE_DATA](state, action: { where: Actions.Where, field: Actions.RemoveDataKey }) {
        const { field, where } = action

        const items: any[] = state[field]
        if (!items || !Array.isArray(items)) return state;

        state[field] = items.filter((d: any) => d.id !== where.id)

        return state
    },

    [userReducers.PUSH_CONTACT_MESSAGE](state, action: { set: { message: ContactMessage }, where: Actions.Where }) {
        const { where, set: { message } } = action

        const contacts = state.contacts.map(contact => {
            if (where.id === contact.id) {
                contact.messages.push(message)
                contact.extra.pushed_messages += 1 
                contact.last_message_time = message.created_at

                if (state.id !== message?.sender_id) {
                    contact.unread_messages += 1
                }
            }

            return contact
        })

        return { ...state, contacts }
    },

    "UNSHIFT_CONTACT_MESSAGES"(state, action: { set: { messages: ContactMessage[] }, where: Actions.Where }) {
        const { where, set: { messages } } = action

        const contacts = state.contacts.map(contact => {
            if (where.id === contact.id) {
                contact.extra.fetch_messages_count += 1
                for (let i = messages.length - 1; i >= 0; i--) {
                    contact.messages.unshift(messages[i])
                }
            }

            return contact
        })

        return { ...state, contacts }
    },

    [userReducers.UPDATE_ROOM](state, action: Actions.UpdateRoomData) {
        const { field, where, set } = action
        if (!where || !set || !field) return state;

        const rooms = state[field]
        if (!rooms) return state;

        const allowed = Object.keys(new Actions.UpdateRoomSet())

        const setKeys = Object.keys(set) as Actions.UpdateRoomSetKeys
        setKeys.filter(key => allowed.includes(key))

        rooms.map((room: any) => {
            if (where.id === room.id) for (const key of setKeys) room[key] = set[key];
            return room
        })

        return { ...state, [field]: rooms }
    },

    "UPDATE_EXTRA_CONTACT_DATA"(state, action: { field: UserRooms, where: Actions.Where, set: Actions.UpdateExtraData }) {
        const { field, where, set } = action
        if (!where || !set || !field) return state;

        const rooms = state[field]
        if (!rooms) return state;

        const allowed = Object.keys(new Actions.UpdateExtraData())

        const setKeys = Object.keys(set) as Actions.UpdateExtraDataKeys
        setKeys.filter(key => allowed.includes(key))

        rooms.map((room: any) => {
            if (room.id === where.id) for(const key of setKeys) room.extra[key] = set[key];
            return room
        })

        return { ...state, [field]: rooms }
    },

    "SET_CONTACTS_ONLINE"(state, action: { set: { contacts: string[] } }) {
        const { set: { contacts } } = action

        state.contacts.map(c => {
            contacts.includes(c.id) ? c.online = true : null
            return c
        })

        return state
    },

    "RESET"(_state, _action) {
        return INITIAL_STATE
    },
} as { [key: string]: (state: User, action: any) => User }
