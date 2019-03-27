import RestAdvancedValidator from './../../../../../../core/rest/controller/RestAdvancedValidator';
import {CustomErrorFactory} from './../../../../../../core/rest/answer';

import Post from './../../../../../dal/model/post/Post';
import Comment from './../../../../../dal/model/comment/Comment';

const POST_NOT_FOUND: string = 'POST_NOT_FOUND';
const COMMENT_NOT_FOUND: string = 'COMMENT_NOT_FOUND';

export default class GetCommentAdvancedValidator extends RestAdvancedValidator {
  protected async validate(): Promise<void> {
    const {postId, commentId} = this.getData();

    const post = await Post.findOne({_id: postId}, {_id: 1});
    if (!post) {
      this
        .invalidate()
        .answer()
        .notFound(CustomErrorFactory.code(POST_NOT_FOUND));
    }

    const comment = await Comment.findOne({_id: commentId, post: postId});
    if (!comment) {
      this
        .invalidate()
        .answer()
        .notFound(CustomErrorFactory.code(COMMENT_NOT_FOUND));
    }

    this.data = {comment};
  }
}
