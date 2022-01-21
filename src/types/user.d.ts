export class GroupMessageView {
  id: string;
  message_id: string;
  viewed: boolean;
  viewed_at: Date;
  viewer: {
    id: string;
    username: string;
    picture: string;
  };
}

export class GroupMessageMedia {
  id: string;
  message_id: string;
  url: string;
  type: string;
}

export class GroupMessage {
  id: string;
  sender_id: string;
  text: string;
  sender: {
    id: string;
    username: string;
    picture: string;
  };
  medias: GroupMessageMedia[];
  views: GroupMessageView[];
  created_at: Date;
}

export class GroupUser {
  id: string; // User ID
  username: string;
  picture: string;
  role: number;
}

export class Group {
  id: string;
  name: string;
  description: string;
  picture: string;
  leader_id: string;
  last_message_time: string;
  role: number;
  unread_messages: number;
  created_at: Date;
  users: GroupUser[];
  messages: GroupMessage[];
}

export class ContactInvitation {
  id: string;
  sender: {
    id: string;
    username: string;
    picture: string | undefined;
  };
  pending: boolean;
  created_at: Date;
}

export class ContactMediaMessage {
  id: string;
  message_id: string;
  url: string;
  type: string;
}

export class ContactMessage {
  id: string;
  text: string;
  viewed: boolean;
  created_at: Date;
  sender_id: string;
  bidirectional_id: string;
  medias: ContactMediaMessage[];
}

export class Contact {
  id: string;
  username: string;
  picture: string | undefined;
  messages: ContactMessage[];
  unread_messages: number;
  last_message_time: Date;
  blocked: boolean;
  you_blocked: boolean;
  online: boolean;
  extra: {
    last_scroll_position: number;
    pushed_messages: number;
    fetch_messages_count: number;
    full_loaded: boolean;
  };
}

export class User {
  id: string;
  name: string;
  username: string;
  email: string;
  picture: string | undefined;
  contacts: Contact[];
  contact_invitations: ContactInvitation[];
  groups: Group[];
}

export class SearchUser {
  id: string;
  username: string;
  picture: string | undefined;
}

export type UserRooms = 'contacts';
