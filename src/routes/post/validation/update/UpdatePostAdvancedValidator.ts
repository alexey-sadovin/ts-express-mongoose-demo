import {CustomErrorFactory} from './../../../../../core/rest/answer';
import PostAdvancedValidator from './../PostAdvancedValidator';

const POST_NOT_AVAILABLE: string = 'POST_NOT_AVAILABLE';

export default class UpdatePostAdvancedValidator extends PostAdvancedValidator {
  protected async validate(): Promise<void> {
    const post = await this.checkPost();
    const userId = this.reqData.getUserId();

    if (!post.owner.equals(userId)) {
      this
        .invalidate()
        .answer()
        .forbidden(CustomErrorFactory.code(POST_NOT_AVAILABLE));
    }
  }
}
