import { Actions } from "../../types/store"
import { constants } from "../../constants"

const { reducer: { user: userReducers } } = constants

export default {
    setUser(user) {
        return {
            type: userReducers.SET_USER,
            set: {
                user            
            }
        }
    },

    updateUser(set) {
        return {
            type: userReducers.UPDATE_USER,
            set
        }
    },

    pushData(field, set) {
        return {
            type: userReducers.USER_PUSH_DATA,
            field,
            set
        }
    },

    removeData(field, where) {
        return {
            type: userReducers.USER_REMOVE_DATA,
            field,
            where
        }
    },

    updateRoom({ set, field, where }) {
        return {
            type: userReducers.UPDATE_ROOM,
            set,
            field,
            where, 
        }
    },

    updateExtraRoomData({ field, where, set }) {
        return {
            type: "UPDATE_EXTRA_CONTACT_DATA",
            field,
            where,
            set
        }
    }
} as Actions.UserActions
