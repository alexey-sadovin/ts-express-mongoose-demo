import RestRouteController from './../../../../../core/rest/controller/RestRouteController';
import CommentDataModifier from './../../../../dal/data-modifier/CommentDataModifier';

export default class UpdateCommentController extends RestRouteController {
  public async processRequest(): Promise<void> {
    const modifier: CommentDataModifier = new CommentDataModifier(
      this.inputData.commentId, this.inputData);

    this.answer().ok(await modifier.update());
  }
}
