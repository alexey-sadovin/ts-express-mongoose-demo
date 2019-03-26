import Answer from './../answer';
import RestRequestData from './RestRequestData';

export default abstract class RestAdvancedValidator {
  constructor(
    private reqData: RestRequestData,
    private readonly sanitizedInput?: Object
  ) {
    this.reqData = reqData;
    this.sanitizedInput = sanitizedInput;
  }

  private data: Object = {...this.sanitizedInput};
  private valid: Boolean = true;

  abstract async validate(): Promise<void>;

  protected answer(): Answer {
    return Answer.for(this.reqData.res, this.reqData.next);
  }

  public async process(): Promise<RestAdvancedValidator> {
    await this.validate();
    return this;
  }

  public isValid(): Boolean {
    return this.valid;
  }

  public getData(): Object {
    return this.data;
  }
}
