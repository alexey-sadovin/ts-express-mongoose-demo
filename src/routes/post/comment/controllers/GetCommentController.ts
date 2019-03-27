import RestRouteController from './../../../../../core/rest/controller/RestRouteController';

export default class GetCommentController extends RestRouteController {
  public async processRequest(): Promise<void> {
    this.answer().ok(this.inputData.comment);
  }
}
