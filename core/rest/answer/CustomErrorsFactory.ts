import AnswerCodes from './AnswerCodes';

export default class CustomErrorsFactory {
  static code(code: string, reason?: string, fields?: object): object {
    const result = {code};
    if (reason) {
      Object.assign(result, {reason});
    }

    if (fields) {
      Object.assign(result, {...fields});
    }

    return result;
  }

  static required(param: string): object {
    return CustomErrorsFactory.code(AnswerCodes.validation, AnswerCodes.required, {param});
  }

  static duplicate(param: string): object {
    return CustomErrorsFactory.code(AnswerCodes.validation, AnswerCodes.duplicate, {param});
  }

  static invalid(param: string): object {
    return CustomErrorsFactory.code(AnswerCodes.validation, AnswerCodes.invalid, {param});
  }

  static notParsed(param: string): object {
    return CustomErrorsFactory.code(AnswerCodes.validation, AnswerCodes.notParsed, {param});
  }
}
