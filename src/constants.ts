
export const constants = {
    routes: {
        HOME: "/",
        SIGN_IN: "/entrar",
        SIGN_UP: "/cadastrar",
        FINISH_SUBSCRIBE: (token: string) => `/finalizar-cadastro/${token}`,
        RECOVER_PASSWORD: "/recuperar-senha",
        RESET_PASSWORD: (token: string) => `/resetar-senha/${token}`,
        chat: {
            HOME: "/branium",
            CONTACT: (id: string) => `/branium/contato/${id}`,
            GAMES: "/branium/jogos"
        },
        FAQ: "/faq"
    },

    reducer: {
        user: {
            SET_USER: "SET_USER",
            UPDATE_USER: "UPDATE_USER",
            USER_PUSH_DATA: "USER_PUSH_DATA",
            USER_REMOVE_DATA: "USER_REMOVE_DATA",
            PUSH_CONTACT_MESSAGE: "PUSH_CONTACT_MESSAGE",
            UPDATE_ROOM: "UPDATE_ROOM",
            RESET: "RESET",
        }
    }
} 
