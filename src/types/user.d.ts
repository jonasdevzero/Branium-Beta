
export class ContactInvitation {
    id: string 
    sender: {
        id: string 
        username: string 
        picture: string | undefined
    }
    pending: boolean
    created_at: Date
} 

export class ContactMessage {
    id: string 
    text: string 
    viewed: boolean 
    created_at: Date
    sender_id: string
    bidirectional_id: string
}

export class Contact {
    id: string
    username: string 
    picture: string | undefined
    messages: ContactMessage[]
    unread_messages: number 
    last_message_time: Date 
    blocked: boolean 
    you_blocked: boolean
    online: boolean
    loaded_messages: boolean
    loaded_messages_count: number
}

export class User {
    id: string 
    name: string
    username: string
    email: string
    picture: string | undefined
    contacts: Contact[]
    contact_invitations: ContactInvitation[]
    groups: Group[]
}

export class SearchUser {
    id: string
    username: string
    picture: string | undefined
}

export type UserRooms = "contacts"
