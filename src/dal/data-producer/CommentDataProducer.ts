import IComment from '../../../core/dal/model/IComment';
import IDataProducer from '../../../core/dal/IDataProducer';

import Comment from './../model/comment/Comment';

export default class CommentDataProducer implements IDataProducer {
  constructor(
    private readonly userId: string,
    private readonly postId: string,
    private readonly comment: IComment
  ) {
    this.userId = userId;
    this.postId = postId;
    this.comment = comment;
  }

  public create(): Promise<IComment> {
    return new Comment(this.composeCommentData()).save();
  }

  private composeCommentData(): object {
    return {
      author: this.userId,
      post: this.postId,
      ...this.comment
    };
  }
}
