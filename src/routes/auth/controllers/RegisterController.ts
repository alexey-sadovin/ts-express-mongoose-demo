import RestRouteController from './../../../../core/rest/controller/RestRouteController';
import UserDataProducer from './../../../dal/data-producer/user/UserDataProducer';

export default class RegisterController extends RestRouteController {
  public async processRequest(): Promise<void> {
    const producer: UserDataProducer = new UserDataProducer(
      this.inputData,
      this.requestData
        .getServices()
        .getUserPasswordService()
    );

    this.answer().ok(await producer.create());
  }
}
