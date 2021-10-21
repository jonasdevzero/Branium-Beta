export type WarnOptions = {
    type?: string
    autoRemove?: boolean
    loadbar?: boolean
    loadbarColor?: string
}

export type WarnObject = {
    id: string
    message: string
    opts: {
        type: string;
        autoRemove: boolean;
        loadbar: boolean;
        loadbarColor: string;
        loading: boolean;
        fadeout: boolean;
    }
    remove(): void
}

export type SocketWarn = {
    type: "show" | "success" | "error" | "info"
    message: string
}

export type Warn = {
    show(message: string, options?: WarnOptions): WarnObject
    success(message: string, options?: WarnOptions): WarnObject
    error(message: string, options?: WarnOptions): WarnObject
    info(message: string, options?: WarnOptions): WarnObject
    remove(warn: WarnObject): void
}

export type AuthContextType = {
    isAuthenticated: boolean
    loadingAuth: boolean
}

export type CallContextType = {
    inCall: boolean
    callTo(): void
}