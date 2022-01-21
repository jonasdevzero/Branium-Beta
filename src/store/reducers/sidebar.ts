type SidebarState = {
  minimized: boolean;
  currentOption: 'contacts' | 'groups';
  optionName: 'Contatos';
};

const INITIAL_STATE = {
  minimized: false,
  currentOption: 'contacts',
  optionName: 'Contatos',
} as SidebarState;

export default function sidebar(state = INITIAL_STATE, action: any) {
  const reducer = reducers[action.type];
  if (!reducer) return state;

  return reducer(state, action);
}

const reducers = {
  SET_OPTION(state, action) {
    return {
      ...state,
      currentOption: action.option,
      optionName: action.optionName,
    };
  },

  TOGGLE_MINIMIZED(state, _action) {
    return { ...state, minimized: !state.minimized };
  },

  RESET(_state, _action) {
    return INITIAL_STATE;
  },
} as { [key: string]: (state: SidebarState, action: any) => SidebarState };
