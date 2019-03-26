import {validationResult} from 'express-validator/check';
import {matchedData} from 'express-validator/filter';

import Answer from './../answer';
import RestRequestData from './RestRequestData';
import RestAdvancedValidator from './RestAdvancedValidator';
import formatValidationError from './formatValidationError';

export default abstract class RestRouteController {
  constructor(
    protected requestData: RestRequestData,
    protected validatorClass: typeof RestAdvancedValidator
  ) {
    this.requestData = requestData;
    this.validatorClass = validatorClass;
  }

  private inputData?: object = null;

  private async validateRequest(): Promise<boolean> {
    const result = validationResult(this.requestData.req);
    if (!result.isEmpty()) {
      this.answer()
        .badRequest(result.formatWith(formatValidationError).array());
      return false;
    }

    this.inputData = matchedData(this.requestData.req);

    if (!this.validatorClass) {
      return true;
    }

    const advancedValidator = new this.validatorClass(this.requestData, this.inputData);
    await advancedValidator.process();
    if (!advancedValidator.isValid()) {
      return false;
    }

    this.inputData = advancedValidator.getData();
    return true;
  }

  abstract async processRequest(): Promise<void>

  public answer() : Answer {
    return Answer.for(this.requestData.res, this.requestData.next);
  }

  public async handleRequest() : Promise<void> {
    try {
      if (await this.validateRequest()) {
        await this.processRequest();
      }
    } catch (e) {
      this.requestData.next(e);
    }
  }
}
