import { Actions } from "../../types/store"
import { constants } from "../../constants"

const { reducer: { user: userReducers } } = constants

export default {
    setUser(user) {
        return {
            type: userReducers.SET_USER,
            user
        }
    },

    updateUser(set) {
        return {
            type: userReducers.UPDATE_USER,
            set
        }
    },

    pushData(dataKey, data) {
        return {
            type: userReducers.USER_PUSH_DATA,
            dataKey,
            data
        }
    },

    removeData(dataKey, whereId) {
        return {
            type: userReducers.USER_REMOVE_DATA,
            dataKey,
            whereId
        }
    },

    updateRoom({ roomType, whereId, set }) {
        return {
            type: userReducers.UPDATE_ROOM,
            roomType,
            whereId, 
            set
        }
    }
} as Actions.UserActions
