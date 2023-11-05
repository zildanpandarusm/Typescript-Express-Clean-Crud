export interface GroupInterface {
  name: string;
  description: string;
  avatar_url?: string | null;
  user_member?: string[];
  created_at?: number;
}

export class GroupEntity {
  public group: GroupInterface;

  constructor(user: GroupInterface) {
    this.group = user;
  }
}
