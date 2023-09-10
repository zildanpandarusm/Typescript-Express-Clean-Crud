export interface UserInterface {
  name: string;
  email: string;
  address: string;
  phoneNumber?: string;
}

export class UserEntity {
  public user: UserInterface;

  constructor(user: UserInterface) {
    this.user = user;
  }
}
