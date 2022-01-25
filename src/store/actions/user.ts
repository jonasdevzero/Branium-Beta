import { Actions } from '../../types/store';
import { constant } from '../../constant';

const {
  reducer: { user: userReducers },
} = constant;

export default {
  setUser(user) {
    return {
      type: userReducers.SET_USER,
      set: {
        user,
      },
    };
  },

  updateUser(set) {
    return {
      type: userReducers.UPDATE_USER,
      set,
    };
  },

  pushData(field, set) {
    return {
      type: userReducers.USER_PUSH_DATA,
      field,
      set,
    };
  },

  removeData(field, where) {
    return {
      type: userReducers.USER_REMOVE_DATA,
      field,
      where,
    };
  },

  updateRoom({ set, field, where }) {
    return {
      type: userReducers.UPDATE_ROOM,
      set,
      field,
      where,
    };
  },

  updateExtraRoomData({ field, where, set }) {
    return {
      type: 'UPDATE_EXTRA_ROOM_DATA',
      field,
      where,
      set,
    };
  },
} as Actions.UserActions;
