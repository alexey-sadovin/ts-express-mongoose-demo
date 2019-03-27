import {CustomErrorFactory} from './../../../../../../core/rest/answer';
import PostAdvancedValidator from './../../../validation/PostAdvancedValidator';
import Comment from './../../../../../dal/model/comment/Comment';

const COMMENT_NOT_FOUND: string = 'COMMENT_NOT_FOUND';

export default class GetCommentAdvancedValidator extends PostAdvancedValidator {
  protected async validate(): Promise<void> {
    await this.checkPost();

    const {postId, commentId} = this.getData();
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
