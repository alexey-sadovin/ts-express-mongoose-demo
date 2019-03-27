import {RequestHandler} from 'express';
import * as validator from 'express-validator/check';

import Constraints from '../../../../dal/model/post/Constraints';

export default class UpdatePostValidator {
  public static validate(): RequestHandler[] {
    return [
      validator.param('postId')
        .isMongoId()
        .trim(),

      validator.body('title')
        .trim()
        .isString()
        .isLength({
          min: Constraints.title.minLength,
          max: Constraints.title.maxLength
        }),

      validator.body('text')
        .trim()
        .isString()
        .isLength({
          min: Constraints.text.minLength,
          max: Constraints.text.maxLength
        })
    ];
  }
}
