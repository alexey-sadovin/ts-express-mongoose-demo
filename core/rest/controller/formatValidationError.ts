import * as _ from 'lodash';
import Answer from './../answer';

export default function formatValidationError(originalError: any): object {
  return Answer
    .custom()
    .code(
      Answer.CODES.validation,
      originalError.msg,
      _.omit(originalError, 'msg')
    );
}
