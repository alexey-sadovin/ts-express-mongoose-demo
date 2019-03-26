import AnswerCodes from './AnswerCodes';

export default {
  code(
    code: string,
    reason?: string,
    fields?: object
  ): object {
    const result = {code};
    if (reason) {
      Object.assign(result, {reason});
    }

    if (fields) {
      Object.assign(result, {...fields});
    }

    return result;
  },

  required(param: string): object {
    return this.code(AnswerCodes.validation, AnswerCodes.required, {param});
  },

  duplicate(param: string): object {
    return this.code(AnswerCodes.validation, AnswerCodes.duplicate, {param});
  },

  invalid(param: string): object {
    return this.code(AnswerCodes.validation, AnswerCodes.invalid, {param});
  }
};
