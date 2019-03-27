import {RequestHandler} from 'express';
import * as validator from 'express-validator/check';

import Constraints from './../../../dal/model/user/Constraints';

export default class LoginValidator {
  public static validate(): RequestHandler[] {
    return [
      validator.body('email')
        .isEmail()
        .trim(),

      validator.body('password')
        .trim()
        .isString()
        .isLength({
          min: Constraints.password.minLength,
          max: Constraints.password.maxLength
        })
    ];
  }
}
