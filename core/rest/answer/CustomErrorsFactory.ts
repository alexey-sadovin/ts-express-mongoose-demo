import AnswerCodes from './AnswerCodes';

export default class CustomErrorsFactory {
  static code(code: String, reason?: String, fields?: Object): Object {
    const result = {code};
    if (reason) {
      Object.assign(result, {reason});
    }

    if (fields) {
      Object.assign(result, {...fields});
    }

    return result;
  }

  static required(param: String): Object {
    return CustomErrorsFactory.code(AnswerCodes.validation, AnswerCodes.required, {param});
  }

  static duplicate(param: String): Object {
    return CustomErrorsFactory.code(AnswerCodes.validation, AnswerCodes.duplicate, {param});
  }

  static invalid(param: String): Object {
    return CustomErrorsFactory.code(AnswerCodes.validation, AnswerCodes.invalid, {param});
  }
}
