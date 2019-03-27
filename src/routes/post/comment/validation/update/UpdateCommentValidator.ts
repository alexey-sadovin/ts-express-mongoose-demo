import {RequestHandler} from 'express';
import * as validator from 'express-validator/check';

import Constraints from './../../../../../dal/model/comment/Constraints';

export default class UpdateCommentValidator {
  public static validate(): RequestHandler[] {
    return [
      validator.param('postId')
        .isMongoId()
        .trim(),

      validator.param('commentId')
        .isMongoId()
        .trim(),

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
