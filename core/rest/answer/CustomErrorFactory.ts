import AnswerCodes from './AnswerCodes';

export default {
  code,
  required,
  duplicate,
  invalid,
  notParsed
};

function code(
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
}

function required(param: string): object {
  return this.code(AnswerCodes.validation, AnswerCodes.required, {param});
}

function duplicate(param: string): object {
  return this.code(AnswerCodes.validation, AnswerCodes.duplicate, {param});
}

function invalid(param: string): object {
  return this.code(AnswerCodes.validation, AnswerCodes.invalid, {param});
}

function notParsed(param: string): object {
  return this.code(AnswerCodes.validation, AnswerCodes.notParsed, {param});
}
