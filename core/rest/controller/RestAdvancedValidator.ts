import {Answer} from './../answer';
import RestRequestData from './RestRequestData';

export default abstract class RestAdvancedValidator {
  constructor(
    private readonly reqData: RestRequestData,
    private readonly sanitizedInput?: object
  ) {
    this.reqData = reqData;
    this.sanitizedInput = sanitizedInput;
  }

  private data: object = {...this.sanitizedInput};
  private valid: boolean = true;

  abstract async validate(): Promise<void>;

  protected answer(): Answer {
    return Answer.for(this.reqData.res, this.reqData.next);
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
}

export type RestAdvancedValidatorClass = {
  new (
    reqData: RestRequestData,
    sanitizedInput?: object
  ): RestAdvancedValidator;
}
