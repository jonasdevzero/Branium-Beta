import { SearchUser, Contact, ContactMessage } from './user';

export namespace Services {
  export interface UserService {
    auth(before: () => void): Promise<void>;

    login(data: { login: string; password: string }): Promise<void>;

    block(id: string): Promise<void>;

    preRegistration(data: { name: string; email: string }): Promise<string>;

    registration(
      id: string,
      data: {
        username: string;
        password: string;
        confirm_password: string;
      }
    ): Promise<void>;

    hasJwt(): boolean;

    forgotPassword(email: string): Promise<string>;

    resetPassword(data: {
      reset_token: any;
      password: string;
      confirm_password: string;
    }): Promise<string>;

    search(username: string): Promise<SearchUser[]>;
  }

  export interface ContactService {
    invite(id: string): Promise<void>;

    acceptInvite(invite_id: string): Promise<Contact>;

    refuseInvite(invite_id: string): Promise<void>;

    getMessages(contact: Contact): Promise<ContactMessage[]>;

    createMessage(data: {
      to: string;
      text: string;
      medias: File[];
    }): Promise<void>;

    viewMessages(contact_id: string): Promise<void>;

    block(id: string): Promise<void>;
  }

  export interface GroupService {
    show(id: string): Promise<Group>;

    create(data: {
      name: string;
      description: string;
      picture: File;
      members?: string[];
    }): Promise<Group>;

    leave(id: string): Promise<void>;

    delete(id: string): Promise<void>;
  }
}
