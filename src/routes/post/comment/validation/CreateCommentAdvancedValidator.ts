import RestAdvancedValidator from './../../../../../core/rest/controller/RestAdvancedValidator';
import {CustomErrorFactory} from './../../../../../core/rest/answer';
import Post from './../../../../dal/model/post/Post';

const POST_NOT_FOUND: string = 'POST_NOT_FOUND';

export default class CreateCommentAdvancedValidator extends RestAdvancedValidator {
  protected async validate(): Promise<void> {
    const {postId} = this.getData();
    const post = await Post.findOne({_id: postId}, {_id: 1});

    if (!post) {
      this
        .invalidate()
        .answer()
        .notFound(CustomErrorFactory.code(POST_NOT_FOUND));
    }
  }
}
