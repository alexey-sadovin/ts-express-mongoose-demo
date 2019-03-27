import RestRouteController from './../../../../../core/rest/controller/RestRouteController';
import CommentDataProducer from './../../../../dal/data-producer/CommentDataProducer';

export default class CreatePostController extends RestRouteController {
  public async processRequest(): Promise<void> {
    const producer: CommentDataProducer = new CommentDataProducer(
      this.getUserId(), this.inputData.postId, this.inputData);

    this.answer().created(await producer.create());
  }
}
