import {validationResult} from 'express-validator/check';
import {matchedData} from 'express-validator/filter';

import {Answer} from './../answer';
import RestRequestData from './RestRequestData';
import {RestAdvancedValidatorClass} from './RestAdvancedValidator';
import formatValidationError from './formatValidationError';

export default abstract class RestRouteController {
  protected inputData?: object = null;

  constructor(
    protected requestData: RestRequestData,
    protected validatorClass: RestAdvancedValidatorClass
  ) {
    this.requestData = requestData;
    this.validatorClass = validatorClass;
  }

  public answer(): Answer {
    return Answer.for(this.requestData.res, this.requestData.next);
  }

  public async handleRequest(): Promise<void> {
    try {
      if (await this.validateRequest()) {
        await this.processRequest();
      }
    } catch (e) {
      this.requestData.next(e);
    }
  }

  protected abstract async processRequest(): Promise<void>;

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
}

export type RestRouteControllerClass = {
  new (
    requestData: RestRequestData,
    validatorClass: RestAdvancedValidatorClass
  ): RestRouteController;
};
