import {Answer} from './../answer';
import RestRequestData from './RestRequestData';

export default abstract class RestAdvancedValidator {
  private data: object;
  private valid: boolean = true;

  constructor(
    private readonly reqData: RestRequestData,
    private readonly sanitizedInput?: object
  ) {
    this.reqData = reqData;
    this.sanitizedInput = sanitizedInput;

    this.data = {...this.sanitizedInput};
  }

  public async process(): Promise<RestAdvancedValidator> {
    await this.validate();
    return this;
  }

  public isValid(): boolean {
    return this.valid;
  }

  public getData(): object {
    return this.data;
  }

  protected abstract async validate(): Promise<void>;

  protected answer(): Answer {
    return Answer.for(this.reqData.res, this.reqData.next);
  }
}

export type RestAdvancedValidatorClass = {
  new (
    reqData: RestRequestData,
    sanitizedInput?: object
  ): RestAdvancedValidator;
};
