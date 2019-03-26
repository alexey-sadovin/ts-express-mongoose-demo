import * as _ from 'lodash';

import {Answer, CustomErrorFactory} from './../answer';

export default function formatValidationError(originalError: any): object {
  return CustomErrorFactory.code(
    Answer.CODES.validation,
    originalError.msg,
    _.omit(originalError, 'msg')
  );
}
