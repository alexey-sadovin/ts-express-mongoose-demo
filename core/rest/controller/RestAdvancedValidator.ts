import {Answer} from './../answer';
import RestRequestData from './RestRequestData';

export default abstract class RestAdvancedValidator {
  private readonly data: object;
  private valid: boolean = true;

  constructor(
    protected readonly reqData: RestRequestData,
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

  public getData(): any {
    return this.data;
  }

  public answer(): Answer {
    return Answer.for(this.reqData.res, this.reqData.next);
  }

  protected abstract async validate(): Promise<void>;

  protected invalidate(): RestAdvancedValidator {
    this.valid = false;
    return this;
  }
}

export type RestAdvancedValidatorClass = {
  new (
    reqData: RestRequestData,
    sanitizedInput?: object
  ): RestAdvancedValidator;
};
