import { createContext, useRef, useState, useEffect, useCallback } from "react"
import { createPortal } from "react-dom"
import socket from "../services/socket"
import { Warn, WarnOptions, SocketWarn, WarnObject } from "../types/contexts"

import {
    Item, 
    Message,
} from "../styles/components/Warn"

export const WarnContext = createContext({} as Warn)

export function WarnProvider({ children }: { children: React.ReactChild }) {
    const root = useRef<any>(null)
    const warnContext = useRef<Warn>({} as Warn)
    const [warns, setWarns] = useState<any[]>([])

    useEffect(() => {
        root.current = document.createElement('div')
        root.current.id = '__WARN__'
        document.body.appendChild(root.current)

        socket.on("warn", ({ type, message }: SocketWarn) => {
            const fn = warnContext.current[type]
            fn(message)
        })

        return () => {
            root.current ? document.body.removeChild(root.current) : null
        }
    }, [])

    const updateWarn = useCallback((warn: any, key: string, set: any) => setWarns(state => {
        return state.map(w => {
            w.id === warn.id ? w.opts[key] = set : null
            return w
        })
    }), [])

    const remove = useCallback(warn => setWarns(state => state.filter(w => w.id !== warn.id)), [])

    const show = useCallback((message: string, options: WarnOptions = {}) => {
        const id = Math.random().toString(36).substr(2)
        const opts = {
            type: 'generic',
            loadbar: true,
            autoRemove: true,
            loading: false,
            fadeout: false,
            loadbarColor: "#ddd",
            ...options
        }

        const warn = {
            id,
            message,
            opts,
            remove: () => remove(warn),
        } as WarnObject

        setWarns(state => state.concat(warn))
        opts.loadbar ? setTimeout(() => updateWarn(warn, "loading", true), 500) : null
        opts.autoRemove ? setTimeout(() => updateWarn(warn, "fadeout", true), 2300) : null
        opts.autoRemove ? setTimeout(() => remove(warn), 2500) : null

        return warn
    }, [remove, updateWarn])

    const success = useCallback((message: string, options: WarnOptions = {}) => {
        options.type = 'success'
        options.loadbarColor = "#28a745"
        return show(message, options)
    }, [show])

    const error = useCallback((message: string, options: WarnOptions = {}) => {
        options.type = 'error'
        options.loadbarColor = "#dc3545"
        return show(message, options)
    }, [show])

    const info = useCallback((message: string, options: WarnOptions = {}) => {
        options.type = 'info'
        options.loadbarColor = "#ddd"
        return show(message, options)
    }, [show])

    warnContext.current = {
        show,
        success,
        error,
        info,
        remove
    }

    return (
        <WarnContext.Provider value={warnContext.current}>
            {children}
            {root.current &&
                createPortal(
                    <>
                        {warns.map((warn, i) => {
                            return (
                                <Item
                                    key={warn.id}
                                    position={i + 1}
                                    loadbar={warn.opts.loading}
                                    fadeout={warn.opts.fadeout}
                                    loadbarColor={warn.opts.loadbarColor}
                                >
                                    <Message>{warn.message}</Message>
                                </Item>
                            )
                        })}
                    </>,
                    root.current
                )
            }
            <div></div>
        </WarnContext.Provider>
    )
}
