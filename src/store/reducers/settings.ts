type SettingsState = {
  sidebar: {
    currentOption: 'contacts' | 'groups';
    optionName: 'Contatos' | 'Grupos';
  };
  room: {
    showMembers: boolean;
  }
};

const INITIAL_STATE = {
  sidebar: {
    currentOption: 'contacts',
    optionName: 'Contatos',
  },
  room: {
    showMembers: true,
  }
} as SettingsState;

export default function settings(state = INITIAL_STATE, action: any) {
  const reducer = reducers[action.type];
  if (!reducer) return state;

  return reducer(state, action);
}

const reducers = {
  SIDEBAR_SET_OPTION(state, action) {
    return {
      ...state,
      sidebar: {
        currentOption: action.option,
        optionName: action.optionName,
      },
    };
  },

  ROOM_TOGGLE_SHOW_MEMBERS(state, _action) {
    return {
      ...state,
      room: {
        showMembers: !state.room.showMembers
      }
    }
  }
} as { [key: string]: (state: SettingsState, action: any) => SettingsState };
