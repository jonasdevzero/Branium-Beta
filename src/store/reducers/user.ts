import { ContactMessage, User } from "../../types/user"
import { Actions } from "../../types/store"
import { constants } from "../../constants"

const { reducer: { user: userReducers } } = constants

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
    [userReducers.SET_USER](_state, action) {
        return action.user
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

    [userReducers.USER_PUSH_DATA](state, action: { data: any, dataKey: Actions.PushDataKey }) {
        const { data, dataKey } = action

        const items: any[] = state[dataKey]
        if (!items || !Array.isArray(items)) return state;

        items.unshift(data)
        state[dataKey] = items

        return state
    },

    [userReducers.USER_REMOVE_DATA](state, action: { whereId: string, dataKey: Actions.RemoveDataKey }) {
        const { dataKey, whereId } = action

        const data: any[] = state[dataKey]
        if (!data) return;

        state[dataKey] = data.filter((d: any) => d.id !== whereId)

        return state
    },

    [userReducers.PUSH_CONTACT_MESSAGE](state, action) {
        const { message, where } = action

        const contacts = state.contacts.map(contact => {
            if (where === contact.id) {
                contact.messages.push(message)
                if (state.id !== message?.sender_id) {
                    contact.unread_messages += 1
                }
            }

            return contact
        })

        return { ...state, contacts }
    },

    "UNSHIFT_CONTACT_MESSAGES"(state, action: { messages: ContactMessage[], where: string }) {
        const { messages, where } = action

        const contacts = state.contacts.map(contact => {
            if (where === contact.id) {
                for(let i = messages.length - 1; i >= 0; i--) {
                    contact.messages.unshift(messages[i])
                }
            }

            return contact
        })

        return { ...state, contacts }
    },

    [userReducers.UPDATE_ROOM](state, action: Actions.UpdateRoomData) {
        const { whereId, set, roomType } = action
        if (!whereId || !set || !roomType) return state;

        const rooms = state[roomType]
        if (!rooms) return state;

        const whereIsArray = Array.isArray(whereId)
        const allowed = Object.keys(new Actions.UpdateRoomSet())

        const setKeys = Object.keys(set) as Actions.UpdateRoomSetKeys
        setKeys.filter(key => allowed.includes(key))

        rooms.map((room: any) => {
            if (whereIsArray ? whereId.includes(room.id) : whereId === room.id)
                for (const key of setKeys) room[key] = set[key];

            return room
        })

        return { ...state, [roomType]: rooms }
    },

    "SET_CONTACTS_ONLINE"(state, action) {
        const { contacts } = action

        state.contacts.map(c => {
            contacts.includes(c.id) ? c.online = true : null 
            return c
        })

        return { ...state }
    },

    "RESET"(_state, _action) {
        return INITIAL_STATE
    },
} as { [key: string]: (state: User, action: any) => User }
