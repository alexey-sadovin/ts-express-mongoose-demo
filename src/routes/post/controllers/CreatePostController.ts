import RestRouteController from './../../../../core/rest/controller/RestRouteController';
import PostDataProducer from './../../../dal/data-producer/PostDataProducer';

export default class CreatePostController extends RestRouteController {
  public async processRequest(): Promise<void> {
    const producer: PostDataProducer = new PostDataProducer(
      this.requestData.getUserId(), this.inputData);

    this.answer().created(await producer.create());
  }
}
