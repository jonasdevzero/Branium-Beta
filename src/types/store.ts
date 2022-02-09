import {
  Contact,
  ContactInvitation,
  ContactMessage,
  Group,
  GroupUser,
  User,
  UserRooms,
} from './user';

export declare module Reducers {}

export namespace Actions {
  export type Where = {
    id: string | string[];
  };

  /* ------------ UserActions ----------------  */

  export class UpdateUserSet {
    name?: string;
    email?: string;
    username?: string;
    picture?: string | undefined;
  }
  export type UpdateUserSetKeys = Array<keyof UpdateUserSet>;

  // Allowed data can be updated
  export class UpdateRoomSet {
    username?: string;
    picture?: string;
    messages?: ContactMessage[];
    unread_messages?: number;
    description?: string;
    blocked?: boolean;
    you_blocked?: boolean;
    online?: boolean;
    role?: number;
    
    users?: GroupUser[];
  }
  export type UpdateRoomSetKeys = Array<keyof UpdateRoomSet>;

  export class UpdateExtraData {
    last_scroll_position?: number;
    pushed_messages?: number;
    fetch_messages_count?: number;
    full_loaded?: boolean;
    has_messages?: boolean;
  }
  export type UpdateExtraDataKeys = Array<keyof UpdateExtraData>;

  export type PushDataKey = 'contacts' | 'contact_invitations' | 'groups';
  export type RemoveDataKey = PushDataKey;
  export type UpdateRoomData = {
    field: UserRooms;
    where: Where;
    set: UpdateRoomSet;
  };

  export interface UserActions {
    setUser(user: User): {
      type: string;
      set: {
        user: User;
      };
    };

    updateUser(set: UpdateUserSet): {
      type: string;
      set: UpdateUserSet;
    };

    pushData(
      field: PushDataKey,
      set: { data: Contact | ContactInvitation | Group }
    ): {
      type: string;
      field: PushDataKey;
      set: { data: Contact | ContactInvitation | Group };
    };

    removeData(
      field: RemoveDataKey,
      where: Where
    ): {
      type: string;
      field: RemoveDataKey;
      where: Where;
    };

    updateRoom({ set, where, field }: UpdateRoomData): {
      type: string;
      field: UserRooms;
      where: Where;
      set: UpdateRoomSet;
    };

    updateExtraRoomData({
      field,
      where,
      set,
    }: {
      field: UserRooms;
      where: Where;
      set: UpdateExtraData;
    }): {
      type: string;
      field: UserRooms;
      where: Where;
      set: UpdateExtraData;
    };
  }
}
