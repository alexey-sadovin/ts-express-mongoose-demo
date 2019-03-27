import * as _ from 'lodash';

import IComment from '../../../core/dal/model/IComment';
import IDataModifier from '../../../core/dal/IDataModifier';

import Comment from './../model/comment/Comment';

const COMMENT_PROPERTIES: ReadonlyArray<string> = Object.freeze([
  'text'
]);

export default class CommentDataModifier implements IDataModifier {
  constructor(
    private readonly commentId: string,
    private readonly comment: IComment
  ) {
    this.commentId = commentId;
    this.comment = comment;
  }

  public async update(): Promise<IComment> {
    const condition: object = {_id: this.commentId};

    await Comment.update(
      condition, _.pick(this.comment, COMMENT_PROPERTIES));

    return Comment.findOne(condition);
  }
}
