import { Contact, ContactInvitation, ContactMessage, User, UserRooms } from "./user"

export declare module Reducers {

}

export namespace Actions {

    /* ------------ UserActions ----------------  */

    export class UpdateUserSet {
        name?: string
        email?: string
        username?: string
        picture?: string | undefined
    }
    export type UpdateUserSetKeys = Array<keyof UpdateUserSet>

    // Allowed data can be updated
    export class UpdateRoomSet {
        username?: string
        picture?: string
        messages?: ContactMessage[]
        unread_messages?: number
        description?: string
        block?: boolean
        you_block?: boolean
        online?: boolean
        loaded_messages?: boolean
    }
    export type UpdateRoomSetKeys = Array<keyof UpdateRoomSet>

    export type PushDataKey = "contacts" | "contact_invitations"
    export type RemoveDataKey = PushDataKey
    export type UpdateRoomData = {
        roomType: UserRooms
        whereId: string
        set: UpdateRoomSet
    }

    export interface UserActions {
        setUser(user: User): {
            type: string,
            user: User
        }

        updateUser(set: UpdateUserSet): {
            type: string,
            set: UpdateUserSet
        }

        pushData(dataKey: PushDataKey, data: Contact | ContactInvitation): {
            type: string,
            dataKey: PushDataKey,
            data: Contact | ContactInvitation,
        }

        removeData(dataKey: RemoveDataKey, whereId: string): {
            type: string,
            dataKey: RemoveDataKey,
            whereId: string
        }

        updateRoom({ roomType, whereId, set }: UpdateRoomData): {
            type: string,
            roomType: UserRooms,
            whereId: string,
            set: UpdateRoomSet
        }
    }
}
