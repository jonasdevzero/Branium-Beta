import api from "./"
import { Services } from "../../types/services"

const contactService = {
    invite(id) {
        return new Promise(async (resolve, reject) => {
            try {
                await api.post(`/contact/invite/${id}`)
                resolve()
            } catch (error: any) {
                reject(error.response.data.message)
            }
        })
    },

    acceptInvite(invite_id) {
        return new Promise(async (resolve, reject) => {
            try {
                const response = await api.post(`/contact/invite/accept/${invite_id}`)
                resolve(response.data.contact)
            } catch (error: any) {
                reject(error.response.data.message)
            }
        })
    },

    refuseInvite(invite_id) {
        return new Promise(async (resolve, reject) => {
            try {
                await api.post(`/contact/invite/refuse/${invite_id}`)
                resolve()
            } catch (error: any) {
                reject(error.response.data.message)
            }
        })
    },

    getMessages(contact) {
        return new Promise(async (resolve, reject) => {
            try {
                const { fetch_messages_count, pushed_messages } = contact.extra
                const { data } = await api.get(`/contact/messages/${contact.id}?limit=30&skip=${fetch_messages_count}&skip_u=${pushed_messages}`)
                resolve(data.messages)
            } catch (error) {
                reject(error)
            }
        })
    },

    createMessage({ to, text }) {
        return new Promise(async (resolve, reject) => {
            try {
                if (!text.trim().length) return resolve()

                const data = new FormData()
                data.append("to", to)
                data.append("text", text)
                
                await api.post(`/contact/messages`, data)
                resolve()
            } catch (error: any) {
                reject(error.response.data.message)
            }
        })
    },

    viewMessages(contact_id) {
        return new Promise(async (resolve, reject) => {
            try {
                await api.patch(`/contact/messages/view/${contact_id}`)
                resolve()
            } catch (error: any) {
                reject(error.response.data.message)
            }
        })
    },

    block(contact_id) {
        return new Promise(async (resolve, reject) => {
            try {
                await api.patch(`/contact/block/${contact_id}`)
                resolve()
            } catch (error: any) {
                reject(error.response.data.message)
            }
        })
    }
} as Services.ContactService

export default contactService
