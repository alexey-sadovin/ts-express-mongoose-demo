import RestRouteController from './../../../../core/rest/controller/RestRouteController';
import User from './../../../dal/model/user/User';

export default class UserController extends RestRouteController {
  public async processRequest(): Promise<void> {
    const userId: string = this.getUserId();
    this.answer().ok(await User.findOne({_id: userId}));
  }
}
