import {RequestHandler} from 'express';
import * as validator from 'express-validator/check';

import Constraints from './../../../../dal/model/user/Constraints';

export default class RegistrationValidator {
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
        }),

      validator.body('firstName')
        .optional()
        .trim()
        .isString()
        .isLength({
          min: Constraints.firstName.minLength,
          max: Constraints.firstName.maxLength
        }),

      validator.body('lastName')
        .optional()
        .trim()
        .isString()
        .isLength({
          min: Constraints.lastName.minLength,
          max: Constraints.lastName.maxLength
        })
    ];
  }
}
