import IUser from './../../../../core/dal/model/IUser';
import User from './../../model/User';
import UserPasswordService from './../../../../core/services/UserPasswordService';

export default class UserDataProducer {
  constructor(
    private readonly user: any,
    private readonly passwordService: UserPasswordService
  ) {
    this.user = user;
    this.passwordService = passwordService;
  }

  public create(): Promise<IUser> {
    return new User(this.composeUserData()).save();
  }

  private async composeUserData(): Promise<object> {
    return {
      ...this.user,
      password: await this.passwordService.encodePassword(this.user.password)
    };
  }
}
