export default {
  sidebar: {
    setOption(option: 'contacts' | 'groups') {
      const optName = {
        contacts: 'Contatos',
        groups: 'Grupos',
      };

      return {
        type: 'SIDEBAR_SET_OPTION',
        option,
        optionName: optName[option],
      };
    },
  },

  room: {
    toggleShowMembers() {
      return {
        type: 'ROOM_TOGGLE_SHOW_MEMBERS',
      };
    },
  },
};
