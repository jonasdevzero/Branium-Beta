import {
  Contact,
  ContactMessage,
  GroupMessage,
  User,
  UserRooms,
} from '../../types/user';
import { Actions } from '../../types/store';
import { constant } from '~/constant';

const {
  reducer: { user: userReducers },
} = constant;

const INITIAL_STATE = {
  id: '',
  name: '',
  email: '',
  username: '',
  picture: undefined,
  contacts: [],
  contact_invitations: [],
  groups: [],
} as User;

export default function userReducer(state = INITIAL_STATE, action: any) {
  const reducer = reducers[action.type];
  if (!reducer) return state;

  return reducer(state, action);
}

const reducers = {
  [userReducers.SET_USER](_state, action: { set: { user: User } }) {
    const {
      set: { user },
    } = action;

    return user;
  },

  [userReducers.UPDATE_USER](state, action) {
    const { set } = action;

    const allowed = Object.keys(new Actions.UpdateUserSet());

    const setKeys = Object.keys(set);
    setKeys.filter((key) => allowed.includes(key));

    const data: { [key: string]: any } = {};
    for (const key of setKeys) data[key] = set[key];

    return { ...state, ...data };
  },

  // Push contact or contact_invitation
  [userReducers.USER_PUSH_DATA](
    state,
    action: { set: { data: any }; field: Actions.PushDataKey }
  ) {
    const { field, set } = action;

    const items: any[] = state[field];
    if (!items || !Array.isArray(items)) return state;

    return { ...state, [field]: [set.data, ...state[field]] };
  },

  // Remove contact or contact_invitation
  [userReducers.USER_REMOVE_DATA](
    state,
    action: { where: Actions.Where; field: Actions.RemoveDataKey }
  ) {
    const { field, where } = action;

    const items: any[] = state[field];
    if (!items || !Array.isArray(items)) return state;

    state[field] = items.filter((d: any) => d.id !== where.id);

    return state;
  },

  [userReducers.PUSH_CONTACT_MESSAGE](
    state,
    action: { set: { message: ContactMessage }; where: Actions.Where }
  ) {
    const {
      where,
      set: { message },
    } = action;

    state.contacts = state.contacts.map((contact) => {
      if (where.id === contact.id) {
        contact.messages.push(message);
        contact.extra.pushed_messages += 1;
        contact.last_message_time = message.created_at;

        if (state.id !== message?.sender_id) {
          contact.unread_messages += 1;
        }
      }

      return contact;
    });

    return state;
  },

  UNSHIFT_ROOM_MESSAGES(
    state,
    action: {
      set: { messages: any[] };
      where: Actions.Where;
      field: 'contacts' | 'groups';
    }
  ) {
    const {
      field,
      where,
      set: { messages },
    } = action;

    const rooms = state[field].map((room) => {
      if (where.id === room.id) {
        room instanceof Contact ? (room.extra.fetch_messages_count += 1) : null;

        for (let i = messages.length - 1; i >= 0; i--) {
          room.messages.unshift(messages[i]);
        }
      }

      return room;
    });

    return { ...state, [field]: rooms };
  },

  [userReducers.UPDATE_ROOM](state, action: Actions.UpdateRoomData) {
    const { field, where, set } = action;
    if (!where || !set || !field) return state;

    let rooms = state[field];
    if (!rooms) return state;

    const allowed = Object.keys(new Actions.UpdateRoomSet());

    const setKeys = Object.keys(set) as Actions.UpdateRoomSetKeys;
    setKeys.filter((key) => allowed.includes(key));

    rooms = rooms.map((room: any) => {
      if (where.id === room.id) {
        if (setKeys.includes('username') && set.username?.length) {
          state.groups = state.groups.map((g) => {
            g.messages = g.messages.map((m) => {
              if (m.sender_id === where.id) {
                m.sender = {
                  ...m.sender,
                  username: set.username || '',
                };
              }

              return m;
            });

            return g;
          });
        }
        if (setKeys.includes('picture')) {
          state.groups = state.groups.map((g) => {
            g.messages = g.messages.map((m) => {
              if (m.sender_id === where.id) {
                m.sender = {
                  ...m.sender,
                  picture: set.picture || '',
                };
              }

              return m;
            });

            return g;
          });
        }

        for (const key of setKeys) room[key] = set[key];
      }

      return room;
    });

    return { ...state, [field]: rooms };
  },

  UPDATE_EXTRA_ROOM_DATA(
    state,
    action: {
      field: UserRooms;
      where: Actions.Where;
      set: Actions.UpdateExtraData;
    }
  ) {
    const { field, where, set } = action;
    if (!where || !set || !field) return state;

    let rooms = state[field];
    if (!rooms) return state;

    const allowed = Object.keys(new Actions.UpdateExtraData());

    const setKeys = Object.keys(set) as Actions.UpdateExtraDataKeys;
    setKeys.filter((key) => allowed.includes(key));

    rooms = rooms.map((room: any) => {
      if (room.id === where.id)
        for (const key of setKeys) room.extra[key] = set[key];

      return room;
    });

    return { ...state, [field]: rooms };
  },

  [userReducers.SET_CONTACTS_ONLINE](
    state,
    action: { set: { contacts: string[] } }
  ) {
    const {
      set: { contacts },
    } = action;

    state.contacts.map((c) => {
      contacts.includes(c.id) ? (c.online = true) : null;
      return c;
    });

    return state;
  },

  // User Group Reducers

  [userReducers.PUSH_GROUP_MESSAGE](
    state,
    action: { set: { message: GroupMessage }; where: Actions.Where }
  ) {
    const {
      where,
      set: { message },
    } = action;

    state.groups = state.groups.map((g) => {
      if (where.id === g.id) {
        g.messages.push(message);
        g.extra.pushed_messages += 1;
        g.last_message_time = message.created_at;

        state.id !== message.sender_id ? (g.unread_messages += 1) : null;
      }

      return g;
    });

    return state;
  },

  [userReducers.VIEW_GROUP_MESSAGES](state, action) {
    //...
    return state;
  },

  [userReducers.PUSH_GROUP_USER](state, action) {
    const {
      where,
      set: { member },
    } = action;

    state.groups = state.groups.map((g) => {
      where.id === g.id ? g.users.push(member) : null;
      return g;
    });

    return state;
  },

  [userReducers.UPDATE_GROUP_USER](state, action) {
    const { where, set } = action;

    const keys = Object.keys(set);

    state.groups = state.groups.map((g) => {
      if (where.id === g.id) {
        g.users = g.users.map((gU: any) => {
          if (gU.id === where.member_id)
            for (const key of keys) gU[key] = set[key];

          return gU;
        });
      }

      return g;
    });

    return state;
  },

  [userReducers.REMOVE_GROUP_USER](state, action) {
    const { where } = action;

    state.groups = state.groups.map((g) => {
      if (where.id === g.id) {
        g.users = g.users.filter((gU) => gU.id !== where.member_id);
      }
      return g;
    });

    return state;
  },

  RESET(_state, _action) {
    return INITIAL_STATE;
  },
} as { [key: string]: (state: User, action: any) => User };
