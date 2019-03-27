import RestRouteController from './../../../../core/rest/controller/RestRouteController';
import {CustomErrorFactory} from './../../../../core/rest/answer';
import User from './../../../dal/model/user/User';

const INVALID_CREDENTIALS: string = 'INVALID_CREDENTIALS';

export default class LoginController extends RestRouteController {
  public async processRequest(): Promise<void> {
    const {email, password} = this.inputData;
    const user = await User.findOne({email}, {_id: 1, password: 1});

    if (!user) {
      return this.invalidate();
    }

    const isSamePassword = await this.requestData
      .getServices()
      .getUserPasswordService()
      .comparePasswords(password, user.password);

    if (!isSamePassword) {
      return this.invalidate();
    }

    this.answer().ok({
      token: await this.requestData
        .getServices()
        .getUserTokenService()
        .encode({
          id: user._id.toString()
        })
    });
  }

  private invalidate(): void {
    this
      .answer()
      .notAuthorized(CustomErrorFactory.code(INVALID_CREDENTIALS));
  }
}
