import RestRouteController from './../../../../core/rest/controller/RestRouteController';
import Post from './../../../dal/model/post/Post';

export default class GetPostController extends RestRouteController {
  public async processRequest(): Promise<void> {
    this.answer().ok(
      await Post.findOne({_id: this.inputData.postId}));
  }
}
