export const constant = {
  routes: {
    HOME: '/',
    SIGN_IN: '/entrar',
    SIGN_UP: '/cadastrar',
    FINISH_SUBSCRIBE: (token: string) => `/finalizar-cadastro/${token}`,
    RECOVER_PASSWORD: '/recuperar-senha',
    RESET_PASSWORD: (token: string) => `/resetar-senha/${token}`,
    chat: {
      HOME: '/branium',
      ACCOUNT: '/branium/conta',
      CONTACT: (id: string) => `/branium/contato/${id}`,
      GROUP: (id: string) => `/branium/grupo/${id}`,
      GAMES: '/branium/jogos',
    },
    FAQ: '/faq',
  },

  reducer: {
    user: {
      SET_USER: 'SET_USER',
      UPDATE_USER: 'UPDATE_USER',
      USER_PUSH_DATA: 'USER_PUSH_DATA',
      USER_REMOVE_DATA: 'USER_REMOVE_DATA',
      PUSH_CONTACT_MESSAGE: 'PUSH_CONTACT_MESSAGE',
      UPDATE_ROOM: 'UPDATE_ROOM',
      VIEW_CONTACT_MESSAGES: 'VIEW_CONTACT_MESSAGES',
      VIEW_GROUP_MESSAGES: 'VIEW_GROUP_MESSAGES',
      REMOVE_ROOM_MESSAGE: 'REMOVE_ROOM_MESSAGE',
      REMOVE_GROUP_USER: 'REMOVE_GROUP_USER',
      SET_CONTACTS_ONLINE: 'SET_CONTACTS_ONLINE',
      PUSH_GROUP_MESSAGE: 'PUSH_GROUP_MESSAGE',
      PUSH_GROUP_USER: 'PUSH_GROUP_USER',
      UPDATE_GROUP_USER: 'UPDATE_GROUP_USER',
      RESET: 'RESET',
    },
  },
};
