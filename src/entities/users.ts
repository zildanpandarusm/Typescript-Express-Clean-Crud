export interface UserInterface {
  username: string;
  phone_number: string;
  avatar_url?: string | null;
  display_name?: string;
  info?: string;
  security_notification?: boolean;
  reduce_call_data?: boolean;
  language?: string;
  block_users?: string[];
  last_active_at?: string;
  created_at?: number;
}

export class UserEntity {
  public user: UserInterface;

  constructor(user: UserInterface) {
    this.user = user;
  }
}
