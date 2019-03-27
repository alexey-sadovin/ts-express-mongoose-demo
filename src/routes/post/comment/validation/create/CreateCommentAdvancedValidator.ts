import PostAdvancedValidator from './../../../validation/PostAdvancedValidator';

export default class CreateCommentAdvancedValidator extends PostAdvancedValidator {
  protected async validate(): Promise<void> {
    await this.checkPost();
  }
}
