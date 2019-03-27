import RestAdvancedValidator from './../../../../../core/rest/controller/RestAdvancedValidator';
import {CustomErrorFactory} from './../../../../../core/rest/answer';
import User from './../../../../dal/model/user/User';

const EMAIL_INVALID: string = 'EMAIL_INVALID';

export default class RegistrationAdvancedValidator extends RestAdvancedValidator {
  protected async validate(): Promise<void> {
    const {email} = this.getData();

    if (await User.findOne({email}, {_id: 1})) {
      this
        .invalidate()
        .answer()
        .badRequest(CustomErrorFactory.code(EMAIL_INVALID));
    }
  }
}
