import {RequestHandler} from 'express';
import * as validator from 'express-validator/check';

export default class GetPostValidator {
  public static validate(): RequestHandler {
    return validator.param('postId')
      .isMongoId()
      .trim();
  }
}
