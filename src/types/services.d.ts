import { SearchUser, Contact, ContactMessage, GroupUser, GroupMessage } from './user';

export namespace Services {
  export interface UserService {
    hasJwt(): boolean;

    search(username: string): Promise<SearchUser[]>;

    getPreRegistration(id: string): Promise<{ pending: boolean }>;

    preRegistration(data: { name: string; email: string }): Promise<string>;

    registration(
      id: string,
      data: {
        username: string;
        password: string;
        confirm_password: string;
      }
    ): Promise<void>;

    login(data: { login: string; password: string }): Promise<void>;

    auth(before: () => void): Promise<void>;

    update(data: {
      name: string;
      username: string;
    }): Promise<{ name: string; username: string }>;

    update_email(data: { email: string; password: string }): Promise<string>;

    update_picture(picture: any): Promise<string>;

    forgotPassword(email: string): Promise<string>;

    resetPassword(data: {
      reset_token: any;
      password: string;
      confirm_password: string;
    }): Promise<string>;

    delete(): Promise<void>;

    restore(): Promise<void>;
  }

  export interface ContactService {
    invite(id: string): Promise<void>;

    acceptInvite(invite_id: string): Promise<Contact>;

    refuseInvite(invite_id: string): Promise<void>;

    block(id: string): Promise<void>;

    messages: {
      index(contact: Contact): Promise<ContactMessage[]>;

      create(data: { to: string; text: string; medias: File[] }): Promise<void>;

      view(contact_id: string): Promise<void>;

      deleteOne(
        message_id: string,
        target?: 'me' | 'bidirectional'
      ): Promise<void>;

      clear(contact_id: string): Promise<void>;
    };
  }

  export interface GroupService {
    show(id: string): Promise<Group>;

    create(data: FormData): Promise<Group>;

    update(data: {
      group_id: string;
      name: string;
      description: string;
    }): Promise<{ name: string; description: string }>;

    update_picture(group_id: string, picture: any): Promise<string>;

    leave(id: string): Promise<void>;

    delete(id: string): Promise<void>;

    users: {
      index(group_id: string): Promise<GroupUser[]>;

      add(group_id: string, user_id: string): Promise<GroupUser>;

      role(data: {
        group_id: string;
        member_id: string;
        role: string;
      }): Promise<void>;

      remove(data: { group_id: string; member_id: string }): Promise<void>;
    };

    messages: {
      index(group_id: string): Promise<GroupMessage[]>

      create(data: { to: string; text: string; medias: File[] }): Promise<void>;

      view(group_id: string): Promise<void>;

      delete(message_id: string): Promise<void>;
    };
  }
}
