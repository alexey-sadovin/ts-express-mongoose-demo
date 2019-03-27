import RestAdvancedValidator from './../../../../../core/rest/controller/RestAdvancedValidator';
import {CustomErrorFactory} from './../../../../../core/rest/answer';
import Post from './../../../../dal/model/post/Post';

const POST_NOT_FOUND: string = 'POST_NOT_FOUND';
const POST_NOT_AVAILABLE: string = 'POST_NOT_AVAILABLE';

export default class UpdatePostAdvancedValidator extends RestAdvancedValidator {
  protected async validate(): Promise<void> {
    const {postId} = this.getData();
    const userId = this.reqData.getUserId();

    const post = await Post.findOne(
      {_id: postId}, {_id: 1, owner: 1});

    if (!post) {
      this
        .invalidate()
        .answer()
        .notFound(CustomErrorFactory.code(POST_NOT_FOUND));
    }
    
    if (!post.owner.equals(userId)) {
      this
        .invalidate()
        .answer()
        .forbidden(CustomErrorFactory.code(POST_NOT_AVAILABLE));
    }
  }
}
