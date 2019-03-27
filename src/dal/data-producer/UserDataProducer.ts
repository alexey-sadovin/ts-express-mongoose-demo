import IUser from '../../../core/dal/model/IUser';
import IDataProducer from '../../../core/dal/IDataProducer';

import User from '../model/user/User';
import UserPasswordService from '../../../core/services/user/UserPasswordService';

export default class UserDataProducer implements IDataProducer {
  constructor(
    private readonly user: IUser,
    private readonly passwordService: UserPasswordService
  ) {
    this.user = user;
    this.passwordService = passwordService;
  }

  public async create(): Promise<IUser> {
    return new User(await this.composeUserData()).save();
  }

  private async composeUserData(): Promise<object> {
    return {
      ...this.user,
      password: await this.passwordService.encodePassword(this.user.password)
    };
  }
}
