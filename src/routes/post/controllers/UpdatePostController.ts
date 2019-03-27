import RestRouteController from './../../../../core/rest/controller/RestRouteController';
import PostDataModifier from './../../../dal/data-modifier/PostDataModifier';

export default class UpdatePostController extends RestRouteController {
  public async processRequest(): Promise<void> {
    const producer: PostDataModifier = new PostDataModifier(
      this.inputData.postId, this.inputData);

    this.answer().ok(await producer.update());
  }
}
